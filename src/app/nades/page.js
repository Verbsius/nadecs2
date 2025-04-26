"use client";

import Image from "next/image";

export default function NadeFormPage() {
  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Share your CS2 nade</h1>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = {
            map: formData.get("map"),
            nadeName: formData.get("nadeName"),
            videoUrl: formData.get("videoUrl"),
            description: formData.get("description"),
          };
          
          // 校验所有字段是否为空
          if (!data.map || !data.nadeName || !data.videoUrl || !data.description) {
            alert("All fields are required!");
            return;
          }

          const res = await fetch("/api/nades", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (res.ok) {
            alert("Nade submitted!");
            e.target.reset();
          } else {
            alert("Submission failed.");
          }
        }}
      >
        {/* Map Selector */}
        <label className="block">
          <span className="block font-medium">Map:</span>
          <select name="map" className="block border p-2 w-full">
            <option value="Mirage">Mirage</option>
            <option value="Dust2">Dust2</option>
            <option value="Ancient">Ancient</option>
            <option value="Inferno">Inferno</option>
            <option value="Train">Train</option>
            <option value="Anubis">Anubis</option>
            <option value="Nuke">Nuke</option>
          </select>
        </label>

        {/* Nade Name */}
        <label className="block">
          <span className="block font-medium">Nade Name:</span>
          <input
            type="text"
            name="nadeName"
            className="block border p-2 w-full"
            placeholder="e.g., quick window smoke"
          />
        </label>

        {/* Video URL */}
        <label className="block">
          <span className="block font-medium">Video URL (YouTube/Bilibili):</span>
          <input
            type="text"
            name="videoUrl"
            className="block border p-2 w-full"
            placeholder="https://youtube.com/..."
          />
        </label>

        {/* Description */}
        <label className="block">
          <span className="block font-medium">Description:</span>
          <textarea
            name="description"
            className="block border p-2 w-full"
            rows={4}
            placeholder="How to throw, best timing, pros and cons..."
          ></textarea>
        </label>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
