import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

export async function GET(request) {
  try {
    const database = client.db("Products");
    const inventory = database.collection("ProductData");

    const query = request.nextUrl.searchParams.get("query");
    const cleanedQuery = query.replaceAll('"', ''); //Using this function because we get "App" in query but we want only App
    // console.log(cleanedQuery);

    const searchProducts = await inventory.aggregate([
        {
          $match: {
            $or: [{ productslug: { $regex: cleanedQuery, $options: "i" } }]
          }
        }
      ]).toArray();

    //   console.log(searchProducts);

    return NextResponse.json(
      {
        searchProducts,
        message: "Data Fetched Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
        {
          message: "Some Error Occured!",
        },
        {
          status: 500,
        }
      );
  }
}
