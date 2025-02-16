<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController; // Ensure AuthController exists in this namespace

// Route สำหรับโพสต์


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ครอบทุก API ที่ต้องการ Auth ด้วย Middleware
Route::middleware('auth:sanctum')->group(function () {
    /*Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::put('/posts/{id}', [PostController::class, 'update']); 
    Route::delete('/posts/{id}', [PostController::class, 'destroy']); **/
    Route::apiResource('posts', PostController::class);
});

