package com.example.mgt.view.activity.student

import android.Manifest
import android.app.AlertDialog
import android.app.Dialog
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.drawable.Drawable
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.provider.Settings
import android.util.Log
import android.widget.Toast
import androidx.core.graphics.drawable.toBitmap
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.example.mgt.R
import com.example.mgt.databinding.ActivityUserProfileImageBinding
import com.example.mgt.databinding.CustomDialogItemBinding
import com.example.mgt.view.retrofit.RetrofitApi
import com.example.mgt.view.retrofit.retrofitclient
import com.karumi.dexter.Dexter
import com.karumi.dexter.MultiplePermissionsReport
import com.karumi.dexter.PermissionToken
import com.karumi.dexter.listener.PermissionDeniedResponse
import com.karumi.dexter.listener.PermissionGrantedResponse
import com.karumi.dexter.listener.PermissionRequest
import com.karumi.dexter.listener.multi.MultiplePermissionsListener
import com.karumi.dexter.listener.single.PermissionListener
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.io.OutputStream
import java.util.*

class userProfileImage : AppCompatActivity() {
    private lateinit var profileImageBinding: ActivityUserProfileImageBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        profileImageBinding = ActivityUserProfileImageBinding.inflate(layoutInflater)
        setContentView(profileImageBinding.root)

        val name = intent.getStringExtra("name")
        val email = intent.getStringExtra("email")
        val phone = intent.getStringExtra("phone")
        val address = intent.getStringExtra("address")
        val Exam = intent.getStringExtra("exam")

        profileImageBinding.userExam.text = Exam.toString()
        profileImageBinding.userprofilename.text = name.toString()
        profileImageBinding.userprofileEmail.text = email.toString()
        profileImageBinding.userProfileOhone.text = phone.toString()
        profileImageBinding.userProfileSubject.text = address.toString()


  profileImageBinding.usereditimage.setOnClickListener {
      showcustompicDialog()
  }


    }







    private fun showcustompicDialog(){

        val dialog = Dialog(this)
        val customDialogItemBinding: CustomDialogItemBinding = CustomDialogItemBinding.inflate(layoutInflater)
        dialog.setContentView(customDialogItemBinding.root)
        dialog.show()


        customDialogItemBinding.cameratv.setOnClickListener {
            Dexter.withContext(this)
                .withPermissions(
                    Manifest.permission.CAMERA
                    , Manifest.permission.WRITE_EXTERNAL_STORAGE
                    , Manifest.permission.READ_EXTERNAL_STORAGE  ).withListener(
                    object : MultiplePermissionsListener {
                        override fun onPermissionsChecked(p0: MultiplePermissionsReport?) {
                            p0?.let {
                                if (p0!!.areAllPermissionsGranted()){

                                    val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                                    startActivityForResult(intent,1)

                                }
                            }
                        }

                        override fun onPermissionRationaleShouldBeShown(
                            p0: MutableList<PermissionRequest>?,
                            p1: PermissionToken?
                        ) {
                            showRationaldialog()
                        }
                    }
                ).onSameThread().check()
            dialog.dismiss()

        }

        customDialogItemBinding.gallerytv.setOnClickListener {

            Dexter.withContext(this).
            withPermission(
                Manifest.permission.READ_EXTERNAL_STORAGE
            ).withListener(object : PermissionListener {
                override fun onPermissionGranted(p0: PermissionGrantedResponse?) {
                    val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                    val uri = Uri.fromParts("package",packageName,null)
                    startActivityForResult(intent, 2)
                }

                override fun onPermissionDenied(p0: PermissionDeniedResponse?) {
                    Toast.makeText(this@userProfileImage,
                        "You have denied the permission", Toast.LENGTH_SHORT).show()
                }

                override fun onPermissionRationaleShouldBeShown(
                    p0: PermissionRequest?,
                    p1: PermissionToken?
                ) {
                    showRationaldialog()
                }
            }).onSameThread().check()
            dialog.dismiss()



        }


    }
    private fun showRationaldialog(){
        AlertDialog.Builder(this)
            .setMessage("plaese allow all permission")
            .setPositiveButton("go to settings"){
                    _,_ ->try {

                val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                val Urri = Uri.fromParts("package",packageName,null)
                intent.data = Urri
                startActivity(intent) }
            catch (e : ActivityNotFoundException){e.printStackTrace()}
            }.setNegativeButton("Cancel"){
                    dialog,_ -> dialog.dismiss()
            }.show()

    }


    private fun sameimageintointernalStorage(bitmap: Bitmap): File {
        val wraaper = ContextWrapper(applicationContext)
        var file =  wraaper.getDir("imagedirectory", Context.MODE_PRIVATE)
        file = File(file,"${UUID.randomUUID()}.JPEG")
        try {
            val stream : OutputStream = FileOutputStream(file)
            bitmap.compress(Bitmap.CompressFormat.JPEG,90,stream)
            stream.flush()
            stream.close()
        }catch (e: IOException){ e.printStackTrace()}


        return file
    }
    companion object{
        private const val imagedirectory = "MGTImage"
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if(resultCode == RESULT_OK)
        {
            if(requestCode==1){
                data?.extras?.let {
                    val image: Bitmap = data.extras!!.get("data") as Bitmap
                    Glide.with(this)
                        .load(image).circleCrop()
                        .into(profileImageBinding.userprofileImage)
                    val path = sameimageintointernalStorage(image)
                    Log.e("name",path.name)

                    uploadfile(path)







                }
            }
            if (requestCode==2){
                data?.let {
                    val img = data.data
                    Glide.with(this)
                        .load(img).circleCrop()
                        .addListener(object : RequestListener<Drawable> {
                            override fun onLoadFailed(
                                e: GlideException?,
                                model: Any?,
                                target: Target<Drawable>?,
                                isFirstResource: Boolean
                            ): Boolean {
                                Log.e("failed",e.toString())
                                return false
                            }

                            override fun onResourceReady(
                                resource: Drawable?,
                                model: Any?,
                                target: Target<Drawable>?,
                                dataSource: DataSource?,
                                isFirstResource: Boolean
                            ): Boolean {
                                resource?.let {
                                    val image: Bitmap = resource.toBitmap()
                                    val path = sameimageintointernalStorage(image)
                                    Log.e("path",path.name)
                                    uploadfile(path)
                                }

                                return false
                            }

                        })
                        .into(profileImageBinding.userprofileImage)

                }
            }
        }

    }

    private fun uploadfile(imagepath : File){

        val retrofit: RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)
        val token = intent.getStringExtra("authToken")
        Log.e("tokenauth",token.toString())
        Log.e("filepath",imagepath.absolutePath)


        val requestBody: RequestBody = RequestBody.create("image/*".toMediaTypeOrNull(), imagepath)
        val body  = MultipartBody.Part.createFormData("image",imagepath.name ,requestBody)




        retrofit.uploadUserImage("Bearer $token",body)
            .enqueue( object : Callback<ResponseBody> {
                override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {

                    response?.let {
                        if (response.isSuccessful) {
                            Log.e("sucess", response.body().toString())
                        } else {
                            Log.e("error", response.body().toString())
                            Log.e("error2", response.errorBody().toString())
                        }
                    }
                }
                override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                    Log.e("t",t.message.toString())

                }
            }

            )

    }




}