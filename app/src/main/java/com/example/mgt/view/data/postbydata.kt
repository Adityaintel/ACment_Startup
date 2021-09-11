package com.example.mgt.view.data

import com.google.gson.annotations.SerializedName

data class postbydata(
    @SerializedName("_id") val _id : String,
    @SerializedName("username") val username : String,
    @SerializedName("profile") val profile : String

)