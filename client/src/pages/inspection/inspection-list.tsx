import React from "react";
import {Link} from 'react-router-dom';
import Loader from "../../components/loader";

function Dashboard(props: any) {



    return (
        <main className="h-full pb-16 overflow-y-auto">
            {props.loading && <Loader/>}
            <div className="container px-3 md:px-6 mt-10 mx-auto grid">
                <div className="p-4 sm:p-6 md:p-10 bg-white rounded-lg shadow-xl">
                    <h2 className="font-agenor-regular font-sans text-xl md:text-3xl tracking-wide mb-5 px-3">Inspection</h2>
                    <div className="flex flex-wrap">

                        <div className="w-full lg:w-3/5 px-3 mb-5">
                            <div className="flex flex-wrap justify-end mb-8">
                                <ul className="p-1 inline-flex items-center text-sm bg-gray-200 rounded-md tracking-wide m-1">
                                    <li className="p-2 bg-primary rounded-md text-white">All</li>
                                    <li className="p-2">Unfinished</li>
                                    <li className="p-2">Finished</li>
                                </ul>
                                <select className="px-3 py-3 w-28 rounded-md text-white appearance-none bg-primary m-1">
                                    <option value="">Filter</option>
                                    <option>Date</option>
                                    <option>Project</option>
                                    <option>Member</option>
                                </select>
                            </div>
                            <div className="inspection-list">
                                {Array.from({length:10},(x, i) => (i + 1)).map(item =>
                                    <div className="cursor-pointer flex flex-wrap px-2 my-3 rounded-md justify-between items-center bg-gray-100 font-normal border border-gray-200 hover:shadow-lg">
                                        <div
                                            className="p-2 m-1 bg-primary-lightest text-white rounded-md text-sm">06/01/2020
                                        </div>
                                        <div className="p-2 m-1 w-52">
                                            <h6 className="text-primary text-sm">Wadilala society, Surat</h6>
                                            <p className="text-red-600 text-xs uppercase">Unfinished</p>
                                        </div>
                                        <div className="p-2 m-1 w-52">
                                            <h6 className="text-black text-sm">Wadilala society</h6>
                                            <p className="text-gray-400 text-xs uppercase">Project</p>
                                        </div>
                                        <div className="p-2 m-1 flex w-40">
                                            <img className="h-10 w-10 border border-gray-400 rounded-full object-cover mr-2"
                                                 src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=398&amp;q=80"
                                                 alt="avatar"/>
                                            <div>
                                                <h6 className="text-black text-sm">Sunil Mittal</h6>
                                                <p className="text-gray-400 text-xs uppercase">Inspector</p>
                                            </div>
                                        </div>
                                        <div x-data="{ inspectionactiondropdown: false }" className="relative m-1">
                                            <button /*@click="inspectionactiondropdown = !inspectionactiondropdown"*/
                                                className="relative bg-primary-lightest p-3 align-middle rounded-md opacity-50 duration-75 hover:opacity-100 focus:opacity-100">
                                                <svg className=" h-5 w-5 text-white" fill="currentColor"
                                                     xmlns="http://www.w3.org/2000/svg " viewBox="0 0 24 24 ">
                                                    <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3
                                                1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z "/>
                                                </svg>
                                            </button>
                                            <div x-show="inspectionactiondropdown " /*@click="inspectionactiondropdown = false "*/
                                                 className="fixed inset-0 h-full w-full z-10 "></div>

                                            <div x-show="inspectionactiondropdown "
                                                 className="absolute right-0 bg-white rounded-md shadow-lg overflow-hidden z-20 w-28 ">
                                                <div className="text-gray-600 text-sm font-normal ">
                                                    <a href="# " className="block p-2 hover:bg-gray-100 ">
                                                        Edit
                                                    </a>
                                                    <a href="# " className="block p-2 hover:bg-gray-100 ">
                                                        Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center my-10">
                                <div className="flex text-gray-700">
                                    <div
                                        className="h-12 w-12 mr-3 flex justify-center items-center rounded-full border border-gray-300 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="feather feather-chevron-left w-6 h-6">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </div>
                                    <div className="flex h-12 font-medium rounded-full">
                                        <div
                                            className="w-12 mx-1 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-primary text-white">1
                                        </div>
                                        <div
                                            className="w-12 mx-1 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in rounded-full border border-gray-300">2
                                        </div>
                                    </div>
                                    <div
                                        className="h-12 w-12 ml-3 flex justify-center items-center rounded-full border border-gray-300 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="feather feather-chevron-right w-6 h-6">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard
