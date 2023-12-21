"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setproduct] = useState({
    productslug: "",
    quantity: "",
    price: "",
  });

  const setProductt = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;

    // setproduct((prevProduct) => ({
    //   ...prevProduct,
    //   [name]: value,
    // }));

    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (
      product.productslug == "" ||
      product.quantity == "" ||
      product.price == ""
    ) {
      toast.error("Please fill in all required info!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const response = await fetch("api/product", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(product),
        });

        if (response.status == 200) {
          setproduct({
            productslug: "",
            quantity: "",
            price: "",
          });
          toast.success("Product Added Successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error("Some Error Occured!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

      <form onSubmit={addProduct}>
        <div className="mb-4">
          <label htmlFor="productName" className="block mb-2">
            Product Slug
          </label>
          <input
            type="text"
            id="productName"
            name="productslug"
            className="w-full border border-gray-300 px-4 py-2"
            placeholder="Enter a product slug"
            value={product.productslug}
            onChange={setProductt}
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="w-full border border-gray-300 px-4 py-2"
            placeholder="Enter a product quantity"
            value={product.quantity}
            onChange={setProductt}
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full border border-gray-300 px-4 py-2"
            placeholder="Enter a product price"
            value={product.price}
            onChange={setProductt}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
        >
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
