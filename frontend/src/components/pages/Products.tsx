import React from "react";
import BodyLayout from "../layouts/bodyLayout";
import ProductDisplay from "../elements/products/ProductDisplay";

const Products = () => {
  return (
    <BodyLayout>
      <div className='bg-[url("/imgs/breadcrumb1.jpg")] bg-cover bg-center w-full py-20 text-black text-center text-4xl font-bold'>
        <h1>Shop</h1>
      </div>
      <div className="container">
        <ProductDisplay />
      </div>
    </BodyLayout>
  );
};

export default Products;
