<?php

namespace App\Models;

// Import สำหรับกำหนดความสัมพันธ์และฟังก์ชันที่ใช้ในโมเดล User
use Illuminate\Database\Eloquent\Relations\HasMany; // ใช้กำหนดความสัมพันธ์แบบ HasMany
use Illuminate\Database\Eloquent\Factories\HasFactory; // ใช้สำหรับสร้าง factory ในการทดสอบ
use Illuminate\Foundation\Auth\User as Authenticatable; // ใช้สร้าง User Model ที่รองรับการ Authentication
use Illuminate\Notifications\Notifiable; // ใช้สำหรับส่งการแจ้งเตือน (Notifications)

class User extends Authenticatable
{

     // กำหนดความสัมพันธ์ว่า User มีหลาย Chirps
     // หมายความว่า ผู้ใช้แต่ละคนสามารถสร้าง Chirp ได้หลายรายการ



    /* @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable; // ใช้ Traits สำหรับเพิ่มความสามารถพิเศษ เช่น การสร้างข้อมูลทดสอบ และการแจ้งเตือน


    
    /**
     * 
     * 
     *
     * @var array<int, string>
     */
    protected $fillable = [//กำหนดฟิลด์ที่สามารถกรอกข้อมูลได้ (Mass Assignable)
        'name',             //ป้องกันการโจมตีแบบ Mass Assignment โดยอนุญาตให้ฟิลด์ name, email, และ password สามารถบันทึกได้
        'email',
        'password',
        'role'
    ];

    
    /**
     * 
     * 
     *
     * @var array<int, string>
     */
    protected $hidden = [//กำหนดฟิลด์ที่ต้องถูกซ่อนเมื่อโมเดลถูกแปลงเป็น JSON
        'password',     //เช่น password และ remember_token จะไม่แสดงใน API Response
        'remember_token',
    ];

    /**
     * 
     * 
     *
     * @return array<string, string>
     */
    protected function casts(): array//กำหนดการแปลงข้อมูล (Casts)
    {                   //ใช้เพื่อเปลี่ยนชนิดข้อมูลของฟิลด์เมื่อทำการอ่านหรือเขียนในฐานข้อมูล
        return [
            'email_verified_at' => 'datetime', // แปลงฟิลด์ email_verified_at เป็นชนิด datetime
            'password' => 'hashed', // แปลงฟิลด์ password ให้เก็บข้อมูลในรูปแบบ hashed
        ];
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'reporter_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}

