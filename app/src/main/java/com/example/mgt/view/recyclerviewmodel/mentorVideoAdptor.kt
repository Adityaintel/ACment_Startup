package com.example.mgt.view.recyclerviewmodel

import android.content.Context
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.MediaController
import android.widget.TextView
import android.widget.VideoView
import androidx.recyclerview.widget.RecyclerView
import com.example.mgt.R
import com.example.mgt.view.response.mentorPostedVideo

class mentorVideoAdptor(var videoList:ArrayList<mentorPostedVideo>?,var context:Context):RecyclerView.Adapter<mentorVideoAdptor.viewHolder>() {

    inner class viewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
       var videotitle :TextView = itemView.findViewById(R.id.mentorDialogtitle)
        var videodesc:TextView = itemView.findViewById(R.id.mentorDialogdesc)
        var videoviewDialog:VideoView = itemView.findViewById(R.id.mentordilaogvideo)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): viewHolder {
        val layoutvideo = LayoutInflater.from(context).inflate(R.layout.video_mentor_dialog,parent,false)
        return viewHolder(layoutvideo)
    }

    override fun onBindViewHolder(holder: viewHolder, position: Int) {

        var itemdata = videoList?.get(position)
        holder.videotitle.text = itemdata?.topic
        holder.videodesc.text = itemdata?.desc
        var url = "http://128.199.23.29:8000"+itemdata?.video
        var uri:Uri = Uri.parse(url)
        holder.videoviewDialog.setVideoURI(uri)
        val mediaController = MediaController(context)
        holder.videoviewDialog.setMediaController(mediaController)





    }

    override fun getItemCount(): Int {
       return videoList?.size!!
    }


}