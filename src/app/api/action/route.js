import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

export async function POST(request) {
  try {
    const { type, productslug, quantity } = await request.json();

    const database = client.db("Products");
    const collection = database.collection("ProductData");

    const filter = { productslug: productslug };

    let newQuantity = type == "minus" ? (parseInt(quantity) - 1) : (parseInt(quantity) + 1);

    const updateDoc = {
      $set: {
        quantity: newQuantity 
      },
    };
    const result = await collection.updateOne(filter, updateDoc, {});
    // console.log(filter);
    // console.log(await collection.findOne(filter));
    


    return NextResponse.json(
      {
        result,
        updatedQuantity: await collection.findOne(filter),
        message: "Product Updated Successfully",
        status: 200
      },
 
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error, Please Try Again.",
      },
      {
        status: 500,
      }
    );
  }
}
