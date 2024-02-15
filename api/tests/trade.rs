use sqlx::PgPool;
use tonic::{Code, Request};
use trading_api::services::proto::trade::trade_server::Trade;
use trading_api::services::proto::trade::{MarketOrder, Positions};
use trading_api::trade::{PostgresTradeRepository, TradeService};

#[sqlx::test(fixtures("stocks"))]
async fn test_simple_order(pool: PgPool) {
    let service = create_service(pool);

    let order = MarketOrder {
        stock_id: 1,
        quantity: 100,
        side: 1,
    };
    service.send_order(Request::new(order)).await.unwrap();

    let response = service.all_positions(Request::new(())).await.unwrap();
    assert_eq!(response.get_ref().positions.len(), 1);
    assert_position(response.get_ref(), "AAPL", 100);
}

#[sqlx::test(fixtures("stocks"))]
async fn test_orders_with_different_stocks(pool: PgPool) {
    let service = create_service(pool);

    let order = MarketOrder {
        stock_id: 1,
        quantity: 100,
        side: 1,
    };
    service.send_order(Request::new(order)).await.unwrap();

    let order = MarketOrder {
        stock_id: 2,
        quantity: 200,
        side: 1,
    };
    service.send_order(Request::new(order)).await.unwrap();

    let response = service.all_positions(Request::new(())).await.unwrap();
    assert_eq!(response.get_ref().positions.len(), 2);
}

#[sqlx::test(fixtures("stocks"))]
async fn test_selling_stock(pool: PgPool) {
    let service = create_service(pool);

    let order = MarketOrder {
        stock_id: 1,
        quantity: 100,
        side: 1,
    };
    service.send_order(Request::new(order)).await.unwrap();

    let response = service.all_positions(Request::new(())).await.unwrap();
    assert_position(response.get_ref(), "AAPL", 100);

    let order = MarketOrder {
        stock_id: 1,
        quantity: 60,
        side: 2,
    };
    service.send_order(Request::new(order)).await.unwrap();
    let response = service.all_positions(Request::new(())).await.unwrap();
    assert_position(response.get_ref(), "AAPL", 40);

    let order = MarketOrder {
        stock_id: 1,
        quantity: 60,
        side: 2,
    };
    let response = service.send_order(Request::new(order)).await;
    if let Err(status) = response {
        assert_eq!(status.code(), Code::InvalidArgument);
    } else {
        panic!("expected an error status to be returned");
    }
}

fn create_service(pool: PgPool) -> TradeService<PostgresTradeRepository> {
    let repository = PostgresTradeRepository::new(pool);
    TradeService::new(repository)
}

fn assert_position(positions: &Positions, symbol: &str, quantity: u32) {
    match positions
        .positions
        .iter()
        .find(|p| p.stock.as_ref().unwrap().symbol == symbol)
    {
        None => panic!("position for {symbol} is missing"),
        Some(p) => {
            assert_eq!(p.quantity, quantity);
        }
    }
}
