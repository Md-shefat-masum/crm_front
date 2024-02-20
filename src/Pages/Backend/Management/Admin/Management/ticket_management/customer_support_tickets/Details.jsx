import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dataStoreSlice, { async_actions } from './Config/store.js';
import setup from './Config/setup.js';
import { useParams } from 'react-router-dom';

function Details() {
    const { id } = useParams();
    setup.dispatch = useDispatch();
    const data_store = useSelector((state) => state[setup.prefix]["singleData"])
    setup.set_async(async_actions, dataStoreSlice);
    const { get_users, set_data } = setup.actions;
    // console.log(id);
    useEffect(() => {
        get_users(id);

        return () => {
            set_data(null)
        };
    }, []);

    console.log("data store form ticket",data_store, id);

    return (
        <div className='card list_card'>
            <div className="card-header ">
                <h2 className='heading'>Details</h2>
                <div className="btns d-flex gap-2 align-items-center">
                    <a href="#/dashboard/customer-support-ticket" className="btn rounded-pill btn-outline-secondary">
                        {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
                        Back
                    </a>
                    {/* {JSON.stringify(data_store)} */}
                </div>
            </div>
            <div className="card-body">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-8">
                            {/* [
                                "ID",
                                "Title",
                                "Serial",
                                "Status",
                                "CreatedAt",
                                "UpdatedAt",
                                "last ID",
                            ] */}
                            <div className="form-group mb-3">

                                <div className="custom_form_el">
                                    <div>Customer uui id</div>
                                    <div>:</div>
                                    <div>
                                        {"ticket_user_id"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Customer name</div>
                                    <div>:</div>
                                    <div>
                                        {"customer_name"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Assain to</div>
                                    <div>:</div>
                                    <div>
                                        {"assain_to"}
                                    </div>
                                </div>

                                <div className="custom_form_el">
                                    <div>Subject</div>
                                    <div>:</div>
                                    <div>
                                        {"subject"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Description</div>
                                    <div>:</div>
                                    <div>
                                        {"Description"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Email</div>
                                    <div>:</div>
                                    <div>
                                        {"Email"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Phone number</div>
                                    <div>:</div>
                                    <div>
                                        {"Phone number"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Address</div>
                                    <div>:</div>
                                    <div>
                                        {"Address"}
                                    </div>
                                </div>

                                <div className="custom_form_el">
                                    <div>Status</div>
                                    <div>:</div>
                                    <div>
                                        {"status"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Priority</div>
                                    <div>:</div>
                                    <div>
                                        {"priority"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Is complete</div>
                                    <div>:</div>
                                    <div>
                                        {"is_complete"}
                                    </div>
                                </div>
                                <div className="custom_form_el">
                                    <div>Assigned to</div>
                                    <div>:</div>
                                    <div>
                                        {"is_complete"}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">

            </div>
        </div>
    )
}

export default Details