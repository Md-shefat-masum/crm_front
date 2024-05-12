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

    console.log(data_store, id);

    if (data_store) {
        const { id, user_name, role, email, createdAt, updatedAt } = data_store;
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
                            <div className="col-lg-8">

                                <div className="form-group mb-3">
                                    <div className="custom_form_el">
                                        <div>Id</div>
                                        <div>:</div>
                                        <div>
                                            {id}
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
                                        <div>Role</div>
                                        <div>:</div>
                                        <div>
                                            {role}
                                        </div>
                                    </div>


                                    <div className="custom_form_el">
                                        <div>Created At</div>
                                        <div>:</div>
                                        <div>
                                            {moment(createdAt).format('YYYY-MM-DD')}
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <div>Updated At</div>
                                        <div>:</div>
                                        <div>
                                            {moment(updatedAt).format('YYYY-MM-DD')}
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