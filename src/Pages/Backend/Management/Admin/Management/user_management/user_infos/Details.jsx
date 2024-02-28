import React from 'react'
import{ useEffect} from 'react'
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
    console.log("data_store", data_store);
  
    if(data_store){
        const { id, user_name,first_name, last_name, designation, telegram_id,telegram_name,phone_number,date_of_birth,createdAt,updatedAt } = data_store;
    return (
    <div className='card list_card'>
        <div className="card-header ">
            <h2 className='heading'>Details</h2>
            <div className="btns d-flex gap-2 align-items-center">
                <a href="#/dashboard/user-info" className="btn rounded-pill btn-outline-secondary">
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
                                <div>Id</div>
                                <div>:</div>
                                <div>
                                    {id}
                                </div>
                            </div>
                            <div className="custom_form_el">
                                <div>User name</div>
                                <div>:</div>
                                <div>
                                    {user_name}
                                </div>
                            </div>
                            <div className="custom_form_el">
                                <div>First name</div>
                                <div>:</div>
                                <div>
                                    {first_name}
                                </div>
                            </div>
                            <div className="custom_form_el">
                                <div>Last name</div>
                                <div>:</div>
                                <div>
                                    {last_name}
                                </div>
                            </div>
                            
                            <div className="custom_form_el">
                                <div>Phone number</div>
                                <div>:</div>
                                <div>
                                    {phone_number}
                                </div>
                            </div>
                           
                            <div className="custom_form_el">
                                <div>Designation</div>
                                <div>:</div>
                                <div>
                                    {designation}
                                </div>
                            </div>
                            <div className="custom_form_el">
                                <div>Date of birth</div>
                                <div>:</div>
                                <div>
                                    {date_of_birth}
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
)} else {
    return <>
        <p>loading ...</p>
    </>
}
}

export default Details