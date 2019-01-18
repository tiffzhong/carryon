update products
set 
      product_name = $2,
      product_description = $3
      product_price = $4,
      product_picture = $5,
      product_quantity = $6
where product_id = $1;