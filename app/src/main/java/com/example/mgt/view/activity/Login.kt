package com.example.mgt.view.activity

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.example.mgt.databinding.ActivityLoginBinding

import com.example.mgt.view.data.logindata
import com.example.mgt.view.response.MentorResponse
import com.example.mgt.view.response.loginResponse
import com.example.mgt.view.retrofit.RetrofitApi
import com.example.mgt.view.retrofit.retrofitclient
import com.example.mgt.view.activity.mentor.MentorMainActivity
import com.example.mgt.view.activity.student.MainActivity
import com.example.mgt.view.activity.student.RegisterActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class Login : AppCompatActivity() {
   lateinit var prefrences:SharedPreferences
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val loginBinding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(loginBinding.root)
        prefrences = getSharedPreferences("Login",Context.MODE_PRIVATE)
        var editor:SharedPreferences.Editor = prefrences.edit()

        loginBinding.emailaddress.setText(prefrences.getString("email","").toString())
        loginBinding.TextPassword.setText(prefrences.getString("password","").toString())

        loginBinding.Registerbtn.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))

        }


        loginBinding.LoginBtn.setOnClickListener {
            if (loginBinding.emailaddress.text.isEmpty()) {
                Toast.makeText(this, "email is empty", Toast.LENGTH_SHORT).show()
            } else if (loginBinding.TextPassword.text.isEmpty()) {
                Toast.makeText(this, "password is empty", Toast.LENGTH_SHORT).show()
            } else {
                val loginuserobj = logindata(
                    loginBinding.emailaddress.text.toString(),
                    loginBinding.TextPassword.text.toString()
                )
                val retrofit: RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)
                retrofit.loginUser(loginuserobj)
                    .enqueue(object : Callback<loginResponse> {
                        override fun onResponse(
                            call: Call<loginResponse>,
                            response: Response<loginResponse>
                        ) {
                            if ( response.isSuccessful) {
                                val intent = Intent(this@Login,MainActivity::class.java)
                                intent.putExtra("token",response.body()!!.jwtToken.toString())
                                intent.putExtra("Name",response.body()!!.username.toString())
                                intent.putExtra("Email",response.body()!!.email.toString())
                                intent.putExtra("Address",response.body()!!.address.toString())
                                intent.putExtra("Phone",response.body()!!.phone.toString())
                                intent.putExtra("Exam",response.body()!!.exam.toString())

                                editor.putString("email",loginBinding.emailaddress.text.toString())
                                editor.putString("password",loginBinding.TextPassword.text.toString())
                                editor.putString("Type","user")
                                editor.apply()
                                editor.commit()


                                startActivity(intent)

                            } else {
                                Toast.makeText(
                                    applicationContext,
                                    response.errorBody().toString(),
                                    Toast.LENGTH_SHORT
                                ).show()

                            }


                        }


                        override fun onFailure(call: Call<loginResponse>?, t: Throwable?) {
                            Toast.makeText(
                                applicationContext,
                                t?.message.toString(),
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    })

            }
        }


        loginBinding.MentorLoginBtn.setOnClickListener {
            if (loginBinding.emailaddress.text.isEmpty()) {
                Toast.makeText(this, "email is empty", Toast.LENGTH_SHORT).show()
            } else if (loginBinding.TextPassword.text.isEmpty()) {
                Toast.makeText(this, "password is empty", Toast.LENGTH_SHORT).show()
            } else {
                val loginuserkobj = logindata(
                    loginBinding.emailaddress.text.toString(),
                    loginBinding.TextPassword.text.toString()
                )
                val retrofit: RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)

                retrofit.loginMentor(loginuserkobj)
                    .enqueue(object : Callback<MentorResponse> {
                        override fun onResponse(
                            call: Call<MentorResponse>,
                            response: Response<MentorResponse>
                        ) {

                        if(response.isSuccessful) {
                            val intent = Intent(this@Login, MentorMainActivity::class.java)
                            intent.putExtra("token",response.body()!!.jwtToken.toString())
                            intent.putExtra("MentorName",response.body()!!.username.toString())
                            intent.putExtra("MentorEmail",response.body()!!.email.toString())
                            intent.putExtra("MentorSubject",response.body()!!.subject.toString())
                            intent.putExtra("MentorPhone",response.body()!!.phone.toString())
                            intent.putExtra("MentorExam",response.body()!!.exam.toString())
                            editor.putString("email",loginBinding.emailaddress.text.toString())
                            editor.putString("password",loginBinding.TextPassword.text.toString())
                            editor.putString("Type","mentor")
                            editor.apply()
                            editor.commit()


                            startActivity(intent)


                        }
                        else{
                            Toast.makeText(applicationContext,response.raw().message +"  Invalid email or password",Toast.LENGTH_SHORT).show()
                        }

                        }
                        override fun onFailure(call: Call<MentorResponse>?, t: Throwable?) {
                            Toast.makeText(applicationContext, t?.message, Toast.LENGTH_SHORT)
                                .show()
                            Log.e("error",
                                t?.message.toString())
                        }
                    })


            }


        }


    }
}


