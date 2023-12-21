
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

//Insertion of data using mongoose

export async function POST(request) {
  try {

    const data = await request.json();

    const database = client.db('Products');
    const collection = database.collection('ProductData');

    const result = await collection.insertOne(data);

    return NextResponse.json(
      {
        result,
        message: "Product Added Successfully",
      },
      {
        status: 200,
      }
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

//Displaying data

export async function GET() {
  try {
    const database = client.db("Products");
    const inventory = database.collection("ProductData");

    const query = {};

    const products = await inventory.find(query).toArray();

    return NextResponse.json(
      {
        products,
        message: "Data Fetched Successfully"
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
}
