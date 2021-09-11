package com.example.mgt.view.activity.student

import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.lifecycle.ViewModelProvider

import com.example.mgt.R
import com.example.mgt.databinding.ActivityMainBinding

import com.example.mgt.view.fragment.student.homeFragment
import com.example.mgt.view.fragment.student.mentorSerachFragment
import com.example.mgt.view.fragment.student.studyMaterialFragment
import com.example.mgt.viewmodel.sharedViewModel


class MainActivity : AppCompatActivity() {
    lateinit var tokenviewModel: sharedViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        var mainbinding =  ActivityMainBinding.inflate(layoutInflater)
            setContentView(mainbinding.root)

        val jwttoken = intent.getStringExtra("token")
        Log.e("jwttoken",jwttoken.toString())

        tokenviewModel =  ViewModelProvider(this).get(sharedViewModel::class.java)
        tokenviewModel.setdata(jwttoken.toString())



        val fragmentchanger = supportFragmentManager.beginTransaction()
        fragmentchanger.replace(R.id.framelayout,homeFragment()).commit()

        mainbinding.bottomNavView.setOnItemSelectedListener {
            item->
            when(item.itemId){
                R.id.home_icon ->{

                    val fragmentchanger = supportFragmentManager.beginTransaction()
                                fragmentchanger.replace(R.id.framelayout,homeFragment()).commit()
                    return@setOnItemSelectedListener true
                }
                R.id.searchmentor_icon->{
                    val fragmentchanger = supportFragmentManager.beginTransaction()
                    fragmentchanger.replace(R.id.framelayout,mentorSerachFragment()).commit()
                    return@setOnItemSelectedListener true
                }


                R.id.studymaterial ->{
                    val fragmentchanger = supportFragmentManager.beginTransaction()
                    fragmentchanger.replace(R.id.framelayout,studyMaterialFragment()).commit()
                    return@setOnItemSelectedListener true
                }


                else -> return@setOnItemSelectedListener false
            }
        }


    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.profilemenuitem,menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val token = intent.getStringExtra("token")
        val name = intent.getStringExtra("Name")
        val email = intent.getStringExtra("Email")
        val phone = intent.getStringExtra("Phone")
        val address = intent.getStringExtra("Address")
        val Exam = intent.getStringExtra("Exam")



        val intent = Intent(this,userProfileImage::class.java)
        intent.putExtra("authToken",token.toString())
        intent.putExtra("name",name.toString())
        intent.putExtra("email",email.toString())
        intent.putExtra("address",address.toString())
        intent.putExtra("phone",phone.toString())
        intent.putExtra("exam",Exam.toString())
        startActivity(intent)
        return super.onOptionsItemSelected(item)
    }


}