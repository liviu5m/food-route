import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryModal from "../../elements/admin/CategoryModal";
import type { Category } from "../../../../libs/Types";
import axios from "axios";
import Loader from "../../elements/Loader";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "../../elements/Pagination";

const CategoryAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<Category>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_API_URL +
          `/api/category?page=${currentPage}&size=10`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.content);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  console.log(categories, categories.length);

  const deleteCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    const button = e.currentTarget;
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/category/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        button.closest("tr")?.remove();
        setCategories(categories.filter((category) => category.id != id));
        toast("Category deleted successfully");
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
        <h1 className="text-lg">Manage Categories</h1>
        <button
          className="bg-[#eee] text-[#393E46] px-5 py-3 rounded-lg flex items-center justify-center gap-3 font-semibold cursor-pointer hover:bg-[#393E46] hover:text-[#eee]"
          onClick={() => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <h3>Add Category</h3>
        </button>
      </div>
      {categories.length > 0 ? (
        <>
          <table className="w-full table-auto border-collapse text-left my-10">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <th className="p-4">Id</th>
                <th className="p-4">Name</th>
                <th className="p-4">Image</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {categories.map((category, i) => {
                return (
                  <tr
                    key={i}
                    className="even:bg-gray-200 bg-blue-50 transition"
                  >
                    <td className="p-4 font-semibold">{category.id}</td>
                    <td className="p-4 font-semibold">{category.name}</td>
                    <td className="p-4 font-semibold">
                      <img src={category.image} />
                    </td>
                    <td className="p-4 font-semibold">
                      <button
                        className="px-4 py-2 rounded-md text-[#eee] bg-blue-400 mr-5 cursor-pointer"
                        onClick={() => {
                          setOpenModal(true);
                          setEditCategory(category);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 rounded-md text-[#eee] bg-red-400 cursor-pointer"
                        onClick={(e) => deleteCategory(e, category.id)}
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
        <p className="mt-10 text-center text-lg">No Categories available.</p>
      )}
      {openModal && (
        <CategoryModal
          setOpenModal={setOpenModal}
          setCategories={setCategories}
          categories={categories}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
        />
      )}
      <ToastContainer />
    </AdminLayout>
  );
};

export default CategoryAdmin;
