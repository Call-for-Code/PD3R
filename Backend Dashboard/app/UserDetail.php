<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    protected $table = 'user_details';
    protected $fillable = ['name','email','phone_no','disaster_timeline','lat','long','desc','photo_1','photo_2','photo_3','photo_4','photo_5','photo_6','status'];
}
