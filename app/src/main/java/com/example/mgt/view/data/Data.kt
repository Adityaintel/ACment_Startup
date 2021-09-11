package com.example.mgt.view.data

import com.google.gson.annotations.SerializedName

class Data(
    @SerializedName("profile") val profile : String,
    @SerializedName("follower") val follower : List<String>,
    @SerializedName("unfollow") val unfollow : List<String>,
    @SerializedName("_id") val _id : String,
    @SerializedName("username") val username : String,
    @SerializedName("email") val email : String,
    @SerializedName("phone") val phone : String,
    @SerializedName("address") val address : String,
    @SerializedName("password") val password : String,
    @SerializedName("exam") val exam : String,
    @SerializedName("subject") val subject : String,
    @SerializedName("__v") val __v : Int,
    @SerializedName("studyMaterial") val studyMaterial : List<String>,
    @SerializedName("videoData") val videoData : List<String>)