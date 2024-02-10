use tonic::{Request, Response, Status};

use crate::refdata::models::Stock as StockModel;
use crate::refdata::repository::RefDataRepository;
use crate::services::proto::refdata::ref_data_server::RefData;
use crate::services::proto::refdata::{Stock, Stocks};

pub struct RefDataService<R> {
    repository: R,
}

impl<R> RefDataService<R> {
    pub fn new(repository: R) -> Self {
        Self { repository }
    }
}

#[tonic::async_trait]
impl<R> RefData for RefDataService<R>
    where
        R: RefDataRepository + Send + Sync + 'static,
{
    async fn all_stocks(&self, _request: Request<()>) -> Result<Response<Stocks>, Status> {
        let stocks = self
            .repository
            .get_all_stocks()
            .await?
            .into_iter()
            .map(Into::into)
            .collect();

        Ok(Response::new(Stocks { stocks }))
    }

    async fn add_stock(&self, request: Request<Stock>) -> Result<Response<()>, Status> {
        let stock = request.get_ref();
        self.repository
            .add_stock(&stock.symbol, &stock.name)
            .await?;

        Ok(Response::new(()))
    }
}

impl From<StockModel> for Stock {
    fn from(stock: StockModel) -> Self {
        Stock {
            id: stock.id,
            symbol: stock.symbol,
            name: stock.name,
        }
    }
}