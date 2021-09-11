package com.example.mgt.view.activity.student

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.mgt.databinding.ActivityRegisterBinding
import com.example.mgt.view.activity.mentor.mentorRegister

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
         val registerbinding : ActivityRegisterBinding

         registerbinding= ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(registerbinding.root)

        registerbinding.textView3.setOnClickListener {
            startActivity(Intent(this, StudentRegister::class.java))
        }
        registerbinding.imageView.setOnClickListener {
            startActivity(Intent(this, StudentRegister::class.java))
        }
        registerbinding.imageView2.setOnClickListener {
            startActivity(Intent(this, mentorRegister::class.java))
        }
        registerbinding.textView4.setOnClickListener {
            startActivity(Intent(this, mentorRegister::class.java))
        }
    }
}