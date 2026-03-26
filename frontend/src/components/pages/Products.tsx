import BodyLayout from "../layouts/BodyLayout";
import ProductDisplay from "../elements/products/ProductDisplay";

const Products = () => {
  return (
    <BodyLayout>
      <div className='bg-[url("/imgs/breadcrumb1.jpg")] bg-cover bg-center w-full py-16 sm:py-20 px-4 text-black text-center text-3xl sm:text-4xl font-bold'>
        <h1>Shop</h1>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <ProductDisplay />
      </div>
    </BodyLayout>
  );
};

export default Products;
