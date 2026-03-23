import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { Category } from "../../../../libs/Types";
import { useMutation } from "@tanstack/react-query";
import { createCategory, editCategoryFunc } from "../../../api/categories";
import { uploadImage } from "../../../api/upload";
import { queryClient } from "../../../App";

const CategoryModal = ({
  setOpenModal,
  editCategory,
  setEditCategory,
}: {
  setOpenModal: (e: boolean) => void;
  editCategory: Category | undefined;
  setEditCategory: (e: Category | undefined) => void;
}) => {
  const [name, setName] = useState(editCategory?.name || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    editCategory?.image || null,
  );
  const [imageUrl, setImageUrl] = useState("");

  const { mutate: addCategory } = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: () => createCategory(name, imageUrl),
    onSuccess: (data) => {
      console.log(data);
      setName("");
      setPreviewUrl(null);
      toast("Category created successfully");
      setOpenModal(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: uploadFile, isPending } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: (data: FormData) => uploadImage(data),
    onSuccess: (data) => {
      console.log(data);
      setImageUrl(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: updateCategory } = useMutation({
    mutationKey: ["upload-category"],
    mutationFn: () =>
      editCategoryFunc(
        editCategory?.id || -1,
        name,
        imageUrl ? imageUrl : editCategory?.image || "",
      ),
    onSuccess: (data) => {
      console.log(data);
      setEditCategory(undefined);
      setOpenModal(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  console.log(imageUrl);

  const saveCategory = (e: React.FormEvent<HTMLFormElement>) => {
    if (isPending) return;
    e.preventDefault();
    if (imageUrl == "" && editCategory == null) {
      toast("Image required");
      return;
    }
    if (editCategory) updateCategory();
    else addCategory();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      uploadFile(formData);
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
            <button
              className={`bg-[#00ADB5] text-[#eee] px-4 py-2 rounded-lg w-3/5 cursor-pointer ${isPending ? "" : "hover:scale-105"} outline-none flex items-center justify-center gap-5`}
            >
              {editCategory ? "Edit" : "Save"}
              {isPending && (
                <div className="w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"></div>
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryModal;
