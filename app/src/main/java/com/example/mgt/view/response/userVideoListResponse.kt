package com.example.mgt.view.response

import com.example.mgt.view.data.postbydata
import com.google.gson.annotations.SerializedName

data class userVideoListResponse(

    @SerializedName("_id") val _id : String?,
    @SerializedName("video") val video : String?,
    @SerializedName("topic") val topic : String?,
    @SerializedName("desc") val desc : String?,
    @SerializedName("postedByMentor") val postedByMentor : String?,
    @SerializedName("postedBy") val postedBy : postbydata,
    @SerializedName("__v") val __v : Int?
) {
}