import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function PostDetail() {
    const { post, auth, categories } = usePage().props;
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post.comments || []);
    const [liked, setLiked] = useState(post.likes.some(like => like.user_id === auth.user.id));  // กำหนดค่าเริ่มต้นที่ถูกต้อง
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState("");

    const reportOptions = [
        "ปัญหาที่เกี่ยวข้องกับบุคคลที่อายุต่ำกว่า 18 ปี",
        "การกลั่นแกล้ง การคุกคาม หรือการใช้งานที่ไม่เหมาะสม",
        "เนื้อหารุนแรง แสดงความเกลียดชัง หรือรบกวนจิตใจ",
        "การหลอกลวง การฉ้อโกง หรือข้อมูลเท็จ"
    ];

    useEffect(() => {
        console.log("Post Data:", post); // ✅ ตรวจสอบว่า content ถูกส่งมาหรือไม่
    }, [post]);

    const handleDelete = (postId) => {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("post.destroy", postId));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            route("comment.store", post.id),
            { content: comment },
            {
                onSuccess: (page) => {
                    setComments(page.props.comments || []);
                    setComment("");
                    window.location.reload();
                },
            }
        );
    };

    const handleLike = () => {
        if (liked) {
            router.post(route('like.remove', post.id), {}, {
                onSuccess: () => setLiked(false)
            });
        } else {
            router.post(route('like.store', post.id), {}, {
                onSuccess: () => setLiked(true)
            });
        }
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        if (reportReason) {
            router.post(route('report.store'), {
                post_id: post.id,
                reason: reportReason,
            }, {
                onSuccess: () => {
                    setReportModalOpen(false); // Close modal after submission
                }
            });
        } else {
            alert("Please provide a reason for reporting.");
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-5 font-sans bg-gray-100 min-h-screen">
                <div className="col-span-3 bg-white p-6 mt-5 rounded-lg shadow-md">
                    {post.image && (
                        <img
                            src={`/storage/${post.image}`}
                            alt={post.title}
                            className="w-full h-64 object-contain rounded-lg mb-4"
                        />
                    )}
                    <h1 className="text-5xl font-bold text-gray-800 mb-6">{post.title}</h1>
                    <div className="mt-4 text-lg text-gray-700 whitespace-pre-line">
                        {post.content}
                    </div>
                    <div className="flex">
                        <p className="text-gray-500">👁️ {post.views} views</p>
                        <p className="text-gray-500 text-sm flex items-center">
                            👍 {post.likes.length} Likes
                        </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">

                        {/* กลุ่มปุ่ม Like & Report */}
                        <div className="flex space-x-4">
                            {/* ปุ่ม Like */}
                            {auth.user && (
                                <button
                                    onClick={handleLike}
                                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-300 ${liked ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                                        } text-white`}
                                >
                                    <span>{liked ? 'Unlike' : 'Like'}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656l-6.828 6.828a.5.5 0 01-.707 0l-6.828-6.828a4 4 0 010-5.656z" />
                                    </svg>
                                </button>
                            )}

                            {/* ปุ่ม Report */}
                            {auth.user && (
                                <button
                                    onClick={() => setReportModalOpen(true)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300"
                                >
                                    <span>Report</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zm-6 8a8 8 0 100-16 8 8 0 000 16zm-1-4a1 1 0 112 0v2a1 1 0 11-2 0v-2zm0-8a1 1 0 112 0v4a1 1 0 11-2 0V4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>

                    </div>



                    {reportModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300">
                            <div className="bg-white w-full max-w-lg md:max-w-xl lg:max-w-2xl p-8 rounded-2xl shadow-2xl transform transition-all scale-100">
                                <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Report Post 🚨</h3>
                                <p className="text-gray-600 text-center mb-4">โปรดเลือกเหตุผลที่ต้องการรายงานโพสต์นี้</p>
                                <form onSubmit={handleReportSubmit} className="space-y-4">
                                    {reportOptions.map((option, index) => (
                                        <label key={index} className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-all">
                                            <input
                                                type="radio"
                                                name="reportReason"
                                                value={option}
                                                onChange={(e) => setReportReason(e.target.value)}
                                                className="mr-3 w-5 h-5"
                                            />
                                            <span className="text-lg text-gray-800">{option}</span>
                                        </label>
                                    ))}
                                    <div className="flex justify-center space-x-6 mt-6">
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
                                        >
                                            🚀 Submit Report
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setReportModalOpen(false)}
                                            className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-500 transition-all"
                                        >
                                            ❌ Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {auth.user && (auth.user.id === post.user_id || auth.user.role === "admin") && (
                        <div className="flex space-x-4 mt-6">
                            <Link
                                href={route("post.edit", post.id)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    {auth.user && (
                        <form onSubmit={handleSubmit} className="mt-6">
                            <textarea
                                className="w-full p-3 border rounded-lg"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                                required
                            />
                            <button
                                type="submit"
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Add Comment
                            </button>
                        </form>
                    )}

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold">Comments</h2>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="mt-4 p-4 bg-gray-200 rounded-lg">
                                    <p className="font-bold">{comment.user?.name || "Unknown User"}:</p>
                                    <p>{comment.content}</p>
                                    <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString("en-GB")}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
