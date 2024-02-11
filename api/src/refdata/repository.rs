use sqlx::PgPool;

use crate::error::Result;
use crate::refdata::models::Stock;

#[tonic::async_trait]
pub trait RefDataRepository {
    async fn get_all_stocks(&self) -> Result<Vec<Stock>>;
    async fn add_stock(&self, symbol: &str, name: &str) -> Result<Stock>;
}

pub struct PostgresRefDataRepository {
    pool: PgPool,
}

impl PostgresRefDataRepository {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[tonic::async_trait]
impl RefDataRepository for PostgresRefDataRepository {
    async fn get_all_stocks(&self) -> Result<Vec<Stock>> {
        let stocks = sqlx::query_as!(Stock, "SELECT id, symbol, name FROM stocks",)
            .fetch_all(&self.pool)
            .await?;

        Ok(stocks)
    }

    async fn add_stock(&self, symbol: &str, name: &str) -> Result<Stock> {
        let stock = sqlx::query_as!(
            Stock,
            "INSERT INTO stocks (symbol, name) VALUES ($1, $2) RETURNING id, symbol, name",
            symbol,
            name
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(stock)
    }
}
