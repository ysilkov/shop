import React from "react";
import style from "./Products.module.css";
import { ReactComponent as Star } from "../../image/star.svg";
import { useAppSelector } from "../../hooks/hook";
import { Link } from "react-router-dom";

interface ProductsProps {
  firstContentIndex: number;
  lastContentIndex: number;
}

const Products = React.memo((props: ProductsProps) => {
  const products = useAppSelector((state) => state.products.products);
  return (
    <div className={style.products_block}>
      {products
          .slice(props.firstContentIndex, props.lastContentIndex)
          .map((product) => (
            <div
              className={style.product_container}
              key={`product-${product.id}`}
            >
              <img src={product.thumbnail} alt={product.title} />
              <section>
                <p>
                  Price: <strong>{`${product.price} $`}</strong>
                </p>
                <p className={style.product_title}>{product.title}</p>
                <p className={style.product_rating}>
                  Rating: {<Star />} {product.rating}
                </p>
                <p className={style.product_description}>
                  {product.description}
                </p>
              </section>
              <section className={style.product_button}>
                <Link to={`/product/:${product.id}`}>Show More</Link>
                <Link to={`/product/:${product.id}`}>Buy Now</Link>
              </section>
            </div>
          ))
    }
    </div>
  );
});

export default Products;