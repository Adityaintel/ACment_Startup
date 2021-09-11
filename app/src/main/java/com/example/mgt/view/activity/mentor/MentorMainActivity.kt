package com.example.mgt.view.activity.mentor

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import com.example.mgt.R
import com.example.mgt.databinding.ActivityMentorMainBinding
import com.example.mgt.view.fragment.mentor.ChatFragment
import com.example.mgt.view.fragment.mentor.TaskFragment
import com.example.mgt.view.fragment.mentor.mentorHomeFragment
import com.example.mgt.viewmodel.sharedViewModel
import com.karumi.dexter.Dexter
import com.karumi.dexter.PermissionToken
import com.karumi.dexter.listener.PermissionDeniedResponse
import com.karumi.dexter.listener.PermissionGrantedResponse
import com.karumi.dexter.listener.PermissionRequest
import com.karumi.dexter.listener.single.PermissionListener
import java.util.jar.Manifest


class MentorMainActivity : AppCompatActivity() {
    private lateinit var sharedviewModel: sharedViewModel
    private lateinit var mentorMainBinding: ActivityMentorMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mentorMainBinding = ActivityMentorMainBinding.inflate(layoutInflater)
        setContentView(mentorMainBinding.root)
        val jwttoken = intent.getStringExtra("token")
        Log.e("jettoken",jwttoken.toString())
        sharedviewModel = ViewModelProvider(this).get(sharedViewModel::class.java)
        sharedviewModel.setdata(jwttoken.toString())



        val fragmentChanger = supportFragmentManager.beginTransaction()
        fragmentChanger.replace(R.id.mentorfarmeLayout, mentorHomeFragment()).commit()


        mentorMainBinding.mentorbottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.mentorHome -> {

                    val fragmentChanger = supportFragmentManager.beginTransaction()

                    fragmentChanger.replace(R.id.mentorfarmeLayout, mentorHomeFragment()).commit()


                    return@setOnItemSelectedListener true
                }

                R.id.taskfragment -> {
                    val fragmentChanger = supportFragmentManager.beginTransaction()

                    fragmentChanger.replace(R.id.mentorfarmeLayout, TaskFragment()).commit()

                    return@setOnItemSelectedListener true
                }
                R.id.mentorChatting ->{
                    val fragmentChanger = supportFragmentManager.beginTransaction()

                    fragmentChanger.replace(R.id.mentorfarmeLayout, ChatFragment()).commit()

                    return@setOnItemSelectedListener true
                }

                else -> return@setOnItemSelectedListener false
            }
        }


       // setSupportActionBar(mentorMainBinding.toolbar)
    }


    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.profilemenuitem,menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val token = intent.getStringExtra("token")
        val name = intent.getStringExtra("MentorName")
        val email = intent.getStringExtra("MentorEmail")
        val phone = intent.getStringExtra("MentorPhone")
        val subject = intent.getStringExtra("MentorSubject")
        val Exam = intent.getStringExtra("MentorExam")









         Log.e("token",token.toString())
      val intent = Intent(this,profileactivitymentor::class.java)
        intent.putExtra("authToken",token.toString())
        intent.putExtra("name",name.toString())
        intent.putExtra("email",email.toString())
        intent.putExtra("subject",subject.toString())
        intent.putExtra("phone",phone.toString())
        intent.putExtra("exam",Exam.toString())


        startActivity(intent)

        return super.onOptionsItemSelected(item)
    }








}