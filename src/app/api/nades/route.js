
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const data = await req.json();
    await client.connect();
    const db = client.db("nade_share");
    const collection = db.collection("nade_share");

    await collection.insertOne(data);

    return new Response(JSON.stringify({ message: "Nade saved!" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save nade" }), { status: 500 });
  } finally {
    await client.close();
  }
}
