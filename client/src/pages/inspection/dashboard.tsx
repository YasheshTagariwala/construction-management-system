import React from "react";
import {Link} from 'react-router-dom';

function Dashboard(props: any) {

    return (
        <main className="h-full pb-16 overflow-y-auto">
            <div className="container px-6 mt-10 mx-auto grid">
                <Link
                    className="flex items-center justify-between p-4 mb-8 text-sm text-purple-100 bg-primary rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                    to="/">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>New inspection of Birla Project</span>
                    </div>
                    <span>View more →</span>
                </Link>

                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-center p-5 bg-white rounded-lg shadow-lg border border-gray-300">
                        <div className="p-3 mr-4 text-orange-500 bg-gray-200 rounded-full">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-normal text-primary">
                                Total Members
                            </p>
                            <p className="text-xl font-medium text-black">
                                6389
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-5 bg-white rounded-lg shadow-lg border border-gray-300">
                        <div className="p-3 mr-4 text-orange-500 bg-gray-200 rounded-full">
                            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-normal text-primary">
                                Total Project
                            </p>
                            <p className="text-xl font-medium text-black">
                                6389
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-5 bg-white rounded-lg shadow-lg border border-gray-300">
                        <div className="p-3 mr-4 text-orange-500 bg-gray-200 rounded-full">
                            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-normal text-primary">
                                New Inspection
                            </p>
                            <p className="text-xl font-medium text-black">
                                6389
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-5 bg-white rounded-lg shadow-lg border border-gray-300">
                        <div className="p-3 mr-4 text-orange-500 bg-gray-200 rounded-full">
                            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-normal text-primary">
                                Pending Inspection
                            </p>
                            <p className="text-xl font-medium text-black">
                                6389
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard
