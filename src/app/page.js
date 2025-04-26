import Link from "next/link";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function NadeListPage() {
  const client = await clientPromise;
  const db = client.db("nade_share");
  const nades = await db.collection("nade_share").find().sort({ _id: -1 }).toArray();


  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">NadeCS2</h1>
        <Link
          href="/nades"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Add Nade
        </Link>
      </div>

      <div className="grid gap-4">
        {nades.map((nade) => (
          <Link href={`/nades/${nade._id}`} key={nade._id}>
            <div className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {nade.map}: {nade.nadeName}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
