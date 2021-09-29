import React, {useEffect, useState} from "react";
import Loader from "../../components/loader";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {inspectionList} from "../../redux/inspection/actions";
import ToasterService from "../../services/toaster-service";
// import moment from "moment";

function InspectionList(props) {
    const {inspectionList: getInspectionList} = props;
    const [inspectionList, setInspectionList] = useState([]);
    const [openIndex, setOpenIndex] = useState(-1);
    const [openDetailIndex, setOpenDetailIndex] = useState(-1);
    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        // getInspectionList({text: 'ogemp'})
        getInspectionList({text: props.user.role})
    }, [getInspectionList, props.user.role])

    useEffect(() => {
        setInspectionList(props.inspections)
    }, [props.inspections])

    useEffect(() => {
        if (props.error) {
            ToasterService.Toast(props.error, 'error')
        }
        if (props.success) {
            ToasterService.Toast(props.success, 'error')
        }
    }, [props.error, props.success])


    // const onInspectionUpdate = (values) => {
    //     if (!props.loading) {
    //         props.inspectionUpdate({
    //             updated_details: []
    //         }, props.history)
    //     }
    // }
    //
    // function getFormattedDate(date) {
    //     if (date) {
    //         return moment(date).format('DD/MM/YYYY');
    //     }
    //     return moment().format('DD/MM/YYYY');
    // }

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
                                {inspectionList.map((item, inx) =>
                                    <div key={`itm-${inx}`}
                                         className={`${openDetailIndex === inx && 'open-inspection'} cursor-pointer flex flex-wrap px-2 my-3 rounded-md justify-between items-center bg-gray-100 font-normal border border-gray-200 hover:shadow-lg`}>
                                        <div onClick={() => {
                                            setOpenDetailIndex(openDetailIndex === inx ? -1 : inx)
                                        }}
                                             className="p-2 m-1 bg-primary-lightest text-white rounded-md text-sm">{item.created_at}
                                        </div>
                                        <div onClick={() => {
                                            setOpenDetailIndex(openDetailIndex === inx ? -1 : inx)
                                        }} className="p-2 m-1 w-52">
                                            <h6 className="text-primary text-sm">{item.name}</h6>
                                            <p className={`${item.finished_at ? 'text-green-600' : 'text-red-600'} text-xs uppercase`}>{item.finished_at ? 'Finished' : 'Unfinished'}</p>
                                        </div>
                                        <div onClick={() => {
                                            setOpenDetailIndex(openDetailIndex === inx ? -1 : inx)
                                        }} className="p-2 m-1 w-52">
                                            <h6 className="text-black text-sm">{item.sessions[item.sessions.length - 1].name}</h6>
                                            <p className="text-gray-400 text-xs uppercase">Project</p>
                                        </div>
                                        <div onClick={() => {
                                            setOpenDetailIndex(openDetailIndex === inx ? -1 : inx)
                                        }} className="p-2 m-1 flex w-40">
                                            <img
                                                className="h-10 w-10 border border-gray-400 rounded-full object-cover mr-2"
                                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=398&amp;q=80"
                                                alt="avatar"/>
                                            <div>
                                                <h6 className="text-black text-sm">{item.sessions[item.sessions.length - 1].assigned_to}</h6>
                                                <p className="text-gray-400 text-xs uppercase">{props.user.role}</p>
                                            </div>
                                        </div>
                                        <div className={`relative m-1`}>
                                            <button onClick={() => {
                                                setOpenIndex(openIndex === inx ? -1 : inx)
                                            }}
                                                    className="relative bg-primary-lightest p-3 align-middle rounded-md opacity-50 duration-75 hover:opacity-100 focus:opacity-100">
                                                <svg className=" h-5 w-5 text-white" fill="currentColor"
                                                     xmlns="http://www.w3.org/2000/svg " viewBox="0 0 24 24 ">
                                                    <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3
                                                1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z "/>
                                                </svg>
                                            </button>
                                            {openIndex === inx &&
                                            <div onClick={() => {
                                                setOpenIndex(-1)
                                            }} className="fixed inset-0 h-full w-full z-10 "/>}

                                            {openIndex === inx &&
                                            <div
                                                className="absolute right-0 bg-white rounded-md shadow-lg overflow-hidden z-20 w-28 ">
                                                <div className="text-gray-600 text-sm font-normal ">
                                                    <Link to="/inspector/inspection/add"
                                                          className="block p-2 hover:bg-gray-100 ">
                                                        Edit
                                                    </Link>
                                                    <a href="# " className="block p-2 hover:bg-gray-100 ">
                                                        Delete
                                                    </a>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center my-10 hidden">
                                <div className="flex text-gray-700">
                                    <div
                                        className="h-12 w-12 mr-3 flex justify-center items-center rounded-full border border-gray-300 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="feather feather-chevron-left w-6 h-6">
                                            <polyline points="15 18 9 12 15 6"/>
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
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="feather feather-chevron-right w-6 h-6">
                                            <polyline points="9 18 15 12 9 6"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {(openDetailIndex >= 0 && inspectionList.length > 0) &&
                        <div className="w-full lg:w-2/5 px-3 mb-5">
                            <div className="bg-gray-200 border border-gray-300 p-3 sm:p-4 lg:p-5 rounded-md">
                                <div className="flex flex-wrap items-top">
                                    <div className="lg:w-1/12">
                                        <svg className="w-5 h-5 xl:w-7 xl:h-7 text-black" aria-hidden="true" fill="none"
                                             strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                        </svg>
                                    </div>
                                    <div className="lg:w-11/12">
                                        <div className="flex flex-wrap justify-between">
                                            <h5 className="text-primary text-lg font-medium tracking-wide">{inspectionList[openDetailIndex].name}</h5>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-black mr-1"
                                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path
                                                        d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"/>
                                                </svg>
                                                <p className="text-gray-500 text-sm">{inspectionList[openDetailIndex].created_at}</p>
                                            </div>
                                        </div>
                                        <p className="my-2 text-sm text-gray-500 break-all">
                                            {inspectionList[openDetailIndex].sessions[inspectionList[openDetailIndex].sessions.length - 1].notes}
                                        </p>
                                        <ul className="flex flex-wrap hidden">
                                            <li className="p-2 m-1 bg-gray-300 flex text-sm rounded-md">lorem</li>
                                            <li className="p-2 m-1 bg-gray-300 flex text-sm rounded-md">lorem</li>
                                            <li className="p-2 m-1 bg-gray-300 flex text-sm rounded-md">lorem</li>
                                            <li className="p-2 m-1 bg-gray-300 flex text-sm rounded-md">lorem</li>
                                        </ul>
                                        <div className="mt-2 flex flex-wrap justify-start">
                                            <div className="mr-3 my-1">
                                                <p className="uppercase text-xs text-black mb-1">project</p>
                                                <h6 className="bg-primary-lightest text-white p-2 rounded-md text-sm">{
                                                    inspectionList[openDetailIndex].sessions[inspectionList[openDetailIndex].sessions.length - 1].name
                                                }</h6>
                                            </div>
                                            <div className="my-1 hidden">
                                                <p className="uppercase text-xs text-black mb-1">member</p>
                                                <div className="flex items-center overflow-hidden">
                                                    <img
                                                        className="inline-block h-9 w-9 rounded-full text-white border-2 border-gray-200 object-cover object-center"
                                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                                                        alt=""/>
                                                    <img
                                                        className="-ml-2 inline-block h-9 w-9 rounded-full text-white border-2 border-gray-200 object-cover object-center"
                                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                                                        alt=""/>
                                                    <img
                                                        className="-ml-2 inline-block h-9 w-9 rounded-full text-white border-2 border-gray-200 object-cover object-center"
                                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                                                        alt=""/>
                                                </div>
                                            </div>
                                            <div className="ml-auto my-1">
                                                <p className="uppercase text-xs text-black mb-1">status</p>
                                                <select
                                                    className="form-select-icon w-28 p-2 text-sm bg-transparent border border-primary rounded-md">
                                                    <option value="">Unfinished</option>
                                                    <option>Finished</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex flex-wrap justify-start">
                                            <div className="my-1 w-full">
                                                <p className="uppercase text-xs text-black mb-1">images</p>
                                                <div className="flex items-center overflow-auto pb-1">
                                                    {(inspectionList[openDetailIndex].sessions[inspectionList[openDetailIndex].sessions.length - 1].images || []).map((x,i) => (
                                                        <img key={`img-${i}`}
                                                             className="inline-block h-24 mr-2 rounded-md border border-gray-400 object-cover object-center"
                                                             src={x}
                                                             alt=""/>
                                                     ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex flex-wrap justify-start">
                                            <div className="my-1 w-full">
                                                <p className="uppercase text-xs text-black mb-1">Check list</p>
                                                {inspectionList[openDetailIndex].sessions[inspectionList[openDetailIndex].sessions.length - 1].checklist.map((chk, chkInx) => (
                                                    <div key={`chk-${chkInx}`} className="p-2 mb-2 border bg-gray-300 hover:border-primary rounded-md">
                                                        <div className="flex flex-wrap">
                                                            <div className="flex flex-wrap w-full justify-between">
                                                                <label className="custom-label flex cursor-pointer w-11/12">
                                                                    <div
                                                                        className="bg-white rounded-md w-6 h-6 p-1 flex justify-center items-center mr-2">
                                                                        <input type="checkbox" className="hidden" onChange={() => {
                                                                            chk.checked = !chk.checked;
                                                                        }} defaultChecked={chk.checked}/>
                                                                        <svg
                                                                            className="opacity-0 invisible w-4 h-4 text-primary pointer-events-none"
                                                                            viewBox="0 0 172 172">
                                                                            <g fill="none" strokeWidth="none"
                                                                               strokeMiterlimit="10" fontFamily="none"
                                                                               fontWeight="none" fontSize="none"
                                                                               textAnchor="none"
                                                                               style={{mixBlendMode: 'normal'}}>
                                                                                <path d="M0 172V0h172v172z"/>
                                                                                <path
                                                                                    d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                                                                                    fill="currentColor"
                                                                                    strokeWidth="1"/>
                                                                            </g>
                                                                        </svg>
                                                                    </div>
                                                                    <span className="select-none break-all normal-case">{chk.item}</span>
                                                                </label>
                                                                <div className="w-1/12 text-right">
                                                                    <button type={'button'}
                                                                            onClick={() => {setModalVisibility(true)}}
                                                                            className="p-1 bg-gray-500 rounded-md ml-auto">
                                                                        <svg className="w-4 h-4 text-white"
                                                                             xmlns="http://www.w3.org/2000/svg"
                                                                             fill="currentColor" viewBox="0 0 24 24">
                                                                            <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"/>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ul className="mt-2">
                                                            {(chk.issues || []).map((issue, issueInx) => (
                                                                <li key={`issu-${issueInx}`} className="break-all font-light text-gray-800 text-sm border-t border-gray-500 p-1">Lorem,
                                                                    {issue}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    </div>
                </div>
            </div>
            {/*<Modal
                isOpen={modalVisibility}
                onRequestClose={() => {
                    setModalVisibility(false)
                }}
                contentLabel="Example Modal">
                <div className="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
                    <div className="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10">
                    <div className="flex flex-wrap justify-between w-full">
                        <span className="font-bold text-left block text-2xl text-primary mb-3">Add Issues </span>
                        <button className="w-8 h-8 bg-primary rounded-full">
                        <svg className="w-4 h-4 text-white m-auto" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </button>
                </div>
                <form className="add-issue mt-3">
                    <div className="form-panel">
                        <textarea className="form-input" rows={2} name="" required placeholder="write here" aria-label="Write here" aria-required="true"/>
                    </div>
                    <button type="submit" className="button blue-btn">
                        submit
                    </button>
                </form>
            </div>

        </div>
            </Modal>*/}
        </main>
    )
}

const mapStateToProps = ({inspectionsReducer, authUser}) => {
    const {inspections, loading, error, success} = inspectionsReducer
    const {user} = authUser
    return {inspections, loading, error, user, success}
}

const mapActionsToProps = {inspectionList}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(InspectionList)
