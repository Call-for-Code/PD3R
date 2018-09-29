package com.example.dell.retrofit.Adapter;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dell.retrofit.R;

public class SpinnerAdapter  extends ArrayAdapter<String> {

    private Context ctx;
    private String[] contentArray;
    private Integer[] imageArray;

    public SpinnerAdapter(Context context, int resource, String[] objects) {
        super(context,  R.layout.spinner_value_layout, R.id.spinnerTextView, objects);
        this.ctx = context;
        this.contentArray = objects;
        this.imageArray = imageArray;
    }

    @Override
    public View getDropDownView(int position, View convertView,ViewGroup parent) {
        return getCustomView(position, convertView, parent);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return getCustomView(position, convertView, parent);
    }

    public View getCustomView(int position, View convertView, ViewGroup parent) {

        LayoutInflater inflater = (LayoutInflater)ctx.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View row = inflater.inflate(R.layout.spinner_value_layout, parent, false);
        if (position==0){
            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(0, 0);
            TextView textView = (TextView) row.findViewById(R.id.spinnerTextView);
            textView.setText(contentArray[position]);
            textView.setTextColor(Color.GRAY);

            //ImageView imageView = (ImageView)row.findViewById(R.id.spinnerImages);
            //imageView.setLayoutParams(layoutParams);
            //imageView.setImageResource(imageArray[position]);
        }else {
             TextView textView = (TextView) row.findViewById(R.id.spinnerTextView);
            textView.setText(contentArray[position]);
            textView.setTextColor(Color.BLACK);
           // ImageView imageView = (ImageView)row.findViewById(R.id.spinnerImages);
            //imageView.setImageResource(imageArray[position]);
        }


        return row;
    }
}
