import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { Category, Product } from "../../../../libs/Types";
import Loader from ".././Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories } from "../../../api/categories";
import { uploadImage } from "../../../api/upload";
import { createProductFunc, updateProductFunc } from "../../../api/products";

const ProductModal = ({
  setOpenModal,
  editProduct,
}: {
  setOpenModal: (e: boolean) => void;
  editProduct: Product | undefined;
}) => {
  const [name, setName] = useState(editProduct?.name || "");
  const [description, setDescription] = useState(
    editProduct?.description || "",
  );
  const [price, setPrice] = useState(editProduct?.price || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    editProduct?.image || null,
  );
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(
    String(editProduct?.category.id) || undefined,
  );
  const { data: categories, isPending } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: () => getAllCategories(),
  });
  const queryClient = useQueryClient();

  const { mutate: uploadFile, isPending: isPendingImage } = useMutation({
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

  const { mutate: createProduct } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: () =>
      createProductFunc(name, description, price, imageUrl, categoryId),
    onSuccess: (data) => {
      console.log(data);
      setName("");
      setDescription("");
      setPrice("");
      setCategoryId(undefined);
      setPreviewUrl(null);
      toast("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      setOpenModal(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: () =>
      updateProductFunc(
        editProduct?.id || -1,
        name,
        description,
        price,
        imageUrl ? imageUrl : editProduct?.image || "",
        categoryId,
      ),
    onSuccess: (data) => {
      console.log(data);
      setName("");
      setDescription("");
      setPrice("");
      setCategoryId(undefined);
      setPreviewUrl(null);
      toast("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      setOpenModal(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const saveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageUrl == "" && editProduct == null) {
      toast("Image required");
      return;
    }
    if (isPendingImage) return;
    if (editProduct) updateProduct();
    else createProduct();
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

  return isPending ? (
    <Loader />
  ) : (
    <div>
      <div
        className="fixed inset-0 top-0 left-0 backdrop-blue-sm z-40 opacity-40 bg-slate-800 w-full h-full"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-20">
        <div className="z-50 bg-[#393E46] w-1/2 min-h-1/2 rounded-lg p-10 overflow-scroll hide-scrollbar">
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Create Product</h1>
            <FontAwesomeIcon
              icon={faX}
              className="text-red-400 text-xl hover:rotate-180 cursor-pointer p-2"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <form
            className="w-full flex items-center justify-center gap-5 mt-20 flex-col"
            onSubmit={(e) => saveProduct(e)}
          >
            <input
              type="text"
              placeholder="Name"
              className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="number"
              step={0.01}
              placeholder="Price"
              className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              className="w-3/5 outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option selected={categoryId == undefined} disabled={true}>
                Choose a category
              </option>
              {categories.map((category: Category, i: number) => {
                return (
                  <option key={i} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
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
              className={`bg-[#00ADB5] text-[#eee] px-4 py-2 rounded-lg w-3/5 cursor-pointer outline-none flex items-center justify-center gap-5 ${isPendingImage ? "" : "hover:scale-105"}`}
            >
              {editProduct ? "Edit" : "Save"}
              {isPendingImage && (
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

export default ProductModal;
