pub struct Position {
    pub stock_id: i32,
    pub stock_symbol: String,
    pub stock_name: String,
    pub quantity: i32,
}

#[derive(Debug, sqlx::Type)]
#[sqlx(type_name = "side", rename_all = "lowercase")]
pub enum Side {
    Buy,
    Sell,
}
