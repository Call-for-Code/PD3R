<?php

namespace App\Http\Controllers;

use App\UserDetail;
use Illuminate\Http\Request;

class APIController extends Controller
{
    public function store(Request $request){

        $name = $request->name;
        $email = $request->email;
        $phone_no = $request->phone_no;
        $disaster_timeline = $request->disaster_timeline;
        $lat = $request->lat;
        $long = $request->long;
        $status = 'active';
        $housestatus = 'go';
        $external_face = $request->external_face;
        $masonry = $request->masonry;
        $damage_wall = $request->damage_wall;
        $storeys = $request->storeys;
        
        

        if ($request->has('desc') && $request->desc != "") {

            $desc = $request->desc;
        } else {
            $desc = '';
        }

        if ($request->has('photo_1') && $request->photo_1 != "") {
            $path = $request->file('photo_1')->store('uploads/design', 'public');
            $photo_1 = $path;
        } else {
            $photo_1 = "";
        }

        if ($request->has('photo_2') && $request->photo_2 != "") {
            $path = $request->file('photo_2')->store('uploads/design', 'public');
            $photo_2 = $path;
        } else {
            $photo_2 = "";
        }
        if ($request->has('photo_3') && $request->photo_3 != "") {
            $path = $request->file('photo_3')->store('uploads/design', 'public');
            $photo_3 = $path;
        } else {
            $photo_3 = "";
        }
        if ($request->has('photo_4') && $request->photo_4 != "") {
            $path = $request->file('photo_4')->store('uploads/design', 'public');
            $photo_4 = $path;
        } else {
            $photo_4 = "";
        }
        if ($request->has('photo_5') && $request->photo_5 != "") {
            $path = $request->file('photo_5')->store('uploads/design', 'public');
            $photo_5 = $path;
        } else {
            $photo_5 = "";
        }
        if ($request->has('photo_6') && $request->photo_6 != "") {
            $path = $request->file('photo_6')->store('uploads/design', 'public');
            $photo_6 = $path;
        } else {
            $photo_6 = "";
        }

        if($masonry == 'no' || $external_face == 'no' || $damage_wall =='yes' || $storeys == 'yes' ){
        $details = new UserDetail();
        $details->name = $name;
        $details->email = $email;
        $details->phone_no = $phone_no;
        $details->disaster_timeline = $disaster_timeline;
        $details->lat = $lat;
        $details->long = $long;
        $details->desc = $desc;
        $details->status = $status;
        $details->photo_1 = $photo_1;
        $details->photo_2 = $photo_2;
        $details->photo_3 = $photo_3;
        $details->photo_4 = $photo_4;
        $details->photo_5 = $photo_5;
        $details->photo_6 = $photo_6;
        $details->masonry = $masonry;
        $details->external_face = $external_face;
        $details->damage_wall = $damage_wall;
        $details->storeys = $storeys;
        $details->house_status = 'nogo';
        
        $details->save();
        $response = array(
            'status' => 'nogo',
            'msg' => 'New Details Request Send successfully',
            );
            return \Response::json($response);
        }else{
            $details = new UserDetail();

            $details->name = $name;
            $details->email = $email;
            $details->phone_no = $phone_no;
            $details->disaster_timeline = $disaster_timeline;
            $details->lat = $lat;
            $details->long = $long;
            $details->desc = $desc;
            $details->status = $status;
            $details->photo_1 = $photo_1;
            $details->photo_2 = $photo_2;
            $details->photo_3 = $photo_3;
            $details->photo_4 = $photo_4;
            $details->photo_5 = $photo_5;
            $details->photo_6 = $photo_6;
            $details->masonry = $masonry;
            $details->external_face = $external_face;
            $details->damage_wall = $damage_wall;
            $details->storeys = $storeys;
            $details->house_status = $housestatus;
            
            $details->save();
            
            //call post API by sending the images
            $apiResponce = "post API url to AI model"
    
        if($apiResponce == 0){
        $response = array(
        'status' => 'go',
        'msg' => 'New Details Request Send successfully',
        );
        return \Response::json($response);
        }else{
        $response = array(
        'status' => 'nogo',
        'msg' => 'New Details Request Send successfully',
        );
        return \Response::json($response);
        }
        }

    

    }

    public function test(){
        
        
        
           $d = rand(0,1);

    if($d == 0){
    $response = array(
    'status' => 'go',
    'msg' => 'New Details Request Send successfully',
    );
    return \Response::json($response);
    }else{
        $response = array(
    'status' => 'nogo',
    'msg' => 'New Details Request Send successfully',
    );
    return \Response::json($response);
    }
    
       
    }
}
