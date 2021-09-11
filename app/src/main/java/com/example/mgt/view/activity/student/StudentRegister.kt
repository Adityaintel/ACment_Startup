package com.example.mgt.view.activity.student

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.example.mgt.databinding.ActivityStudentRegisterBinding
import com.example.mgt.view.response.DefaultResponse
import com.example.mgt.view.retrofit.RetrofitApi
import com.example.mgt.view.retrofit.retrofitclient
import com.example.mgt.view.data.userInfo
import com.example.mgt.view.activity.Login
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class StudentRegister : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val studentRegisterBinding = ActivityStudentRegisterBinding.inflate(layoutInflater)
         setContentView(studentRegisterBinding.root)

    studentRegisterBinding.Register.setOnClickListener {
        if (studentRegisterBinding.userName.text.isEmpty()) {
            Toast.makeText(this, "UserName is empty", Toast.LENGTH_SHORT).show()
        } else if (studentRegisterBinding.emailAddress.text.isEmpty()) {
            Toast.makeText(this, "email Addrees is empty", Toast.LENGTH_SHORT).show()
        } else if (studentRegisterBinding.textPhone.text.isEmpty()) {
            Toast.makeText(this, "Student phone no. is empty", Toast.LENGTH_SHORT).show()
        } else if (studentRegisterBinding.parentPhone.text.isEmpty()) {
            Toast.makeText(this, "parent phone no. is empty", Toast.LENGTH_SHORT).show()
        } else if (studentRegisterBinding.password.text.isEmpty()) {
            Toast.makeText(this, "password is empty", Toast.LENGTH_SHORT).show()
        } else if (studentRegisterBinding.exam.text.isEmpty()) {
            Toast.makeText(this, "exam is empty", Toast.LENGTH_SHORT).show()
        } else if (studentRegisterBinding.adddress.text.isEmpty()) {
            Toast.makeText(this, "address is empty", Toast.LENGTH_SHORT).show()
        } else {

            val username = studentRegisterBinding.userName.text.toString()
            val email = studentRegisterBinding.emailAddress.text.toString().trim()
            val phone = studentRegisterBinding.textPhone.text.toString()
            val paretphone = studentRegisterBinding.parentPhone.text.toString()
            val address = studentRegisterBinding.adddress.text.toString()
            val password = studentRegisterBinding.password.text.toString().trim()
            val exam = studentRegisterBinding.exam.text.toString()
            val mbin = userInfo(username,email,phone,paretphone,address,password,exam)

            val retrofitapi : RetrofitApi =  retrofitclient.BuilderService(RetrofitApi::class.java)

          val requestCall =  retrofitapi.craeteUser(mbin)
                requestCall.enqueue(object : Callback<DefaultResponse>{
                    override fun onResponse(
                        call: Call<DefaultResponse>?,
                        response: Response<DefaultResponse>?
                    ) {
                            if(response!!.isSuccessful){
                                Toast.makeText(applicationContext,response.message(),Toast.LENGTH_SHORT).show()
                                Log.e("text",response.body().toString())
                                Log.e("text2",response.message().toString())
                                startActivity(Intent(this@StudentRegister, Login::class.java))
                                this@StudentRegister.finish()
                            }
                        else
                            {
                                Toast.makeText(applicationContext,
                                    response.message().toString(),
                                    Toast.LENGTH_SHORT).show()
                                Log.e("textmessage",response.message())
                                Log.e("textmessage",response.code().toString())
                                Log.e("textmessage",response.errorBody().toString())


                            }

                    }

                    override fun onFailure(call: Call<DefaultResponse>?, t: Throwable?) {
                        Toast.makeText(applicationContext,t?.message,Toast.LENGTH_SHORT).show()
                    }
                })
        }


    }
    }
}