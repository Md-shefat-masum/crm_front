import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import moment from 'moment/moment.js';

import setup from './Config/setup.js';
import work_setup from '../user_works/Config/setup.js';
import work_department_setup from '../user_work_departments/Config/setup.js';

import dataStoreSlice, { async_actions } from './Config/store.js';
import workDataStoreSlice, { async_actions as work_async_action } from '../user_works/Config/store.js';
import WorkDepartmentdataStoreSlice, { async_actions as work_deparment_async_action } from '../user_work_departments/Config/store.js';


function Edit() {
    const { id } = useParams();

    /** initialize dispath */
    setup.dispatch = useDispatch();
    work_setup.dispatch = useDispatch();
    work_department_setup.dispatch = useDispatch();

    /** initialize async dispath */
    setup.set_async(async_actions, dataStoreSlice);
    work_setup.set_async(work_async_action, workDataStoreSlice);
    work_department_setup.set_async(work_deparment_async_action, WorkDepartmentdataStoreSlice);

    /** get data store */
    const data_store = useSelector((state) => state[setup.prefix]["singleData"]);
    const user_work_store = useSelector((state) => state.user_work);
    const user_work_department_store = useSelector((state) => state.user_work_department);

    /** get actions */
    const { get_users, set_data, update_data } = setup.actions;
    const { fetch_all_user_work } = work_setup.actions;
    const { fetch_all_user_work_department } = work_department_setup.actions;

    /** local states */
    const [work_id, set_work_id] = useState('');
    const [work_department_id, set_work_department_id] = useState('');

    /** fetch dependencies */
    useEffect(() => {
        (async function () {
            await fetch_all_user_work();
            await fetch_all_user_work_department();
            await get_users(id);
        })()
        return () => {
            document.getElementById('form-data')?.reset();
            set_data(null)
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        get_work_id();
        get_work_department_id();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data_store]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form_data = new FormData(event.target);
        form_data.append('id', id);
        await update_data(form_data);
    };

    function get_work_id() {
        if (data_store?.user_works?.length) {
            set_work_id(data_store.user_works[0].id);
        }
    }
    function get_work_department_id() {
        if (data_store?.user_work_departments?.length) {
            set_work_department_id(data_store.user_work_departments[0].id);
        }
    }
    if (data_store) {
        const { user_name, role, email, user_info } = data_store;
        return (
            <div className="card list_card">
                <div className="card-header ">
                    <h2 className="heading">Edit</h2>
                    <div className="btns d-flex gap-2 align-items-center">
                        <a href="#/dashboard/user" className="btn rounded-pill btn-outline-secondary">
                            {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
                            Back
                        </a>
                    </div>
                </div>
                <form onSubmit={(event) => handleSubmit(event)} id='form-data'>
                    <div className="card-body">
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="form-group mb-5">
                                        <h2 className='mb-3 text-info'>Basic Informations</h2>
                                        <div className="custom_form_el">
                                            <label htmlFor="">Username</label>
                                            <div>:</div>
                                            <div><input name="user_name" type="text" className="form-control" defaultValue={user_name} /></div>
                                        </div>

                                        <div className="custom_form_el">
                                            <label htmlFor="">Email</label>
                                            <div>:</div>
                                            <div><input name="email" type="text" className="form-control" defaultValue={email} /></div>
                                        </div>
                                        <div className="custom_form_el">
                                            <label htmlFor="">Role</label>
                                            <div>:</div>
                                            <div>
                                                <select defaultValue={role} name="role" id="">
                                                    <option value="admin">admin</option>
                                                    <option value="moderator">moderator</option>
                                                    <option value="employee">employee</option>
                                                    <option value="student">student</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="custom_form_el">
                                            <label htmlFor="">User Work</label>
                                            <div>:</div>
                                            <div>
                                                <select name="user_work_id" onChange={(e) => set_work_id(e.target.value)} value={work_id}>
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
                                                <select name="user_work_department_id" onChange={(e) => set_work_department_id(e.target.value)} value={work_department_id}>
                                                    {
                                                        user_work_department_store.user_work_department.map(i => {
                                                            return <option key={i.id} value={i.id}>{i.title}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        user_info &&
                                        (
                                            <div className="form-group mb-5">
                                                <h2 className='mb-3 text-info'>Details information</h2>
                                                <div className="custom_form_el">
                                                    <label htmlFor="">First name</label>
                                                    <div>:</div>
                                                    <div><input name="info[first_name]" defaultValue={user_info['first_name']} type="text" className="form-control" /></div>
                                                </div>
                                                <div className="custom_form_el">
                                                    <label htmlFor="">Last name</label>
                                                    <div>:</div>
                                                    <div><input name="info[last_name]" defaultValue={user_info['last_name']} type="text" className="form-control" /></div>
                                                </div>
                                                <div className="custom_form_el">
                                                    <label htmlFor="">Phone Number</label>
                                                    <div>:</div>
                                                    <div><input name="info[phone_number]" defaultValue={user_info['phone_number']} type="text" className="form-control" /></div>
                                                </div>
                                                <div className="custom_form_el">
                                                    <label htmlFor="">Designation</label>
                                                    <div>:</div>
                                                    <div><input name="info[designation]" defaultValue={user_info['designation']} type="text" className="form-control" /></div>
                                                </div>
                                                <div className="custom_form_el">
                                                    <label htmlFor="">Date of bidth</label>
                                                    <div>:</div>
                                                    <div><input name="info[date_of_birth]" type="date" className="form-control" defaultValue={user_info['date_of_birth'] ? moment(user_info['date_of_birth']).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')} /></div>
                                                </div>
                                            </div>
                                        )
                                    }

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
        )
    }
}

export default Edit