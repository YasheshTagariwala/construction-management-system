import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {logoutUser} from "../redux/auth/actions";
import {connect} from "react-redux";

function Header(props: any) {
    const [notifyDropdown, setNotifyDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    return (
        <header className="z-10 py-4 bg-white shadow-md">
            <div className="container flex items-center justify-between h-full px-6 mx-auto">
                <button onClick={() => props.setSideBarOpen(!props.sidebarOpen)}
                        className="p-1 rounded-md lg:hidden focus:outline-none" aria-label="Menu">
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
                <div className="hidden sm:flex justify-center flex-1 mx-5">
                    <div className="relative w-full max-w-xl focus-within:text-primary">
                        <Link to="/" className="absolute inset-y-0 right-2 flex items-center pr-2 text-primary">
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                      clipRule="evenodd"/>
                            </svg>
                        </Link>
                        <input
                            className=" outline-none w-full py-4 px-4 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-full"
                            type="text" placeholder="Search for projects" aria-label="Search"/>
                    </div>
                </div>
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    <li className="relative">
                        <button onClick={() => setNotifyDropdown(!notifyDropdown)}
                                className="relative text-primary align-middle rounded-md focus:outline-none">
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                            </svg>
                            <span aria-hidden="true"
                                  className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"/>
                        </button>
                        <div onClick={() => setNotifyDropdown(!notifyDropdown)}
                             className={`fixed inset-0 h-full w-full z-10 ${notifyDropdown ? 'block' : 'hidden'}`}/>

                        <div
                            className={`absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 w-48 sm:w-72 ${notifyDropdown ? 'block' : 'hidden'}`}>
                            <div className="text-gray-600 text-xs mx-2 font-medium">
                                <Link to="/" className="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2">
                                    <img className="h-8 w-8 rounded-full object-cover mx-1"
                                         src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                                         alt="avatar"/>
                                    <p>
                                        <span className="font-semibold">Sara Salah</span> replied on
                                        the <span
                                        className="font-semibold text-primary">brila sociaty</span> project . 2m
                                    </p>
                                </Link>
                            </div>
                            <Link to="/"
                                  className="block bg-primary text-white text-center font-light text-xs py-2">See
                                all</Link>
                        </div>
                    </li>
                    <li className="relative">
                        <button onClick={() => setProfileDropdown(!profileDropdown)}
                                className="relative text-primary align-middle rounded-md focus:outline-none">
                            <img className="h-8 w-8 rounded-full object-cover mx-1"
                                 src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                                 alt="avatar"/>
                        </button>
                        <div
                            onClick={() => setProfileDropdown(!profileDropdown)}
                            className={`fixed inset-0 h-full w-full z-10 ${profileDropdown ? 'block' : 'hidden'}`}>
                        </div>

                        <div
                            className={`absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 w-48 ${profileDropdown ? 'block' : 'hidden'}`}>
                            <div className="text-gray-600 text-sm mx-2 font-medium">
                                <div className="px-2 py-2 border-b">
                                    <h6 className="text-primary font-medium">Erica Jordan</h6>
                                    <p className="text-xs font-normal">Admin</p>
                                </div>
                                <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-100 -mx-2">
                                    <svg className="w-4 h-4 mr-3" aria-hidden="true" fill="none"
                                         strokeLinecap="round"
                                         strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    <span>Profile</span>
                                </Link>
                                <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-100 -mx-2">
                                    <svg className="w-4 h-4 mr-3" aria-hidden="true" fill="none"
                                         strokeLinecap="round"
                                         strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <span>Settings</span>
                                </Link>
                                <Link to="/" onClick={() => props.logoutUser(props.history)}
                                      className="flex items-center px-4 py-2 hover:bg-gray-100 -mx-2">
                                    <svg className="w-4 h-4 mr-3" aria-hidden="true" fill="none"
                                         strokeLinecap="round"
                                         strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                                    </svg>
                                    <span>Sign Out</span>
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    )
}

const mapStateToProps = () => {
};
const mapActionsToProps = {logoutUser}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Header)