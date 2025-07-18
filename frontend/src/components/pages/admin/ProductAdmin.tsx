import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryModal from "../../elements/CategoryModal";
import type { Category, Product } from "../../../../libs/Types";
import axios from "axios";
import Loader from "../../elements/Loader";
import { toast, ToastContainer } from "react-toastify";
import ProductModal from "../../elements/ProductModal";
import Pagination from "../../elements/Pagination";

const ProductAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        import.meta.env.VITE_API_URL +
          `/api/product?page=${currentPage}&size=10`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage]);

  const deleteProduct = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    const button = e.currentTarget;
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/product/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        button.closest("tr")?.remove();
        setProducts(products.filter((product) => product.id != id));
        toast("Product deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg">Manage Products</h1>
        <button
          className="bg-[#eee] text-[#393E46] px-5 py-3 rounded-lg flex items-center justify-center gap-3 font-semibold cursor-pointer hover:bg-[#393E46] hover:text-[#eee]"
          onClick={() => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <h3>Add Product</h3>
        </button>
      </div>
      {products.length > 0 ? (
        <>
          <table className="w-full table-auto border-collapse text-left my-10">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <th className="p-4">Id</th>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">Image</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product, i) => {
                return (
                  <tr
                    key={i}
                    className="even:bg-gray-200 bg-blue-50 transition"
                  >
                    <td className="p-4 font-semibold">{product.id}</td>
                    <td className="p-4 font-semibold">{product.name}</td>
                    <td className="p-4 font-semibold">{product.description}</td>
                    <td className="p-4 font-semibold">${product.price}</td>
                    <td className="p-4 font-semibold">
                      {product.category.name}
                    </td>
                    <td className="p-4 font-semibold">
                      <img src={product.image} className="w-30" alt="" />
                    </td>
                    <td className="p-4 font-semibold flex items-center justify-center gap-2">
                      <button
                        className="px-4 py-2 rounded-md text-[#eee] bg-blue-400 mr-5 cursor-pointer"
                        onClick={() => {
                          setOpenModal(true);
                          setEditProduct(product);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 rounded-md text-[#eee] bg-red-400 cursor-pointer"
                        onClick={(e) => deleteProduct(e, product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="mt-10 text-center text-lg">No Products available.</p>
      )}
      {openModal && (
        <ProductModal
          setOpenModal={setOpenModal}
          setProducts={setProducts}
          products={products}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      )}
      <ToastContainer />
    </AdminLayout>
  );
};

export default ProductAdmin;
