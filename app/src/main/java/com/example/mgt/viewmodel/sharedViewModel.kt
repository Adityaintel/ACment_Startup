package com.example.mgt.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class sharedViewModel: ViewModel() {

   val token:MutableLiveData<String> = MutableLiveData<String>()
    public fun  setdata(item:String){

        token.value = item
    }
    fun getdata():LiveData<String>{
        return token
    }

}