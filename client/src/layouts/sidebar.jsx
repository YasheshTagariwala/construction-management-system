import React, {useState} from "react";
import {Link} from 'react-router-dom';

function SideBar(props) {
    const [open, setOpen] = useState(false);
    return (
        <aside
            className={`${props.sideBarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} fixed z-30 inset-y-0 w-60 sm:w-72 left-0 transition duration-300 transform overflow-y-auto bg-primary md:block flex-shrink-0 lg:translate-x-0 lg:static lg:inset-0 ease-in`}>
            <Link className="ml-6 text-2xl font-agenor-regular tracking-wider py-4 text-white block" to="/">
                C360 LABS
            </Link>
            <ul className="text-white text-base">
                <li className="relative px-6 py-3">
                    <span className="absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg"
                          aria-hidden="true"/>
                    <Link className="inline-flex items-center w-full font-light transition-colors opacity-60 duration-150 hover:opacity-100"
                          to="/">
                        <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round"
                             strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                        </svg>
                        <span className="ml-4">Dashboard</span>
                    </Link>
                </li>
                <li className="relative px-6 py-3">
                    <div className="relative">
                        <button onClick={() => setOpen(!open)}
                                className="inline-flex items-center justify-between w-full font-normal transition-colors opacity-60 duration-150 hover:opacity-100">
                            <span className="inline-flex items-center">
                                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                  </svg>
                                <span className="ml-4">Inspection</span>
                              </span>
                            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                        <div
                            className={`relative right-0 w-full mt-2 origin-top-right rounded-md ${open ? 'block' : 'hidden'}`}>
                            <div className="bg-primary-lightest rounded-md">
                                <Link className="inline-flex px-4 py-3 items-center w-full font-light transition-colors opacity-60 duration-150 hover:opacity-100"
                                      to={`/${props.user?.role}/inspection`}>Inspection</Link>
                                <Link className="inline-flex px-4 py-3 items-center w-full font-light transition-colors opacity-60 duration-150 hover:opacity-100"
                                      to={`/${props.user?.role}/inspection/add`}>Add Inspection</Link>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </aside>
    )
}

export default SideBar;
