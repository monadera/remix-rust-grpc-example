SELECT quantity, stock_id, s.symbol as stock_symbol, s.name as stock_name
FROM positions
         JOIN stocks s
              ON positions.stock_id = s.id;