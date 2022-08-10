<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Post extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function tags()
    {
        return $this->morphToMany(
            Tags::class,
            'taggable',
            'taggables', // pivot table name
            'taggable_id',
            'tag_id'
        );
    }

    public function image()
    {
        return $this->morphOne(Imageable::class, 'imageable');
    }
}
