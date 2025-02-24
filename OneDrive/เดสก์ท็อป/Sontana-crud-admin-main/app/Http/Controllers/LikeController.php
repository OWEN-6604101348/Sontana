<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Like;

class LikeController extends Controller
{
    public function store($id)
    {
        $user = auth()->user();

        // ค้นหาโพสต์
        $post = Post::findOrFail($id);

        // ตรวจสอบว่าผู้ใช้เคยกดไลก์หรือยัง
        $like = Like::where('post_id', $post->id)
                    ->where('user_id', $user->id)
                    ->first();

        if ($like) {
            // ถ้ามีไลก์อยู่แล้ว ให้ยกเลิกไลก์
            $like->delete();
            return redirect()->back()->with('message', 'Unliked post');
        }

        // ถ้ายังไม่เคยไลก์ ให้เพิ่มไลก์ใหม่
        Like::create([
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);

        return redirect()->back()->with('message', 'Liked post');
    }

    public function remove($id)
    {
        $user = auth()->user();
        $post = Post::findOrFail($id);

        // ค้นหา Like ที่เกี่ยวข้องกับโพสต์และผู้ใช้
        $like = Like::where('post_id', $post->id)
                    ->where('user_id', $user->id)
                    ->first();

        if ($like) {
            $like->delete();
        }

        return redirect()->back();
    }
}
