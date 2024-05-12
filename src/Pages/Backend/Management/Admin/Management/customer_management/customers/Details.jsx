import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dataStoreSlice, { async_actions } from './Config/store.js';
import setup from './Config/setup.js';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment.js';

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
    }, [get_users, id, set_data]);
    // console.log("data_store from customer", data_store);
    if (data_store && data_store.customer) {
        const { id, full_name, email, contact_number, address, department, is_admitted, admission_date } = data_store?.customer;
        return (
            <div className='card list_card'>
                <div className="card-header ">
                    <h2 className='heading'>Details</h2>
                    <div className="btns d-flex gap-2 align-items-center">
                        <a href="#/dashboard/customer" className="btn rounded-pill btn-outline-secondary">
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
                                <div className="form-group mb-3">
                                    <div className="custom_form_el">
                                        <div>User Id</div>
                                        <div>:</div>
                                        <div>
                                            {id}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Full name</div>
                                        <div>:</div>
                                        <div>
                                            {full_name}
                                        </div>
                                    </div>

                                    <div className="custom_form_el">
                                        <div>Email</div>
                                        <div>:</div>
                                        <div>
                                            {email}
                                        </div>
                                    </div>

                                    <div className="custom_form_el">
                                        <div>Contact number</div>
                                        <div>:</div>
                                        <div>
                                            {contact_number}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Address</div>
                                        <div>:</div>
                                        <div>
                                            {address}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Department</div>
                                        <div>:</div>
                                        <div>
                                            {department}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Admission date</div>
                                        <div>:</div>
                                        <div>
                                            {moment(admission_date).format('YYYY-MM-DD')}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Is admitted</div>
                                        <div>:</div>
                                        <div>
                                            {is_admitted === 1 ? 'yes' : 'no'}
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
    } else {
        return <>
            <p>loading ...</p>
        </>
    }
}

export default Details