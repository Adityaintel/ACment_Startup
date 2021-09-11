package com.example.mgt.view.fragment.mentor

import android.Manifest
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
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
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.http.Multipart
import java.io.File

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"
var uri:Uri? = null
lateinit var path:String


/**
 * A simple [Fragment] subclass.
 * Use the [TaskFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
@Suppress("DEPRECATION")
class TaskFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null
  lateinit var  selectpdfbtn :Button
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
        val layoutTask = inflater.inflate(R.layout.fragment_task, container, false)

         selectpdfbtn  = layoutTask.findViewById(R.id.selectpdfBtn)
        selectpdfbtn.setOnClickListener {

          Dexter.withContext(requireContext())
              .withPermission(Manifest.permission.READ_EXTERNAL_STORAGE)
              .withListener(object :PermissionListener{
                  override fun onPermissionGranted(p0: PermissionGrantedResponse?) {
                      val intent = Intent(Intent.ACTION_GET_CONTENT)
                      intent.setType("application/pdf");
                      startActivityForResult(intent,20)
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
         val  uploadPdfBtn:Button = layoutTask.findViewById(R.id.uploadpdfBtn)
         val  pdftitle:EditText = layoutTask.findViewById(R.id.pdftitle)
        val pdfinfo :EditText = layoutTask.findViewById(R.id.pdfinfo)
        val dateinfo :EditText = layoutTask.findViewById(R.id.dateinfo)

        uploadPdfBtn.setOnClickListener{
        if(pdftitle.text.isEmpty() ){
            Toast.makeText(requireContext(),"Please enter subject ",Toast.LENGTH_SHORT).show()
        }
        else if(pdfinfo.text.isEmpty()){
            Toast.makeText(requireContext(),"Please enter Info ",Toast.LENGTH_SHORT).show()
        }
        else if(dateinfo.text.isEmpty())
        {
            Toast.makeText(requireContext(),"Please enter Date ",Toast.LENGTH_SHORT).show()
        }
        else if(selectpdfbtn.text.equals("select Task pdf")){
            Toast.makeText(requireContext(),"please select Task pdf file",Toast.LENGTH_SHORT).show()
        }
        else{
                    Log.e("path", path)

                    uploadpdftask(pdftitle.text.toString(),pdfinfo.text.toString(),dateinfo.text.toString(),path)

            }

        }
        return layoutTask
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment TaskFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            TaskFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if(requestCode == 20 )
        {
            if(data!= null){
                uri = data.data!!

                path = FileUtils.getPath(requireContext(),uri)
                val file = File(path)
                Log.e("pathofpdf", path)
                Log.e("uri", uri.toString())
                selectpdfbtn.text = file.name


            }



        }



    }

    fun uploadpdftask(title:String,info:String,date:String,filepath:String){
        Log.e("usri", uri.toString())
        val sharedviewModel: sharedViewModel = ViewModelProvider(requireActivity()).get(
            sharedViewModel::class.java)
        val token :String = sharedviewModel.getdata().value.toString()
        Log.e("token",token.toString())
        Log.e("ielpasssth", filepath)
        val filepdf = File(filepath)
        val requestbodytitle :RequestBody = RequestBody.create(okhttp3.MultipartBody.FORM,title)
        val requestBodyinfo:RequestBody = RequestBody.create(okhttp3.MultipartBody.FORM,info)
        val requestBodydate:RequestBody = RequestBody.create(okhttp3.MultipartBody.FORM,date)
        val requestBody:RequestBody = RequestBody.create("application/pdf".toMediaType(),filepdf.absoluteFile)
        val body =  MultipartBody.Part.createFormData("task",filepdf.name.toString(),requestBody)



        val retrofit :RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)
        val request = retrofit.uplaodpdf("Bearer $token",requestbodytitle,requestBodyinfo
                                        ,body,requestBodydate)

            request.enqueue(object :Callback<ResponseBody>{
                override fun onResponse(
                    call: Call<ResponseBody>,
                    response: Response<ResponseBody>
                ) {
                    if(response.isSuccessful){

                        response.let {
                            Log.i("sucess","file uploaded")
                            Toast.makeText(context,"Succes",Toast.LENGTH_SHORT).show()
                        }



                    }
                    else{
                        Log.e("errror",response.errorBody().toString())
                    }
                }

                override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                    Log.e("failure",t.message.toString())
                }
            })

    }


}