package com.example.mgt.view.response

import com.google.gson.annotations.SerializedName

class MentorResponse(
 @SerializedName("jwtToken") val jwtToken : String,
 @SerializedName("userId") val userId : String,
 @SerializedName("email") val email : String,
 @SerializedName("username") val username : String,
 @SerializedName("exam") val exam : String,
 @SerializedName("subject") val subject : String,
 @SerializedName("phone") val phone : String,
 @SerializedName("address") val address : String,
 @SerializedName("profile") val profile : String,
 var message: String?){

 }
