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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (data_store) {
        const { user_uid, user_name, role, email } = data_store;
        let user_info = data_store.user_info || {};
        return (
            <div className='card list_card'>
                <div className="card-header ">
                    <h2 className='heading'>Details</h2>
                    <div className="btns d-flex gap-2 align-items-center">
                        <a href="#/dashboard/user" className="btn rounded-pill btn-outline-secondary">
                            {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
                            Back
                        </a>

                    </div>
                </div>
                <div className="card-body">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-xl-8">
                                <h2 className='mb-3 text-info'>User Informations</h2>
                                <div className="form-group mb-3">
                                    <div className="custom_form_el">
                                        <div>Id</div>
                                        <div>:</div>
                                        <div>
                                            {user_uid}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Role</div>
                                        <div>:</div>
                                        <div>
                                            {role}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Designation</div>
                                        <div>:</div>
                                        <div>
                                            {user_info.designation}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>First Name</div>
                                        <div>:</div>
                                        <div>
                                            {user_info.first_name}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Last Name</div>
                                        <div>:</div>
                                        <div>
                                            {user_info.first_name}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Username</div>
                                        <div>:</div>
                                        <div>
                                            {user_name}
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
                                        <div>Phone number</div>
                                        <div>:</div>
                                        <div>
                                            {user_info.phone_number}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Date of Birth</div>
                                        <div>:</div>
                                        <div>
                                            {moment(user_info.date_of_birth).format('DD MMM, YYYY')}
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