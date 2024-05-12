import React, { useEffect, useState } from 'react'

import setup from './Config/setup.js';
import work_setup from '../user_works/Config/setup.js';
import work_department_setup from '../user_work_departments/Config/setup.js';

import dataStoreSlice, { async_actions } from './Config/store.js';
import workDataStoreSlice, { async_actions as work_async_action } from '../user_works/Config/store.js';
import WorkDepartmentdataStoreSlice, { async_actions as work_deparment_async_action } from '../user_work_departments/Config/store.js';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment.js';

function Create() {
    setup.dispatch = useDispatch();
    work_setup.dispatch = useDispatch();
    work_department_setup.dispatch = useDispatch();

    setup.set_async(async_actions, dataStoreSlice);
    work_setup.set_async(work_async_action, workDataStoreSlice);
    work_department_setup.set_async(work_deparment_async_action, WorkDepartmentdataStoreSlice);

    const user_work_store = useSelector((state) => state.user_work)
    const user_work_department_store = useSelector((state) => state.user_work_department)

    const { store_data } = setup.actions;
    const { fetch_all_user_work } = work_setup.actions;
    const { fetch_all_user_work_department } = work_department_setup.actions;

    const [name, setName] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form_data = new FormData(event.target);
        await store_data(form_data);
        event.target.reset();
    };

    useEffect(() => {
        (async function () {
            await fetch_all_user_work();
            await fetch_all_user_work_department();
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="card list_card">
            <div className="card-header ">
                <h2 className="heading">Create</h2>
                <div className="btns d-flex gap-2 align-items-center">
                    <a href="#/dashboard/user" className="btn rounded-pill btn-outline-secondary">
                        <i className="bx bx-left-arrow-alt"></i>
                        Back
                    </a>
                </div>
            </div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="card-body">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="form-group mb-5">
                                    <h2 className='mb-3 text-info'>Basic Informations</h2>
                                    <div className="custom_form_el">
                                        <label htmlFor="">Name</label>
                                        <div>:</div>
                                        <div><input value={name} onChange={(e) => setName(e.target.value)} name="user_name" type="text" className="form-control" /></div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">Password</label>
                                        <div>:</div>
                                        <div><input name="password" type="password" className="form-control" /></div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">Confirm Password</label>
                                        <div>:</div>
                                        <div><input name="confirm_password" type="password" className="form-control" /></div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">Email</label>
                                        <div>:</div>
                                        <div><input name="email" type="email" className="form-control" /></div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">User Role</label>
                                        <div>:</div>
                                        <div>
                                            <select name="role">
                                                <option value="admin">admin</option>
                                                <option value="employee">employee</option>
                                                {/* <option value="moderator">moderator</option> */}
                                                {/* <option value="student">student</option> */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">User Work</label>
                                        <div>:</div>
                                        <div>
                                            <select name="user_work_id">
                                                {
                                                    user_work_store.user_work.map(i => {
                                                        return <option key={i.id} value={i.id}>{i.title}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">User Department</label>
                                        <div>:</div>
                                        <div>
                                            <select name="user_work_department_id">
                                                {
                                                    user_work_department_store.user_work_department.map(i => {
                                                        return <option key={i.id} value={i.id}>{i.title}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mb-5">
                                    <h2 className='mb-3 text-info'>Details information</h2>
                                    <div className="custom_form_el">
                                        <label htmlFor="">First name</label>
                                        <div>:</div>
                                        <div><input defaultValue={name} name="info[first_name]" type="text" className="form-control" /></div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">Last name</label>
                                        <div>:</div>
                                        <div><input name="info[last_name]" type="text" className="form-control" /></div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">Phone Number</label>
                                        <div>:</div>
                                        <div><input name="info[phone_number]" type="text" className="form-control" /></div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">Designation</label>
                                        <div>:</div>
                                        <div><input name="info[designation]" type="text" className="form-control" /></div>
                                    </div>
                                    <div className="custom_form_el">
                                        <label htmlFor="">Date of bidth</label>
                                        <div>:</div>
                                        <div><input name="info[date_of_birth]" type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-outline-info" type="submit" value="Create">
                        Submit{" "}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Create