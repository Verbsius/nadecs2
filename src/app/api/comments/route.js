import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { id, text } = await req.json();
  const client = await clientPromise;
  const db = client.db("nade_share");

  await db.collection("nade_share").updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        comments: {
          text,
          createdAt: new Date()
        }
      }
    }
  );

  return new Response(JSON.stringify({ message: "Comment added!" }), { status: 200 });
}
