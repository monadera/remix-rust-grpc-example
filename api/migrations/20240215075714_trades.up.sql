CREATE TYPE side AS ENUM ('buy', 'sell');
CREATE TABLE trades
(
    id          SERIAL PRIMARY KEY,
    stock_id    INT       NOT NULL,
    quantity    INT       NOT NULL,
    side        SIDE,
    executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (stock_id) REFERENCES stocks (id)
);

CREATE TABLE positions
(
    stock_id INT PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity >= 0),
    FOREIGN KEY (stock_id) REFERENCES stocks (id)
);

CREATE INDEX idx_trades_stock_id ON trades (stock_id);
CREATE INDEX idx_positions_stock_id ON positions(stock_id);