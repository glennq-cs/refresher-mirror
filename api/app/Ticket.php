<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'name','user_id','category_id'
    ];

    protected $hidden = [];
}