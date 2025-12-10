import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { Category } from "../../../../libs/Types";

const CategoryModal = ({
  setOpenModal,
  setCategories,
  categories,
  editCategory,
  setEditCategory,
}: {
  setOpenModal: (e: boolean) => void;
  setCategories: (e: Category[]) => void;
  categories: Category[];
  editCategory: Category | undefined;
  setEditCategory: (e: Category | undefined) => void;
}) => {
  const [name, setName] = useState(editCategory?.name || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    editCategory?.image || null
  );

  const saveCategory = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();
    formData.append("file", selectedFile || "");

    e.preventDefault();
    if (editCategory) {
      if (previewUrl == editCategory.image) {
        axios
          .put(
            import.meta.env.VITE_API_URL + "/api/category/" + editCategory.id,
            {
              name,
              image: previewUrl,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtToken"),
              },
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
            setCategories(
              categories.map((category) => {
                if (category.id == editCategory.id) return res.data;
                return category;
              })
            );
            setEditCategory(undefined);
            setOpenModal(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(import.meta.env.VITE_API_URL + "/api/upload", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })
          .then((res) => {
            axios
              .put(
                import.meta.env.VITE_API_URL +
                  "/api/category/" +
                  editCategory.id,
                {
                  name,
                  image: res.data,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
                  },
                  withCredentials: true,
                }
              )
              .then((res) => {
                console.log(res.data);
                setCategories(
                  categories.map((category) => {
                    if (category.id == editCategory.id) return res.data;
                    return category;
                  })
                );
                setEditCategory(undefined);
                setOpenModal(false);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      axios
        .post(import.meta.env.VITE_API_URL + "/api/upload", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          axios
            .post(
              import.meta.env.VITE_API_URL + "/api/category",
              {
                name,
                image: res.data,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("jwtToken"),
                },
                withCredentials: true,
              }
            )
            .then((res) => {
              console.log(res.data);
              setCategories([...categories, res.data]);
              setName("");
              setPreviewUrl(null);
              setSelectedFile(null);
              toast("Category created successfully");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 top-0 left-0 backdrop-blue-sm z-40 opacity-40 bg-slate-800 w-full h-full"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="z-50 bg-[#393E46] w-1/2 min-h-1/2 rounded-lg p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Create Category</h1>
            <FontAwesomeIcon
              icon={faX}
              className="text-red-400 text-xl hover:rotate-180 cursor-pointer p-2"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <form
            className="w-full flex items-center justify-center gap-5 mt-20 flex-col"
            onSubmit={(e) => saveCategory(e)}
          >
            <input
              type="text"
              name="categoryName"
              placeholder="Category name"
              className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="image"
              className="bg-[#eee] text-[#222831] px-5 py-3 w-3/5 rounded-lg flex items-center justify-center gap-3 font-semibold cursor-pointer hover:bg-[#222831] hover:text-[#eee]"
            >
              <FontAwesomeIcon icon={faPlus} />
              <h3>Upload Image</h3>
              <input
                type="file"
                className="hidden"
                id="image"
                onChange={(e) => handleFileChange(e)}
              />
            </label>
            {previewUrl && (
              <img src={previewUrl} className="w-3/5 rounded-lg" />
            )}
            <button className="bg-[#00ADB5] text-[#eee] px-4 py-2 rounded-lg w-3/5 cursor-pointer hover:scale-105 outline-none">
              {editCategory ? "Edit" : "Save"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryModal;
