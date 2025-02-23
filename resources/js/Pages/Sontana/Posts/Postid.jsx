import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import SideNavFront from "@/Components/SideNavBarFront";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PostDetail() {
    const { post, auth, categories } = usePage().props;
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments);

    const handleDelete = (postId) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('post.destroy', postId));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="grid grid-cols-4 gap-4 p-5 font-sans bg-gray-100 min-h-screen">
                <SideNavFront categories={categories} />
                <div className="col-span-3 bg-white p-6 mt-5 rounded-lg shadow-md">
                    <h1 className="text-5xl font-bold text-gray-800 mb-6">{post.title}</h1>
                    {auth.user && auth.user.id === post.user_id && (
                        <div className="flex space-x-4 mt-6">
                            <Link
                                href={route('post.edit', post.id)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(post.id)} // ✅ เรียกฟังก์ชัน handleDelete อย่างถูกต้อง
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
