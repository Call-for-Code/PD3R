package com.example.dell.retrofit.Utility;

import android.app.Service;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

public class Global {

    Context mContext;
    public Global(Context context){
        this.mContext = context;
    }
    private static final String TAG = Global.class.getSimpleName();

    public boolean getInternet(){
        ConnectivityManager connectivity =(ConnectivityManager)
                mContext.getSystemService(Service.CONNECTIVITY_SERVICE);
        if (connectivity!=null){
            NetworkInfo networkInfo = connectivity.getActiveNetworkInfo();
            if (networkInfo!=null){
                if (networkInfo.getState()==NetworkInfo.State.CONNECTED){
                    return true;
                }

            }
        }
        return false;
    }
}
