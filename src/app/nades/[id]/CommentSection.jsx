"use client";

import { useState, useEffect } from "react";

export default function CommentSection({ nadeId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`/api/nades/${nadeId}`);
      const data = await res.json();
      setComments((data.comments || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); 
    }
    fetchComments();
  }, [nadeId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: nadeId, text: comment })
    });
    setComment("");
    
    const res = await fetch(`/api/nades/${nadeId}`);
    const data = await res.json();
    setComments((data.comments || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); 
  }

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="w-full border rounded p-2"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* 评论列表 */}
      <div className="mt-4 space-y-2">
        {comments.map((c, idx) => (
          <div key={idx} className="border p-2 rounded">
            <p>{c.text}</p>
            <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
