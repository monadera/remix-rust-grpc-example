use sqlx::PgPool;
use tonic::Request;

use trading_api::refdata::{PostgresRefDataRepository, RefDataService};
use trading_api::services::proto::refdata::ref_data_server::RefData;
use trading_api::services::proto::refdata::Stock;

#[sqlx::test(fixtures("stocks"))]
async fn test_all_stocks(pool: PgPool) {
    let service = create_service(pool);

    let request = Request::new(());
    let response = service.all_stocks(request).await.unwrap();

    assert_eq!(response.get_ref().stocks.len(), 5);
}

#[sqlx::test]
async fn test_add_stock(pool: PgPool) {
    let service = create_service(pool);

    let request = Request::new(());
    let response = service.all_stocks(request).await.unwrap();
    assert_eq!(response.get_ref().stocks.len(), 0);

    let stock = Stock {
        id: -1, // this will be set by the database
        symbol: "JPM".to_string(),
        name: "JPMorgan Chase & Co.".to_string(),
    };
    service.add_stock(Request::new(stock)).await.unwrap();

    let request = Request::new(());
    let response = service.all_stocks(request).await.unwrap();
    assert_eq!(response.get_ref().stocks.len(), 1);

    let stock = response.get_ref().stocks.first().unwrap();
    assert_eq!(stock.symbol, "JPM");
    assert_eq!(stock.name, "JPMorgan Chase & Co.");
}

fn create_service(pool: PgPool) -> RefDataService<PostgresRefDataRepository> {
    let repository = PostgresRefDataRepository::new(pool);
    RefDataService::new(repository)
}
