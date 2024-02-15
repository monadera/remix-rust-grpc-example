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
        let mut tx = self.pool.begin().await?;

        sqlx::query_file!(
            "src/queries/insert_trade.sql",
            stock_id,
            quantity.abs(),
            side as _
        )
        .execute(&mut *tx)
        .await?;
        sqlx::query_file_as!(
            Position,
            "src/queries/upsert_position.sql",
            stock_id,
            quantity,
        )
        .execute(&mut *tx)
        .await?;

        tx.commit().await?;

        Ok(())
    }

    async fn get_all_positions(&self) -> Result<Vec<Position>> {
        let positions = sqlx::query_file_as!(Position, "src/queries/all_positions.sql")
            .fetch_all(&self.pool)
            .await?;

        Ok(positions)
    }
}
