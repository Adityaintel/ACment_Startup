package com.example.mgt.view.data

import com.google.gson.annotations.SerializedName

data class mentorListData(
    @SerializedName("count") val count : Int,
    @SerializedName("results") val data : List<Data>
)

