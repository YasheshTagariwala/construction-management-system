import React from "react";
import Loader from "../../components/loader";

function InspectionForm(props: any) {

    return (
        <main className="h-full pb-16 overflow-y-auto">
            {props.loading && <Loader/>}
            <div className="container px-6 mt-10 mx-auto grid">
                {/*Card*/}
                <div className="p-10 bg-white rounded-lg shadow-xl">
                    <h2 className="font-agenor-regular font-sans text-xl md:text-3xl tracking-wide mb-5 px-3">Add
                        Inspection</h2>

                    <form className="add-inspection">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 px-3 mb-5">
                                <div className="form-panel">
                                    <label className="form-label" htmlFor="Inspection Title">Title</label>
                                    <input className="form-input" id="" name="Inspection Title" type="text" required
                                           placeholder="Title" aria-label="Inspection Title" aria-required="true"/>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-5">
                                <div className="form-panel">
                                    <label className="form-label" htmlFor="Inspection Tag">Tag</label>
                                    <input className="form-input" id="" name="Inspection Tag" type="text" required
                                           placeholder="Tag" aria-label="Inspection Tag" aria-required="true"/>
                                </div>
                            </div>
                            <div className="w-full px-3 mb-5">
                                <div className="form-panel">
                                    <label className="form-label" htmlFor="Inspection Description">Description</label>
                                    <textarea className="form-input" rows={3} id="" name="Inspection Description"
                                              required placeholder="Description"
                                              aria-label="Inspection Description" aria-required="true"/>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-5">
                                <div className="form-panel">
                                    <label className="form-label" htmlFor="Inspection Project">Project</label>
                                    <select className="form-select form-select-icon" id="" name="Inspection Project"
                                            required aria-label="Inspection Project" aria-required="true">
                                        <option value="">Choose Project</option>
                                        <option>Porject-1</option>
                                        <option>Porject-2</option>
                                        <option>Porject-3</option>
                                        <option>Porject-4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-5">
                                <div className="form-panel">
                                    <label className="form-label" htmlFor="Inspection Member">Member</label>
                                    <select className="form-select form-select-icon" id="" name="Inspection Member"
                                            required aria-label="Inspection Member" aria-required="true">
                                        <option value="">Choose Member</option>
                                        <option>Erica Jordan</option>
                                        <option>Erica Jordan</option>
                                        <option>Erica Jordan</option>
                                        <option>Erica Jordan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="button blue-btn">
                            submit
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default InspectionForm
