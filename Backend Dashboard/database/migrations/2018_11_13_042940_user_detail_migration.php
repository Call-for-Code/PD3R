<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserDetailMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('phone_no')->unique();
            $table->string('disaster_timeline');
            $table->string('lat');
            $table->string('long');
            $table->string('desc');
            $table->string('masonry');
            $table->string('external_face');
            $table->string('damage_wall');
            $table->string('storeys');
            $table->string('photo_1');
            $table->string('photo_2');
            $table->string('photo_3');
            $table->string('photo_4');
            $table->string('photo_5');
            $table->string('photo_6');
            $table->string('status');
            $table->string('house_status');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_details');
    }
}
