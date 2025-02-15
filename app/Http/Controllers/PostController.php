<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        // ดึงข้อมูล   โพสต์ทั้งหมดจากฐานข้อมูล
        $posts = Post::all();

        // ส่งข้อมูลกลับในรูปแบบ JSON
        return response()->json($posts);
    }
    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'category_id' => 'required|exists:categories,id',
        'views' => 'nullable|integer|min:0',
        'status' => 'nullable|string|in:active,draft,deleted',
    ]);

    $post = Post::create([
        'user_id' => auth()->id(),
        'title' => $request->title,
        'content' => $request->content,
        'category_id' => $request->category_id,
        'views' => $request->views ?? 0, // ตั้งค่าเริ่มต้นถ้าไม่ได้ส่งมา
        'status' => $request->status ?? 'active', // ค่าเริ่มต้นเป็น "active"
    ]);

    return response()->json(['message' => 'Post created!']);
}

    public function show($id)
    {
        $post = Post::with('comments.user', 'category', 'likes')->findOrFail($id);
        return response()->json($post);
    }
}

