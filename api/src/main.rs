use anyhow::Result;
use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use tonic::transport::Server;
use tracing::info;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

use trading_api::refdata::{PostgresRefDataRepository, RefDataService};
use trading_api::services::proto::refdata::ref_data_server::RefDataServer;
use trading_api::services::proto::trade::trade_server::TradeServer;
use trading_api::services::FILE_DESCRIPTOR_SET;
use trading_api::trade::{PostgresTradeRepository, TradeService};

#[tokio::main]
async fn main() -> Result<()> {
    dotenvy::dotenv()?;
    setup_tracing_registry();
    let pool = pg_pool().await?;

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(FILE_DESCRIPTOR_SET)
        .build()?;
    let refdata_service = RefDataServer::new(build_refdata_service(pool.clone()));
    let trade_service = TradeServer::new(build_trade_service(pool.clone()));

    let address = "0.0.0.0:8080".parse()?;
    info!("Service is listening on {address}");

    Server::builder()
        .add_service(reflection_service)
        .add_service(refdata_service)
        .add_service(trade_service)
        .serve(address)
        .await?;

    Ok(())
}

fn build_refdata_service(pool: PgPool) -> RefDataService<PostgresRefDataRepository> {
    let repository = PostgresRefDataRepository::new(pool);
    RefDataService::new(repository)
}

fn build_trade_service(pool: PgPool) -> TradeService<PostgresTradeRepository> {
    let repository = PostgresTradeRepository::new(pool);
    TradeService::new(repository)
}

pub async fn pg_pool() -> Result<PgPool> {
    let url = std::env::var("DATABASE_URL")?;
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(url.as_str())
        .await?;

    Ok(pool)
}

fn setup_tracing_registry() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info,trading_api=debug".into()),
        ))
        .with(tracing_subscriber::fmt::layer().pretty())
        .init();
}
