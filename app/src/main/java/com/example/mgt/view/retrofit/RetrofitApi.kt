package com.example.mgt.view.retrofit

import com.example.mgt.view.data.*
import com.example.mgt.view.response.*

import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.http.*

interface RetrofitApi {


    @POST("user/register")
    fun craeteUser(
       @Body userInfo: userInfo
    ) : Call<DefaultResponse>

    @POST("mentor/register")
    fun createMentor(
        @Body mentorInfo: getMentordata
    )
    :Call<MentorResponse>

    @POST("user/login")
    fun loginUser(
        @Body loginInfo : logindata
    ):Call<loginResponse>

    @POST("mentor/login")
    fun loginMentor(
        @Body loginMentorInfo: logindata
    ):Call<MentorResponse>

   @POST("mentor/search")
   fun mentorList(
       @Body fldata:Filterdata
   )
   :Call<mentorListData>

    @Multipart
    @POST("mentor/profile")
    fun uplaodimage(
        @Header("Authorization") auth:String,
        @Part profile :MultipartBody.Part
        ):Call<ResponseBody>

    @Multipart
    @POST("videos")
    fun uploadVideo(
        @Header("Authorization") auth:String,
        @Part video: MultipartBody.Part,
        @Part("topic") topic: RequestBody,
        @Part("desc") desc : RequestBody
    ):Call<ResponseBody>




    @Multipart
    @POST("user/profile")
    fun uploadUserImage(
        @Header("Authorization")auth:String,
        @Part profile: MultipartBody.Part

    ):Call<ResponseBody>


   @GET("allvideos")
   fun getVideos()
   : Call<ArrayList<userVideoListResponse>>


   @POST("user/followmentor")
   fun followMentor(
        @Header("Authorization")Auth:String,
       @Body id:followdata
   ):Call<ArrayList<followResponse>>



    @Multipart
   @POST("task")
   fun uplaodpdf(
       @Header("Authorization")Auth: String,
       @Part("title")title: RequestBody,
       @Part("info") info: RequestBody,
       @Part task : MultipartBody.Part,
        @Part("date") date: RequestBody
   ):Call<ResponseBody>




   @GET("myvideos/{postedBy}")
   fun getMentorVideo(
       @Path("postedBy") path:String
   )
   :Call<ArrayList<mentorPostedVideo>>



}