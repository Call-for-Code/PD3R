package com.example.dell.retrofit;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dell.retrofit.Adapter.SpinnerAdapter;

import java.util.ArrayList;

public class QuestionActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener {
    private Spinner radioAnswerGroup;
    //private RadioButton radioAnswerButton;
    private Button btnDisplay;
    private boolean isSpinnerTouched = false;
    //
    Spinner third_spinner;
    TextView thirdTv;

    Spinner fourth_spinner;
    TextView fourthTv;

    Spinner second_spinner;
    TextView secondTv;


    String[] textArray = {"Select Option(विकल्प चयन गर्नुहोस्)", "Yes(हो)", "No(होइन)"};
    //Integer[] imageArray = {0, R.drawable.eqhouse_min,R.drawable.eqhouse_min};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        TextView mTitle = (TextView) toolbar.findViewById(R.id.toolbar_title);
        mTitle.setText(R.string.title_activity_question);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        radioAnswerGroup = (Spinner) findViewById(R.id.completeQuestionSpinner);

        second_spinner = findViewById(R.id.second_spinner);
        secondTv = findViewById(R.id.secondTv);

        third_spinner = findViewById(R.id.third_spinner);
        thirdTv = findViewById(R.id.thirdTv);

        fourth_spinner = findViewById(R.id.fourth_spinner);
        fourthTv = findViewById(R.id.fourthTv);
        radioAnswerGroup.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                isSpinnerTouched = true;
                return false;
            }
        });
        int initialSelectedPosition = radioAnswerGroup.getSelectedItemPosition();
        radioAnswerGroup.setSelection(initialSelectedPosition, true);

        // Initializing an ArrayAdapter
        final SpinnerAdapter questionAdapter = new SpinnerAdapter(
                this, R.layout.spinner_item, textArray) {
            @Override
            public boolean isEnabled(int position) {
                if (position == 0) {
                    return false;
                } else {
                    return true;
                }
            }

//            @Override
//            public View getDropDownView(int position, View convertView,
//                                        ViewGroup parent) {
//                View view = super.getDropDownView(position, convertView, parent);
//                TextView tv = (TextView) view;
//                if (position == 0) {
//                    // Set the hint text color gray
//                    tv.setTextColor(Color.GRAY);
//                } else {
//                    tv.setTextColor(Color.BLACK);
//                }
//                return view;
//            }
        };
        questionAdapter.setDropDownViewResource(R.layout.spinner_item);
        radioAnswerGroup.setAdapter(questionAdapter);
        radioAnswerGroup.setOnItemSelectedListener(this);
        btnDisplay = (Button) findViewById(R.id.btnSubmit);
    }
    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
        switch (adapterView.getId()) {
            case R.id.completeQuestionSpinner:
                 if (i > 0) {
                    //String value = adapterView.getItemAtPosition(i).toString();
                     String text = radioAnswerGroup.getSelectedItem().toString();
                    if (text.contains("Yes")) {
                        second_spinner.setVisibility(View.VISIBLE);
                        secondTv.setVisibility(View.VISIBLE);
                        String[] textArray = {"Select Option(विकल्प चयन गर्नुहोस्)", "Yes(छन)", "No(छैनन)"};
                        //for spinner setup
                        second_spinner.setOnTouchListener(new View.OnTouchListener() {
                            @Override
                            public boolean onTouch(View v, MotionEvent event) {
                                isSpinnerTouched = true;
                                return false;
                            }
                        });
                        int initialSelectedPosition = second_spinner.getSelectedItemPosition();
                        second_spinner.setSelection(initialSelectedPosition, true);

                        // Initializing an ArrayAdapter
//                        final SpinnerAdapter second_questionAdapter = new SpinnerAdapter(
//                                this, R.layout.spinner_item, textArray,imageArray)
                        final SpinnerAdapter second_questionAdapter = new SpinnerAdapter(
                                this, R.layout.spinner_item, textArray) {
                            @Override
                            public boolean isEnabled(int position) {
                                if (position == 0) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }

//                            @Override
//                            public View getDropDownView(int position, View convertView,
//                                                        ViewGroup parent) {
//                                View view = super.getDropDownView(position, convertView, parent);
//                                TextView tv = (TextView) view;
//                                if (position == 0) {
//                                    // Set the hint text color gray
//                                    tv.setTextColor(Color.GRAY);
//                                } else {
//                                    tv.setTextColor(Color.BLACK);
//                                }
//                                return view;
//                            }
                        };
                        second_questionAdapter.setDropDownViewResource(R.layout.spinner_item);
                        second_spinner.setAdapter(second_questionAdapter);
                        second_spinner.setOnItemSelectedListener(this);
                    } else {
                        Toast.makeText(QuestionActivity.this, "Thank you.You are not ready for retrofit.(फेरी कोशीस गर्नु होस् |)", Toast.LENGTH_SHORT).show();
                        second_spinner.setVisibility(View.GONE);
                        secondTv.setVisibility(View.GONE);

                        third_spinner.setVisibility(View.GONE);
                        thirdTv.setVisibility(View.GONE);

                        fourth_spinner.setVisibility(View.GONE);
                        fourthTv.setVisibility(View.GONE);

                        btnDisplay.setVisibility(View.GONE);
                    }
                }
                break;
            case R.id.second_spinner:
                Log.d("CLICKEDSECOND", "PASS1");
                if (i > 0) {
                    String value_second = adapterView.getItemAtPosition(i).toString();

                    if (value_second.contains("Yes")) {
                        Log.d("CLICKEDSECOND", "YES");
                        third_spinner.setVisibility(View.VISIBLE);
                        thirdTv.setVisibility(View.VISIBLE);
                        String[] textArray = {"Select Option(विकल्प चयन गर्नुहोस्)", "Yes(छ)", "No(छैन)"};

                        //for spinner setup
                        third_spinner.setOnTouchListener(new View.OnTouchListener() {
                            @Override
                            public boolean onTouch(View v, MotionEvent event) {
                                isSpinnerTouched = true;
                                return false;
                            }
                        });
                        int initialSelectedPosition = third_spinner.getSelectedItemPosition();
                        third_spinner.setSelection(initialSelectedPosition, true);

                        // Initializing an ArrayAdapter
                        final SpinnerAdapter third_questionAdapter = new SpinnerAdapter(
                                this,  R.layout.spinner_item, textArray) {
                            @Override
                            public boolean isEnabled(int position) {
                                if (position == 0) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }

//                            @Override
//                            public View getDropDownView(int position, View convertView,
//                                                        ViewGroup parent) {
//                                View view = super.getDropDownView(position, convertView, parent);
//                                TextView tv = (TextView) view;
//                                if (position == 0) {
//                                    // Set the hint text color gray
//                                    tv.setTextColor(Color.GRAY);
//                                } else {
//                                    tv.setTextColor(Color.BLACK);
//                                }
//                                return view;
//                            }
                        };
                        third_questionAdapter.setDropDownViewResource(R.layout.spinner_item);
                        third_spinner.setAdapter(third_questionAdapter);
                        third_spinner.setOnItemSelectedListener(this);
                    } else {
                        Log.d("CLICKEDSECOND", "NO");
                        Toast.makeText(QuestionActivity.this, "Thank you.You are not ready for retrofit.(फेरी कोशीस गर्नु होस् |)", Toast.LENGTH_SHORT).show();
                        third_spinner.setVisibility(View.GONE);
                        thirdTv.setVisibility(View.GONE);

                        fourth_spinner.setVisibility(View.GONE);
                        fourthTv.setVisibility(View.GONE);

                        btnDisplay.setVisibility(View.GONE);

                    }
                }
                break;
            case R.id.third_spinner:
                Log.d("CLICKED", "PASS1");
                if (i > 0) {
                    String value_third = adapterView.getItemAtPosition(i).toString();
                    if (value_third.contains("No")) {
                        fourth_spinner.setVisibility(View.VISIBLE);
                        fourthTv.setVisibility(View.VISIBLE);
                        String[] textArray = {"Select Option(विकल्प चयन गर्नुहोस्)", "Yes(छ)", "No(छैन)"};
                        //for spinner setup
                        fourth_spinner.setOnTouchListener(new View.OnTouchListener() {
                            @Override
                            public boolean onTouch(View v, MotionEvent event) {
                                isSpinnerTouched = true;
                                return false;
                            }
                        });
                        int initialSelectedPosition = fourth_spinner.getSelectedItemPosition();
                        fourth_spinner.setSelection(initialSelectedPosition, true);

                        // Initializing an ArrayAdapter
                        final SpinnerAdapter fourth_questionAdapter = new SpinnerAdapter(
                                this, R.layout.spinner_item, textArray) {
                            @Override
                            public boolean isEnabled(int position) {
                                if (position == 0) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }

//                            @Override
//                            public View getDropDownView(int position, View convertView,
//                                                        ViewGroup parent) {
//                                View view = super.getDropDownView(position, convertView, parent);
//                                TextView tv = (TextView) view;
//                                if (position == 0) {
//                                    // Set the hint text color gray
//                                    tv.setTextColor(Color.GRAY);
//                                } else {
//                                    tv.setTextColor(Color.BLACK);
//                                }
//                                return view;
 //                           }
                        };
                        fourth_questionAdapter.setDropDownViewResource(R.layout.spinner_item);
                        fourth_spinner.setAdapter(fourth_questionAdapter);
                        fourth_spinner.setOnItemSelectedListener(this);
                    } else {
                        Toast.makeText(QuestionActivity.this, "Thank you.You are not ready for retrofit.(फेरी कोशीस गर्नु होस् |)", Toast.LENGTH_SHORT).show();
                        fourth_spinner.setVisibility(View.GONE);
                        fourthTv.setVisibility(View.GONE);

                        btnDisplay.setVisibility(View.GONE);

                    }
                }
                break;
            case R.id.fourth_spinner:
                if (i > 0) {
                    String value_fourth = adapterView.getItemAtPosition(i).toString();
                    if (value_fourth.contains("No")) {
                        btnDisplay.setVisibility(View.VISIBLE);
                        btnDisplay.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                Intent main_intent = new Intent(QuestionActivity.this, MainActivity.class);
                                startActivity(main_intent);
                            }
                        });
                    } else {
                        Toast.makeText(QuestionActivity.this, "Thank you.You are not ready for retrofit.(फेरी कोशीस गर्नु होस् |)", Toast.LENGTH_SHORT).show();
                        btnDisplay.setVisibility(View.GONE);
                    }
                }
                break;
            default:
                break;
        }
    }
    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {
    }
    @Override
    public void onBackPressed() {
        this.finish();
//        Intent int1= new Intent(this, QuestionActivity.class);
//        int1.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//        startActivity(int1);
        super.onBackPressed();

    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.language_menu, menu);
        return true;
    }
    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        return super.onPrepareOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
         if (id == R.id.english_lan) {
            Log.d("LANGUAGE", "ENGLISH");
            return true;
        }
        if (id == R.id.nepali_lan) {
            Log.d("LANGUAGE", "NEPALI");
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

}
