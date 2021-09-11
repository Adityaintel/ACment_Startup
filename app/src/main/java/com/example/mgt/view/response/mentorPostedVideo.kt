package com.example.mgt.view.response

import com.google.gson.annotations.SerializedName

data class mentorPostedVideo(

    @SerializedName("_id") val _id : String,
    @SerializedName("video") val video : String,
    @SerializedName("topic") val topic : String,
    @SerializedName("desc") val desc : String,
    @SerializedName("postedBy") val postedBy : String,
    @SerializedName("__v") val __v : Int
)