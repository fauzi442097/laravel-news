<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imageable extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $primaryKey = null;
    public $incrementing = false;

    public function imageable()
    {
        return $this->morphTo();
    }
}
