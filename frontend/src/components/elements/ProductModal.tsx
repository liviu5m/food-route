import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { Category, Product } from "../../../libs/Types";
import Loader from "./Loader";

const ProductModal = ({
  setOpenModal,
  setProducts,
  products,
  editProduct,
  setEditProduct,
}: {
  setOpenModal: (e: boolean) => void;
  setProducts: (e: Product[]) => void;
  products: Product[];
  editProduct: Product | undefined;
  setEditProduct: (e: Product | undefined) => void;
}) => {
  const [name, setName] = useState(editProduct?.name || "");
  const [description, setDescription] = useState(
    editProduct?.description || ""
  );
  const [price, setPrice] = useState(editProduct?.price || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    editProduct?.image || null
  );
  const [categoryId, setCategoryId] = useState<string | undefined>(
    String(editProduct?.category.id) || undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/category/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
    console.log(editProduct);

  const saveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile || "");
    
    if (editProduct) {
      if (editProduct.image == previewUrl) {
        axios
          .put(
            import.meta.env.VITE_API_URL + "/api/product/" + editProduct.id,
            {
              name,
              description,
              price,
              image: previewUrl,
              categoryId,
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
            
            setProducts(
              products.map((product) => {
                if (product.id == editProduct.id) return res.data;
                return product;
              })
            );
            setEditProduct(undefined);
            setOpenModal(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post("http://localhost:8080/api/upload", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            axios
              .put(
                import.meta.env.VITE_API_URL + "/api/product/" + editProduct.id,
                {
                  name,
                  description,
                  price,
                  image: res.data,
                  categoryId,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
                  },
                  withCredentials: true,
                }
              )
              .then((res) => {
                setProducts(
                  products.map((product) => {
                    if (product.id == editProduct.id) return res.data;
                    return product;
                  })
                );
                setEditProduct(undefined);
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
        .post("http://localhost:8080/api/upload", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          axios
            .post(
              import.meta.env.VITE_API_URL + "/api/product",
              {
                name,
                description,
                price,
                image: res.data,
                categoryId,
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
              setProducts([...products, res.data]);
              setName("");
              setDescription("");
              setPrice("");
              setCategoryId(undefined);
              setPreviewUrl(null);
              toast("Product created successfully");
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

  return loading ? (
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
              {categories.map((category, i) => {
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
            <button className="bg-[#00ADB5] text-[#eee] px-4 py-2 rounded-lg w-3/5 cursor-pointer hover:scale-105 outline-none">
              {editProduct ? "Edit" : "Save"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductModal;
