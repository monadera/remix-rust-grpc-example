WITH trade (stock_id, quantity) as (VALUES ($1::INT, $2::INT)),
     upserted as (
         UPDATE positions p
             SET quantity = p.quantity + trade.quantity
             FROM trade
             WHERE trade.stock_id = p.stock_id
             RETURNING p.*)
INSERT
INTO positions (stock_id, quantity)
SELECT stock_id, quantity
FROM trade
         JOIN
     stocks
     ON trade.stock_id = stocks.id
WHERE NOT EXISTS (SELECT 1
                  FROM upserted
                  WHERE upserted.stock_id = trade.stock_id)
ON CONFLICT (stock_id) DO NOTHING;