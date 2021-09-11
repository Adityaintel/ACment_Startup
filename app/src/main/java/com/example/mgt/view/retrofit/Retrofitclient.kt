package com.example.mgt.view.retrofit

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object retrofitclient {

    var baseUrl ="http://128.199.23.29:8000/"
    var okHttp = OkHttpClient.Builder()
        val builder = Retrofit.Builder().baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create()).client(okHttp.build())
  val instance  = builder.build()
    fun <T> BuilderService(serviceType: Class<T>):T{
        return instance.create(serviceType)
    }


}


