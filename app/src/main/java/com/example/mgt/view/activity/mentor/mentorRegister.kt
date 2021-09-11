package com.example.mgt.view.activity.mentor

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.mgt.databinding.ActivityMentorRegisterBinding
import com.example.mgt.view.activity.Login
import com.example.mgt.view.response.MentorResponse
import com.example.mgt.view.retrofit.RetrofitApi
import com.example.mgt.view.data.getMentordata
import com.example.mgt.view.retrofit.retrofitclient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class mentorRegister : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)



        var mentorBinding = ActivityMentorRegisterBinding.inflate(layoutInflater)
        setContentView(mentorBinding.root)
        mentorBinding.Next.setOnClickListener {


            if(mentorBinding.mentoName.text.isEmpty())
            {
                Toast.makeText(this,"user name is empty",Toast.LENGTH_SHORT).show()
            }
           else if(mentorBinding.mentoremailAddress.text.isEmpty())
            {
                Toast.makeText(this,"user name is empty",Toast.LENGTH_SHORT).show()
            }
            else if(mentorBinding.mentortextPhone.text.isEmpty())
            {
                Toast.makeText(this,"user name is empty",Toast.LENGTH_SHORT).show()
            }
            else if(mentorBinding.mentoradddress.text.isEmpty())
            {
                Toast.makeText(this,"user name is empty",Toast.LENGTH_SHORT).show()
            }
            else if(mentorBinding.mentorpassword.text.isEmpty())
            {
                Toast.makeText(this,"user name is empty",Toast.LENGTH_SHORT).show()
            }
            else if(mentorBinding.mentorExam.text.isEmpty())
            {
                Toast.makeText(this,"user name is empty",Toast.LENGTH_SHORT).show()
            }
            else if(mentorBinding.mentorSubject.text.isEmpty())
            {
                Toast.makeText(this,"user name is empty",Toast.LENGTH_SHORT).show()
            }
            else{


                val menName = mentorBinding.mentoName.text.toString()
                val menEmail = mentorBinding.mentoremailAddress.text.toString().trim()
                val menphone = mentorBinding.mentortextPhone.text.toString().trim()
                val menaddess = mentorBinding.mentoradddress.text.toString()
                val mentpass = mentorBinding.mentorpassword.text.toString()
                val mentsubject = mentorBinding.mentorSubject.text.toString()
                val menExam = mentorBinding.mentorSubject.text.toString()

                val mentObj = getMentordata(menName,menEmail,menphone,menaddess,mentpass,menExam,mentsubject)



                val retrofitapi : RetrofitApi =  retrofitclient.BuilderService(RetrofitApi::class.java)
                val requestcall = retrofitapi.createMentor(mentObj)
                    .enqueue(object:Callback<MentorResponse> {
                        override fun onResponse(
                            call: Call<MentorResponse>?,
                            response: Response<MentorResponse>?
                        ) {
                            if(response!!.isSuccessful)
                            {
                                Toast.makeText(applicationContext,response.body()?.message,Toast.LENGTH_SHORT).show()
                                startActivity(Intent(this@mentorRegister,Login::class.java))
                                this@mentorRegister.finish()
                            }
                            else{
                                Toast.makeText(applicationContext,
                                    response.errorBody().toString(),
                                    Toast.LENGTH_SHORT).show()
                            }

                        }


                        override fun onFailure(call: Call<MentorResponse>?, t: Throwable?) {
                            Toast.makeText(applicationContext,t?.message,Toast.LENGTH_SHORT).show()
                        }


                    })



            }

        }
    }
}