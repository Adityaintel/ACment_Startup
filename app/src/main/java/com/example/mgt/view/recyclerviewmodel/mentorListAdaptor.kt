package com.example.mgt.view.recyclerviewmodel

import android.app.AlertDialog
import android.app.Dialog
import android.content.Context
import android.content.SharedPreferences
import android.content.res.loader.ResourcesProvider
import android.net.Uri
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.mgt.R
import com.example.mgt.databinding.MentorProfileDialogBinding
import com.example.mgt.view.data.followdata
import com.example.mgt.view.data.mentorListData
import com.example.mgt.view.response.followResponse
import com.example.mgt.view.response.mentorPostedVideo
import com.example.mgt.view.retrofit.RetrofitApi
import com.example.mgt.view.retrofit.retrofitclient
import com.karumi.dexter.Dexter
import okhttp3.Request
import okhttp3.ResponseBody
import okio.Timeout
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File

class mentorListAdaptor( var token:String,
                        var mentorlistdata:mentorListData
                        ,var context: Context): RecyclerView.Adapter<mentorListAdaptor.viewHolder>() {



   inner class viewHolder(view: View): RecyclerView.ViewHolder(view){
      var mname = view.findViewById<TextView>(R.id.mentorname)
       var memail = view.findViewById<TextView>(R.id.mentoremail)
       var msubject = view.findViewById<TextView>(R.id.mentorsubject)
       var mexam = view.findViewById<TextView>(R.id.mentorexam)
       var mimage = view.findViewById<ImageView>(R.id.imageView3)
       var followbtn = view.findViewById<Button>(R.id.followButrton)



    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): viewHolder {
       val layout = LayoutInflater.from(context).inflate(R.layout.mentor_list_item,parent,false)
        return viewHolder(layout)
    }

    override fun onBindViewHolder(holder: viewHolder, position: Int) {
        var itemdata = mentorlistdata
        holder.msubject.text = itemdata.data[position].subject
        holder.memail.text = itemdata.data[position].email
        holder.mexam.text = itemdata.data[position].exam
        holder.mname.text = itemdata.data[position].username
        Log.e("path",itemdata.data[position].profile.toString())
        var  imagestring = itemdata.data[position].profile?.substring(1)
        Log.e("image",imagestring.toString())
        Glide.with(context)
            .load("http://128.199.23.29:8000"+imagestring.toString())
            .circleCrop()
            .into(holder.mimage)



        holder.followbtn.setOnClickListener {
                val id : followdata= followdata(itemdata.data[position]._id)
            val retrofit:RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)
                      val request =          retrofit.followMentor( "Bearer $token"  ,id)
                          .enqueue(object:Callback<ArrayList<followResponse>>{
                              override fun onResponse(
                                  call: Call<ArrayList<followResponse>>,
                                  response: Response<ArrayList<followResponse>>
                              ) {
                                  response?.let {
                                      if(response.isSuccessful){
                                          Toast.makeText(context,"followed",Toast.LENGTH_SHORT).show()
                                          holder.followbtn.text = "Followed"
                                          Log.i("succes",response.body().toString())
                                      }
                                      else{
                                          Log.e("error",response.errorBody().toString())
                                          Log.e("error2",response.body().toString())

                                      }
                                  }
                              }

                              override fun onFailure(
                                  call: Call<ArrayList<followResponse>>,
                                  t: Throwable
                              ) {
                                 Toast.makeText(context,t.message,Toast.LENGTH_SHORT).show()
                                    Log.e("failure",t.message.toString())
                                      }


                          })


        }



       holder.mname.setOnClickListener {
         var mentorProfileDialogBinding  = androidx.appcompat.app.AlertDialog.Builder(context)
           var view :View = LayoutInflater.from(context).inflate(R.layout.mentor_profile_dialog,null)
           mentorProfileDialogBinding.setView(view)

           val mentorDialogImage = view.findViewById<ImageView>(R.id.mentordialogImage)
           val mentordialogName = view.findViewById<TextView>(R.id.mentorDialogName)
           val mentordialogEmail = view.findViewById<TextView>(R.id.mentorDialogEmail)
           val mentordialogExam = view.findViewById<TextView>(R.id.mentorDialogExam)
           val mentordialogsubject = view.findViewById<TextView>(R.id.mentorDialogSubject)

           mentordialogName.text  =   itemdata.data[position].username
           mentordialogExam.text = itemdata.data[position].exam
           mentordialogEmail.text = itemdata.data[position].email
           mentordialogsubject.text = itemdata.data[position].subject
           Glide.with(context)
               .load("http://128.199.23.29:8000"+itemdata.data[position].profile)
               .circleCrop()
               .into(mentorDialogImage)

           val mentorDialogvideorecycler = view.findViewById<RecyclerView>(R.id.recyclerviewVideo)
           val id:String = itemdata.data[position]._id

           val retrofit :RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)
           val request = retrofit.getMentorVideo(id)
           request.enqueue(object :Callback<ArrayList<mentorPostedVideo>>{
               override fun onResponse(
                   call: Call<ArrayList<mentorPostedVideo>>,
                   response: Response<ArrayList<mentorPostedVideo>>
               ) {
                   if (response.isSuccessful){
                       Log.e("success","Success")
                       response?.let {
                           var data: ArrayList<mentorPostedVideo>? = response.body()
                           var adaptor = mentorVideoAdptor(data, context)
                           mentorDialogvideorecycler.adapter = adaptor
                           mentorDialogvideorecycler.layoutManager = GridLayoutManager(context,1)
                       }
                   }
                   else{
                       Log.e("error",response.errorBody().toString())
                   }
               }

               override fun onFailure(call: Call<ArrayList<mentorPostedVideo>>, t: Throwable) {
                   Log.e("failure",t.message.toString())
               }
           })




           mentorProfileDialogBinding.show()




       }



    }

    override fun getItemCount(): Int {
        return mentorlistdata.data.size
    }
}

