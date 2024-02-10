use crate::error::Result;
use crate::refdata::models::Stock;
use sqlx::PgPool;

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
        todo!()
    }

    async fn add_stock(&self, symbol: &str, name: &str) -> Result<Stock> {
        todo!()
    }
}
