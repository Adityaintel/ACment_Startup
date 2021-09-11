package com.example.mgt.view.recyclerviewmodel

import android.app.ProgressDialog
import android.content.Context
import android.net.Uri
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.mgt.R
import com.example.mgt.view.response.userVideoListResponse

class videoListAdaptor(
    var context: Context,
    var list:List<userVideoListResponse>?
) : RecyclerView.Adapter<videoListAdaptor.ViewHolder>() {






    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val topic = itemView.findViewById<TextView>(R.id.Topic)
        val desc = itemView.findViewById<TextView>(R.id.Description)
        val creator = itemView.findViewById<TextView>(R.id.mentorusername)
        val video = itemView.findViewById<VideoView>(R.id.mentorVideo)
        val image = itemView.findViewById<ImageView>(R.id.imageView4)


    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
       val layout = LayoutInflater.from(context).inflate(R.layout.recycler_video_item,parent,false)
        return ViewHolder(layout)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        var itemdata = list?.get(position)

        holder.topic?.text = itemdata?.topic
        holder.desc?.text = itemdata?.desc
        holder.creator?.text = itemdata?.postedBy?.username.toString()
        val imageprofile = itemdata?.postedBy?.profile?.substring(1)

        Glide.with(context)
            .load( "http://128.199.23.29:8000"+imageprofile)
            .circleCrop()
            .into(holder.image)


        Log.e("videopath",itemdata?.video.toString())
       val url = "http://128.199.23.29:8000" + itemdata?.video.toString()
        val videoUri:Uri = Uri.parse(url)
        holder.video.setVideoURI(videoUri)
        val mediaController = MediaController(context)
        holder.video.setMediaController(mediaController)

        holder.video.setOnClickListener {
            mediaController.setAnchorView(holder.video)
            holder.video.start()
        }
        holder.video.stopPlayback()



    }

    override fun getItemCount(): Int {
        return list?.size!!
    }


}


