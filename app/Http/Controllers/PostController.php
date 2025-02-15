<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $post = Post::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'status' => 'active',
        ]);

        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = Post::with('comments.user', 'category', 'likes')->findOrFail($id);
        return response()->json($post);
    }
}

