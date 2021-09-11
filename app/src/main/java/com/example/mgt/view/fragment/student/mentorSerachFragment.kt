package com.example.mgt.view.fragment.student

import android.content.SharedPreferences
import android.os.Bundle
import android.util.Log
import android.view.*
import android.widget.Button
import android.widget.EditText
import androidx.fragment.app.Fragment
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.mgt.R
import com.example.mgt.view.data.Filterdata
import com.example.mgt.view.data.mentorListData
import com.example.mgt.view.recyclerviewmodel.mentorListAdaptor
import com.example.mgt.view.retrofit.RetrofitApi
import com.example.mgt.view.retrofit.retrofitclient
import com.example.mgt.viewmodel.sharedViewModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [mentorSerachFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class mentorSerachFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null
    lateinit var sharedviewModel: sharedViewModel
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
        val view = inflater.inflate(R.layout.fragment_mentor_serach, container, false)
        val serachusername = view.findViewById<EditText>(R.id.serachuser)
        val searchsubject = view.findViewById<EditText>(R.id.serachsubject)
        val serchbtn = view.findViewById<Button>(R.id.serchbtn)
      sharedviewModel = ViewModelProvider(requireActivity()).get(sharedViewModel::class.java)
            Log.e("token",sharedviewModel.getdata().value.toString())
        val token:String = sharedviewModel.getdata().value.toString()
        serchbtn.setOnClickListener {
            val username = serachusername.text.toString()
            val subject = searchsubject.text.toString()
            val filter = Filterdata(username,subject)

            val retrofit: RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)

            val requestcall = retrofit.mentorList(filter).enqueue(

                object : Callback<mentorListData> {
                    override fun onResponse(
                        call: Call<mentorListData>,
                        response: Response<mentorListData>
                    ) {
                        if (response.isSuccessful) {
                            val adaptor = mentorListAdaptor(token,response.body()!!, requireActivity())
                            val recyclment = view.findViewById<RecyclerView>(R.id.recyclementor)
                            recyclment.layoutManager = GridLayoutManager(requireActivity(), 1)
                           recyclment.apply {
                               addItemDecoration(DividerItemDecoration(requireActivity(),DividerItemDecoration.VERTICAL))
                           }
                            recyclment.adapter = adaptor




                        }

                    }

                    override fun onFailure(call: Call<mentorListData>, t: Throwable) {
                        Toast.makeText(requireActivity(), t.message, Toast.LENGTH_LONG).show()
                        Log.e("failure", t.message.toString())
                    }

                }
            )
        }
        return view
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment mentorSerachFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            mentorSerachFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }




}