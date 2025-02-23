import React, { useState, useEffect } from 'react';
import { usePage, useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useHistory } from 'react-router-dom';

export default function EditPost() {
    const { post, categories } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
        category_id: post.category_id,
        image: null,
    });

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('post.update', post.id), {
            onSuccess: () => history.push(route('post.show', post.id)),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Post" />
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    {/* Content */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        {processing ? 'Saving...' : 'Update Post'}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
