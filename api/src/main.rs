use anyhow::Result;
use tracing::info;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

#[tokio::main]
async fn main() -> Result<()> {
    dotenvy::dotenv()?;
    setup_tracing_registry();
    info!("This will be a trading application!");

    Ok(())
}

fn setup_tracing_registry() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info,trading_api=debug".into()),
        ))
        .with(tracing_subscriber::fmt::layer().pretty())
        .init();
}