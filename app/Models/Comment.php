<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['post_id', 'user_id', 'content', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
