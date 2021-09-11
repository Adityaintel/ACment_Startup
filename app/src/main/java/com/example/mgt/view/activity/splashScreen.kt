package com.example.mgt.view.activity

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import com.example.mgt.R
import com.example.mgt.databinding.ActivitySplashScreenBinding

class splashScreen : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val splashbinding = ActivitySplashScreenBinding.inflate(layoutInflater)
        setContentView(splashbinding.root)
        val splashAnimation = AnimationUtils.loadAnimation(this,R.anim.item_transition)
        splashbinding.textView.animation = splashAnimation
        Handler().postDelayed({
            startActivity(Intent(this,Login::class.java))
            this.finish()
        },2000)
    }
}