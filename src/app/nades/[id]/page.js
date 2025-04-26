import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation"; 
import CommentSection from "./CommentSection"; 

export default async function NadeDetailPage({ params }) {
  params = await params;
  const id = params.id;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const client = await clientPromise;
  const db = client.db("nade_share");
  const nade = await db.collection("nade_share").findOne({ _id: new ObjectId(id) });

  if (!nade) {
    notFound();
  }

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <Link href="/" className="text-sm text-black-500 hover:underline">← Back</Link>
      <h1 className="text-2xl font-bold">{nade.map}: {nade.nadeName}</h1>

      {nade.videoUrl && (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-64"
            src={nade.videoUrl.replace("watch?v=", "embed/")}
            title="Nade video"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <h2 className="text-lg font-semibold">Description</h2>
      <p className="whitespace-pre-line">{nade.description}</p>

      <CommentSection nadeId={params.id} />
    </main>
  );
}
