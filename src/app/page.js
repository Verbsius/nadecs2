// src/app/nades/page.js

import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // ⚠️ 让这个页面支持动态 fetch 数据

export default async function NadeListPage() {
  const client = await clientPromise;
  const db = client.db("nade_share");
  const nades = await db.collection("nade_share").find().toArray();

  return (
    <main className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">nadecs2</h1>
        <a
          href="/nades"
          className="bg-green-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Add Nade
        </a>
      </div>
      <ul className="space-y-2">
        {nades.map((nade) => (
          <li key={nade._id} className="border-b pb-2">
            {nade.map}: {nade.nadeName}
          </li>
        ))}
      </ul>
    </main>
  );
}