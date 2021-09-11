package com.example.mgt.view.response

import com.google.gson.annotations.SerializedName

data class followResponse(
    @SerializedName("_id") val _id : String,
    @SerializedName("username") val username : String,
    @SerializedName("email") val email : String
) {
}