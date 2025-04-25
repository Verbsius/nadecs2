// src/app/nades/[id]/page.js

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function NadeDetailPage({ params }) {
  const client = await clientPromise;
  const db = client.db("nade_share");
  const nade = await db
    .collection("nade_share")
    .findOne({ _id: new ObjectId(params.id) });

  if (!nade) {
    return <div className="p-4 text-red-600">❌ Nade not found.</div>;
  }

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <Link href="/nades" className="text-sm text-blue-500 hover:underline">← Back</Link>
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
    </main>
  );
}
