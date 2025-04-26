import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  params = await params;
  const client = await clientPromise;
  const db = client.db("nade_share");

  const nade = await db.collection("nade_share").findOne(
    { _id: new ObjectId(params.id) }
  );

  if (!nade) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(nade), { status: 200 });
}
