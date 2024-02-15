use sqlx::PgPool;

use crate::error::Result;
use crate::trade::models::{Position, Side};

#[tonic::async_trait]
pub trait TradeRepository {
    async fn add_trade(&self, stock_id: i32, side: Side, quantity: i32) -> Result<()>;
    async fn get_all_positions(&self) -> Result<Vec<Position>>;
}

pub struct PostgresTradeRepository {
    pool: PgPool,
}

impl PostgresTradeRepository {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[tonic::async_trait]
impl TradeRepository for PostgresTradeRepository {
    async fn add_trade(&self, stock_id: i32, side: Side, quantity: i32) -> Result<()> {
        todo!()
    }

    async fn get_all_positions(&self) -> Result<Vec<Position>> {
        todo!()
    }
}
