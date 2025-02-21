<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user', 'category', 'comments', 'likes', 'attachments'])->get();
        $categories = Category::all();

        return Inertia::render('Sontana/Posts/Index', [
            'posts' => $posts,
            'categories' => $categories
        ]);
    }

    public function create()
    {
        $categories = Category::all(); // ดึงหมวดหมู่จากฐานข้อมูล
    
        return Inertia::render('Sontana/Posts/create', [
            'categories' => $categories
        ]);
    }
    

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048', // ✅ ตรวจสอบไฟล์รูปภาพ
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads', 'public'); // ✅ บันทึกภาพ
        }

        Post::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'image' => $imagePath,
            'status' => 'active',
        ]);

        return redirect()->route('post.index')->with('success', 'Post created!');
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Sontana/Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048', // ✅ อัปโหลดรูปใหม่ (ถ้ามี)
        ]);

        // ✅ ลบรูปเก่าถ้ามีการอัปโหลดรูปใหม่
        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $post->image = $request->file('image')->store('uploads', 'public');
        }

        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'image' => $post->image, // ✅ เก็บค่ารูปใหม่ (ถ้ามี)
        ]);

        return redirect()->route('post.index')->with('success', 'Post updated!');
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== auth()->id()) {
            abort(403);
        }

        // ✅ ลบรูปภาพจาก Storage ก่อนลบโพสต์
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->route('post.index')->with('success', 'Post deleted!');
    }
}
