<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::with(['post.user'])->get(); // โหลดโพสต์และผู้ใช้ที่เกี่ยวข้อง
        return Inertia::render('Admin/Reports', ['reports' => $reports]);

    }

    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'reason' => 'required|string',
        ]);

        Report::create([
            'reporter_id' => auth()->user()->id,
            'post_id' => $request->post_id,
            'reason' => $request->reason,
            'status' => 'pending',
        ]);

    }
}
