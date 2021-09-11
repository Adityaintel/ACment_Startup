package com.example.mgt.view.fragment.student

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.mgt.R
import com.example.mgt.view.recyclerviewmodel.videoListAdaptor
import com.example.mgt.view.response.userVideoListResponse
import com.example.mgt.view.retrofit.RetrofitApi
import com.example.mgt.view.retrofit.retrofitclient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [homeFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class homeFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

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
        val layout= inflater.inflate(R.layout.fragment_home, container, false)

        val retrfit: RetrofitApi = retrofitclient.BuilderService(RetrofitApi::class.java)
        val request = retrfit.getVideos().enqueue(
            object: Callback<ArrayList<userVideoListResponse>> {
                override fun onResponse(
                    call: Call<ArrayList<userVideoListResponse>>,
                    response: Response<ArrayList<userVideoListResponse>>
                ) {
                    response?.let {
                        if (response.isSuccessful){

                            Log.e("response",response.body().toString())


                            val videolist = response.body()
                            videolist?.let {
                                val adaptor = videoListAdaptor(requireActivity(), videolist)
                                val recyclerView: RecyclerView =
                                    layout.findViewById(R.id.videorecyclerView)
                                recyclerView.layoutManager = GridLayoutManager(requireContext(), 1)
                                recyclerView.apply {
                                    addItemDecoration(
                                        DividerItemDecoration(
                                            requireActivity(),
                                            DividerItemDecoration.VERTICAL
                                        )
                                    )
                                }
                                recyclerView.adapter = adaptor

                            }


                        }
                        else
                        {
                            Log.e("error",response.errorBody().toString())
                        }
                    }
                }

                override fun onFailure(call: Call<ArrayList<userVideoListResponse>>, t: Throwable) {
                    Log.e("failure",t.message.toString())
                }


            }
        )





    return layout
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment homeFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            homeFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}