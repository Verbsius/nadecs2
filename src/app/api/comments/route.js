import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { use } from "react";

export async function POST(req) {
  const { id, username, text } = await req.json();

  if (!id || !username || !text) {
    return new Response(JSON.stringify({ error: "id, username, and text are required" }), { status: 400 });
  }
  
  const client = await clientPromise;
  const db = client.db("nade_share");

  await db.collection("nade_share").updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        comments: {
          username,
          text,
          createdAt: new Date()
        }
      }
    }
  );

  return new Response(JSON.stringify({ message: "Comment added!" }), { status: 200 });
}
