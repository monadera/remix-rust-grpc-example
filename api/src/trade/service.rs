use tonic::{Request, Response, Status};

use crate::services::proto::refdata::Stock;
use crate::services::proto::trade::trade_server::Trade;
use crate::services::proto::trade::{MarketOrder, Position, Positions, Side};
use crate::trade::models::{Position as PositionModel, Side as SideModel};
use crate::trade::repository::TradeRepository;

pub struct TradeService<R> {
    repository: R,
}

impl<R> TradeService<R> {
    pub fn new(repository: R) -> Self {
        Self { repository }
    }
}

#[tonic::async_trait]
impl<R> Trade for TradeService<R>
where
    R: TradeRepository + Send + Sync + 'static,
{
    async fn send_order(&self, request: Request<MarketOrder>) -> Result<Response<()>, Status> {
        let order = request.get_ref();
        let (side, quantity) = match order.side() {
            Side::Sell => (SideModel::Sell, -(order.quantity as i32)),
            Side::Buy => (SideModel::Buy, order.quantity as i32),
        };
        self.repository
            .add_trade(order.stock_id, side, quantity)
            .await?;

        Ok(Response::new(()))
    }

    async fn all_positions(&self, _request: Request<()>) -> Result<Response<Positions>, Status> {
        let positions = self
            .repository
            .get_all_positions()
            .await?
            .into_iter()
            .map(Into::into)
            .collect();

        Ok(Response::new(Positions { positions }))
    }
}

impl From<PositionModel> for Position {
    fn from(value: PositionModel) -> Self {
        let stock = Stock {
            id: value.stock_id,
            symbol: value.stock_symbol,
            name: value.stock_name,
        };
        Self {
            stock: Some(stock),
            quantity: value.quantity as u32,
        }
    }
}
