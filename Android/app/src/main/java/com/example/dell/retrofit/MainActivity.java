/*
   Copyright 2018 Nirmal Adhikari, Lakshyana KC, Shreyasha Paudel, Kshitz Rimal, Nicolas Oritiz

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

package com.example.dell.retrofit;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.StrictMode;
import com.android.volley.error.VolleyError;
import com.android.volley.request.SimpleMultiPartRequest;
import android.provider.MediaStore;
import android.support.v4.content.CursorLoader;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import com.android.volley.Request;
import com.android.volley.Response;
import com.example.dell.retrofit.Utility.Global;
import com.example.dell.retrofit.Utility.Utility;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import butterknife.BindView;
import butterknife.ButterKnife;
public class MainActivity extends AppCompatActivity {
    @BindView(R.id.get_image_button)
    Button get_image_button;
    @BindView(R.id.upload_button) Button upload_button;
    private String userChoosenTask, userSelectButton;
    private int REQUEST_CAMERA = 0, SELECT_FILE = 1;
    Uri imageUri;
    String retrofitPhotoPath;
    Bitmap reducedCitizenBitmap;
    public static String BASE_URL = "Your API Code HERE";
    String filePath;
    ImageView retrofitImage;
    Global globalContext;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        TextView mTitle = (TextView) toolbar.findViewById(R.id.toolbar_title);
        mTitle.setText(R.string.main_text);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        ButterKnife.bind(this);
        retrofitImage = findViewById(R.id.retrofit_image);
        globalContext = new Global(this);
    }
    public void getImage(View view) {
        selectImage();
    }

    public void UploadImage(View view) {
        Log.d("UPLOADCLICKED", "UPLOADCLICKED");
        //after getting data validationn start
       if (globalContext.getInternet()){
           if (!validate()){

           }else{
               saveData();
           }
        }else{
           Toast.makeText(getApplicationContext(), "No internet available.", Toast.LENGTH_SHORT).show();
       }
    }
    private void saveData() {
        imageUpload(filePath);
    }

    private void imageUpload(final String filePath) {
        final String[] fPath = {filePath};
        final ProgressDialog progressView = new ProgressDialog(this);
        progressView.setMessage("Sending Image");
        progressView.setCancelable(false);
        progressView.show();
        SimpleMultiPartRequest smr = new SimpleMultiPartRequest(Request.Method.POST, BASE_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("Response", response);
                        try {
                            JSONObject jObj = new JSONObject(response);
                            String status = jObj.getString("status");
                            Toast.makeText(getApplicationContext(), status, Toast.LENGTH_LONG).show();
                            progressView.dismiss();
                            retrofitImage.setVisibility(View.GONE);
                            if(fPath[0].length()>0){
                                fPath[0] = "";
                            }
                        } catch (JSONException e) {
                            // JSON error
                            e.printStackTrace();
                            Toast.makeText(getApplicationContext(), "error" + e.getMessage(), Toast.LENGTH_LONG).show();
                            progressView.dismiss();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_LONG).show();
                progressView.dismiss();
                retrofitImage.setVisibility(View.GONE);
            }
        });

        smr.addFile("url", fPath[0]);
        MyApplication.getInstance().addToRequestQueue(smr);
    }
    private boolean isValidNormalPath(String normalPath){
        if (normalPath !=null && normalPath.length()>=5){
            return true;
        }else {

        }
        return false;
    }
    public boolean validate(){

        boolean valid = true;

          if (!isValidNormalPath(retrofitPhotoPath)){
            Toast.makeText(MainActivity.this,"Please Select Image.",Toast.LENGTH_SHORT).show();
            valid = false;
        }
        return valid;
    }
    private void selectImage() {
        final CharSequence[] items = {"Take Photo", "Choose from Library",
                "Cancel"};
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        builder.setTitle("Add Photo!");
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                boolean result = Utility.checkPermission(MainActivity.this);

                if (items[item].equals("Take Photo")) {
                    userChoosenTask = "Take Photo";
                    if (result)
                        cameraIntent();

                } else if (items[item].equals("Choose from Library")) {
                    userChoosenTask = "Choose from Library";
                    if (result)
                        galleryIntent();

                } else if (items[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    private void galleryIntent() {
        Intent galleryIntent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        // Start the Intent
        startActivityForResult(Intent.createChooser(galleryIntent, "Select File"), SELECT_FILE);
    }
    private void cameraIntent() {
        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        filePath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/retrofit_pic_" + String.valueOf(System.currentTimeMillis()) + ".jpg";
        File imageFile = new File(filePath);
        imageUri = Uri.fromFile(imageFile); // convert path to Uri
        cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
        startActivityForResult(cameraIntent, REQUEST_CAMERA);
        Log.d("CBTIMAGEFILE", " Generated Image File " + filePath);
        Log.d("CAMERAURI", String.valueOf(imageUri));
        Log.d("CAMERAIMPATH", String.valueOf(filePath));
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == SELECT_FILE)
                onSelectFromGalleryResult(data);
            else if (requestCode == REQUEST_CAMERA)
                onCaptureImageResult();
        }
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case Utility.MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    if(userChoosenTask.equals("Take Photo"))
                        cameraIntent();
                    else if(userChoosenTask.equals("Choose from Library"))
                        galleryIntent();
                } else {
                    //code for deny
                }
                break;
        }
    }
    private String getPath(Uri contentUri) {
        String[] proj = { MediaStore.Images.Media.DATA };
        CursorLoader loader = new CursorLoader(getApplicationContext(), contentUri, proj, null, null, null);
        Cursor cursor = loader.loadInBackground();
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String result = cursor.getString(column_index);
        cursor.close();
        return result;
    }
    private void onSelectFromGalleryResult(Intent data) {
            if (data.getData() != null) {
                Uri uri;
                uri = data.getData();
                filePath = getPath(uri);
                InputStream imageStream = null;
                try {
                    imageStream = getContentResolver().openInputStream(uri);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                Log.d("URIPATH", String.valueOf(data.getData()));
                 Log.d("filePath", filePath);
                Bitmap reducedSizeBitmap = BitmapFactory.decodeStream(imageStream);
                reducedSizeBitmap = getResizedBitmap(reducedSizeBitmap, 100);//
                ByteArrayOutputStream citizenStream = new ByteArrayOutputStream();
                reducedSizeBitmap.compress(Bitmap.CompressFormat.PNG, 50, citizenStream);
                byte[] citizenByte = citizenStream.toByteArray();
                retrofitPhotoPath = Base64.encodeToString(citizenByte, Base64.DEFAULT);
                Log.d("RETROFITPATH", retrofitPhotoPath);
                retrofitImage.setVisibility(View.VISIBLE);
                retrofitImage.setImageBitmap(reducedSizeBitmap);
                return;
            }
            Toast.makeText(this, "Error while capturing Image", Toast.LENGTH_SHORT).show();
        }
    private void onCaptureImageResult() {
            if (imageUri != null) {
                getContentResolver().notifyChange(imageUri, null);
                reducedCitizenBitmap = getBitmap(imageUri.getPath());
                ByteArrayOutputStream citizenStream = new ByteArrayOutputStream();
                reducedCitizenBitmap.compress(Bitmap.CompressFormat.PNG, 50, citizenStream);
                byte[] citizenByte = citizenStream.toByteArray();
                retrofitPhotoPath = Base64.encodeToString(citizenByte, Base64.DEFAULT);
                Log.d("PHOTOPATHCAPTURE", retrofitPhotoPath);
                 ImageView retrofitImage = findViewById(R.id.retrofit_image);
                retrofitImage.setVisibility(View.VISIBLE);
                retrofitImage.setImageBitmap(reducedCitizenBitmap);
                return;
            }
            Toast.makeText(this, "Error while capturing Image", Toast.LENGTH_SHORT).show();
    }
    //for gallery
    public Bitmap getResizedBitmap(Bitmap image, int maxSize) {
        int width = image.getWidth();
        int height = image.getHeight();
        float bitmapRatio = (float)width / (float) height;
        if (bitmapRatio > 1) {
            width = maxSize;
            height = (int) (width / bitmapRatio);
        } else {
            height = maxSize;
            width = (int) (height * bitmapRatio);
        }
        return Bitmap.createScaledBitmap(image, width, height, true);
    }
    //for camer
    private Bitmap getBitmap(String path) {
        Log.d("CBT", " Path of the image " + path);
        Uri uri = Uri.fromFile(new File(path));
        try {
            Bitmap b;
            InputStream in = getContentResolver().openInputStream(uri);
            BitmapFactory.Options o = new BitmapFactory.Options();
            o.inJustDecodeBounds = true;
            BitmapFactory.decodeStream(in, null, o);
            in.close();
            int scale = 0;
            while (((double) (o.outWidth * o.outHeight)) * (1.0d / Math.pow((double) scale, 2.0d)) > 1200000.0d) {
                scale++;
            }
            Log.d("", "scale = " + scale + ", orig-width: " + o.outWidth + ", orig-height: " + o.outHeight);
            in = getContentResolver().openInputStream(uri);
            if (scale > 1) {
                scale--;
                o = new BitmapFactory.Options();
                o.inSampleSize = scale;
                b = BitmapFactory.decodeStream(in, null, o);
                int height = b.getHeight();
                int width = b.getWidth();
                Log.d("", "1th scale operation dimenions - width: " + width + ", height: " + height);
                double y = Math.sqrt(1200000.0d / (((double) width) / ((double) height)));
                Bitmap scaledBitmap = Bitmap.createScaledBitmap(b, (int) ((y / ((double) height)) * ((double) width)), (int) y, true);
                b.recycle();
                b = scaledBitmap;
                System.gc();
            } else {
                b = BitmapFactory.decodeStream(in);
            }
            in.close();
            Log.d("", "bitmap size - width: " + b.getWidth() + ", height: " + b.getHeight());
            return b;
        } catch (IOException e) {
            Log.e("", e.getMessage(), e);
            return null;
        }
    }
    @Override
    public void onBackPressed() {
        //this.finish();
        Intent int1= new Intent(this, QuestionActivity.class);
        int1.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(int1);
        super.onBackPressed();

    }
}
