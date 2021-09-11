package com.example.mgt.view.fragment.mentor

import android.Manifest
import android.content.ContentResolver
import android.content.Intent
import android.database.Cursor
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.mgt.FileUtils.FileUtils
import com.example.mgt.R
import com.example.mgt.view.retrofit.RetrofitApi
import com.example.mgt.view.retrofit.retrofitclient
import com.example.mgt.viewmodel.sharedViewModel
import com.karumi.dexter.Dexter
import com.karumi.dexter.PermissionToken
import com.karumi.dexter.listener.PermissionDeniedResponse
import com.karumi.dexter.listener.PermissionGrantedResponse
import com.karumi.dexter.listener.PermissionRequest
import com.karumi.dexter.listener.single.PermissionListener
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.util.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [mentorHomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
@Suppress("DEPRECATION")
class mentorHomeFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null
    private lateinit var video:VideoView
    private lateinit var videobtn:Button
    private lateinit var topic:EditText
    private lateinit var desc:EditText
    private lateinit var uri:Uri
    private lateinit var path:String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val layout =inflater.inflate(R.layout.fragment_mentor_home, container, false)

         topic = layout.findViewById(R.id.videoTitle)
         desc = layout.findViewById(R.id.videoSubject)
         video =  layout.findViewById(R.id.video)
        videobtn = layout.findViewById(R.id.videoUploadButton)
        val selctvideobtn = layout.findViewById<Button>(R.id.videoselectButton)






        selctvideobtn.setOnClickListener {

        Dexter.withContext(activity)
            .withPermission(Manifest.permission.READ_EXTERNAL_STORAGE)
            .withListener(object:PermissionListener{
                override fun onPermissionGranted(p0: PermissionGrantedResponse?) {

                    val intent = Intent(Intent.ACTION_GET_CONTENT,MediaStore.Video.Media.EXTERNAL_CONTENT_URI)
                    startActivityForResult(intent, 100)

                }

                override fun onPermissionDenied(p0: PermissionDeniedResponse?) {
                    Toast.makeText(requireContext(),"You have denied the permission",Toast.LENGTH_SHORT).show()
                }

                override fun onPermissionRationaleShouldBeShown(
                    p0: PermissionRequest?,
                    p1: PermissionToken?
                ) {
                    Toast.makeText(requireContext(),"go to settings and give permission",Toast.LENGTH_SHORT).show()
                }
            }).check()




        }

        videobtn.setOnClickListener {

           if(selctvideobtn.text =="select Video"){

               Toast.makeText(requireContext(),"please select Video",Toast.LENGTH_SHORT).show()
           }
           else {
               Log.e("uriopath", uri.toString())
               uploadVideo(uri.toString(), topic.text.toString(), desc.text.toString())
           }
        }







        return layout
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment mentorHomeFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            mentorHomeFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?){
        super.onActivityResult(requestCode, resultCode, data)

        data?.let {
            if (requestCode == 100) {

                 uri = data.data as Uri
                video.setVideoURI(uri)
                video.start()
                video.setMediaController(MediaController(requireContext()))
                Log.e("pathname", uri.toString())

                Log.i("path",FileUtils.getPath(requireContext(),uri))
                path = FileUtils.getPath(requireContext(),uri)
                val file = File(path)
                videobtn.text = file.name
               }


            }
        }






    fun uploadVideo(uri:String,toopic:String,deesc:String){
        val retrofitApi:RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)
        val sharedviewModel:sharedViewModel = ViewModelProvider(requireActivity()).get(sharedViewModel::class.java)
        val token :String = sharedviewModel.getdata().value.toString()
        Log.e("token0",token)
        Log.i("path2",path)
       var file: File =  File(path)
        Log.i("filepath",file.absolutePath)

        val requestBody:RequestBody = RequestBody.create("video/*".toMediaType(),file)
        val body  = MultipartBody.Part.createFormData("video", file.name.toString() , requestBody)


        val requestbody1:RequestBody = RequestBody.create(okhttp3.MultipartBody.FORM,toopic)
        val requestBody2:RequestBody= RequestBody.create(okhttp3.MultipartBody.FORM,deesc)

        val request = retrofitApi.uploadVideo("Bearer $token",body,requestbody1,requestBody2)
            .enqueue(
                object :Callback<ResponseBody>{
                    override fun onResponse(
                        call: Call<ResponseBody>,
                        response: Response<ResponseBody>
                    ) {
                        response?.let {
                            if(response.isSuccessful){
                                Log.i("Succes","succes")
                                Toast.makeText(requireContext(),"Video Uploaded successFully",Toast.LENGTH_SHORT).show()
                            }
                            else{
                                Log.e("error",response.errorBody().toString())
                            }
                        }
                    }

                    override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                        Log.e("failure",t.toString())
                        Toast.makeText(requireContext(),"Error = ${t.message}",Toast.LENGTH_SHORT).show()
                    }
                }
            )






    }



}