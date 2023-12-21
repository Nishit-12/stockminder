"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import svgImage from "/public/Rolling-1s-200px.svg";

const Search = () => {
  const [dropdown, setdropdown] = useState([]);
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingaction, setloadingaction] = useState(false);

  const ondropdownedit = async (e) => {
    setsearch(e.target.value);

    if (search.length > -1) {
      setloading(true);
      setdropdown([]);

      const response = await fetch("api/search?query=" + search);

      const rjson = await response.json();

      setdropdown(rjson.searchProducts);

      setloading(false);
    }
  };

  const action = async (type, productslug, quantity) => {
    setloadingaction(true);

    const response = await fetch("api/action", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ type, productslug, quantity }),
    });

    const resjson = await response.json();
    console.log(resjson);

    if (resjson.status == 200) {
      //Updating the data of the dropdown when perform the action of + and -

      let index = dropdown.findIndex((item) => item.productslug == productslug);
      // console.log(index);

      // console.log(resjson.updatedQuantity.quantity);
      // console.log(dropdown[index]);
      dropdown[index].quantity = resjson.updatedQuantity.quantity;

      setdropdown(dropdown);

      setloadingaction(false);
    }
  };

  return (
    <>
      <div className="container mx-auto my-6">
        <h1 className="text-3xl font-semibold mb-6">Search a Product</h1>
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Enter a product name"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md"
            onChange={ondropdownedit}
            value={search}
          />
        </div>

        {loading && (
          <div className="container flex items-center justify-center">
            <Image src={svgImage} width={50} alt="Loading" />
          </div>
        )}

        {dropdown.length > 0 && (
          <div className="dropcontainer absolute w-[96.3vw] border-1 bg-purple-200 rounded-md p-2 mediares">
            {dropdown.map((item) => {
              return (
                <div
                  className="container flex justify-between p-2 my-1 border-b-2"
                  key={item._id}
                >
                  <span className="productslug">
                    {item.productslug} ({item.quantity} available for ₹
                    {item.price})
                  </span>

                  <div className="mx-5 mediabutton">
                    <button
                      disabled={loadingaction}
                      onClick={() => {
                        action("minus", item.productslug, item.quantity);
                      }}
                      className="buttonsize subtract inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                    >
                      -
                    </button>

                    <span className="quantitysize quantity inline-block  min-w-3 mx-3">
                      {item.quantity}
                    </span>
                    <button
                      disabled={loadingaction}
                      onClick={() => {
                        action("plus", item.productslug, item.quantity);
                      }}
                      className="buttonsize add inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
