package com.example.mgt.view.response

import com.google.gson.annotations.SerializedName

class loginResponse(

 @SerializedName("jwtToken") val jwtToken : String,
 @SerializedName("userId") val userId : String,
 @SerializedName("email") val email : String,
 @SerializedName("username") val username : String,
 @SerializedName("exam") val exam : String,
 @SerializedName("phone") val phone : String,
 @SerializedName("parent_phone") val parent_phone : String,
 @SerializedName("address") val address : String,
 @SerializedName("profile") val profile : String

 ){


 }