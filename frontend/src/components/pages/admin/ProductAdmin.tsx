import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { Product } from "../../../../libs/Types";
import axios from "axios";
import Loader from "../../elements/Loader";
import { toast, ToastContainer } from "react-toastify";
import ProductModal from "../../elements/admin/ProductModal";
import Pagination from "../../elements/Pagination";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteProductFunc, getProduct } from "../../../api/products";

const ProductAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const queryClient = useQueryClient();

  const { data: productsData, isPending } = useQuery({
    queryKey: ["get-products", currentPage],
    queryFn: () => getProduct(currentPage, pageSize),
    placeholderData: keepPreviousData,
  });

  const { mutate: deleteProduct } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id: number) => deleteProductFunc(id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      toast("Product deleted successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return isPending ? (
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

      {productsData.content.length > 0 ? (
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
              {productsData.content.map((product: Product, i: number) => {
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
                        onClick={(e) => deleteProduct(product.id)}
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
            totalPages={productsData.totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="mt-10 text-center text-lg">No Products available.</p>
      )}
      {openModal && (
        <ProductModal setOpenModal={setOpenModal} editProduct={editProduct} />
      )}
      <ToastContainer />
    </AdminLayout>
  );
};

export default ProductAdmin;
