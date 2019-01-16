update products
set 
      product_name = $2,
      product_price = $3,
      product_picture = $4,
      product_quantity = $5
where product_id = $1;