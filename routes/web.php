<?php
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
// นำเข้าคอนโทรลเลอร์ที่ใช้ในเส้นทางต่าง ๆ
use App\Http\Controllers\ProfileController;
// นำเข้าคลาสที่ใช้สำหรับแอปพลิเคชัน
use Illuminate\Foundation\Application;
// นำเข้าคลาสที่ใช้สำหรับกำหนดเส้นทาง
use Illuminate\Support\Facades\Route;
// นำเข้า Inertia สำหรับการเรนเดอร์หน้าเว็บ
use App\Http\Controllers\AuthController; // Ensure AuthController exists in this namespace
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Category;


// เส้นทางหลักของเว็บไซต์ที่แสดงหน้าต้อนรับ
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'), // ตรวจสอบว่ามีเส้นทางเข้าสู่ระบบ
        'canRegister' => Route::has('register'), // ตรวจสอบว่ามีเส้นทางสมัครสมาชิก
        'laravelVersion' => Application::VERSION, // แสดงเวอร์ชันของ Laravel
        'phpVersion' => PHP_VERSION, // แสดงเวอร์ชันของ PHP
    ]);
});


// เส้นทางสำหรับแดชบอร์ดที่ต้องการการยืนยันตัวตนและอีเมล
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// กลุ่มเส้นทางที่ต้องการการยืนยันตัวตน
Route::middleware('auth')->group(function () {
    // เส้นทางสำหรับการแก้ไขข้อมูลโปรไฟล์
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // เส้นทางสำหรับการอัพเดทข้อมูลโปรไฟล์
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // เส้นทางสำหรับการลบโปรไฟล์
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});





Route::middleware('auth')->group(function () {
    Route::get('/sontana/posts', [PostController::class, 'index'])->name('post.index');
    Route::get('/sontana/posts/{id}', [PostController::class, 'show'])->name('post.show');
    Route::post('/posts/{id}/comment', [CommentController::class, 'store'])->name('post.comment');
    
    Route::get('/sontana/create', [PostController::class, 'create'])->name('post.create');
    Route::post('/sontana/posts', [PostController::class, 'store'])->name('post.store');
    Route::delete('sontana/posts/{id}', [PostController::class, 'destroy'])->name('post.destroy');

    

    Route::get('/sontana/posts/{id}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::put('/sontana/posts/{id}', [PostController::class, 'update'])->name('post.update');
    



});


require __DIR__.'/auth.php';