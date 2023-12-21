"use client";

import React, { useEffect, useState } from "react";

const DisplayProduct = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("api/product");
      const rjson = await response.json();

      setproducts(rjson.products);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 500);

    return () => {
      clearInterval(intervalId);
      //   console.log("Hello From CleanUp");
    };
  }, []);

  return (
    <>
      <div className="container my-8 mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          Displaying Current Stock
        </h1>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.productslug}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">₹{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayProduct;
