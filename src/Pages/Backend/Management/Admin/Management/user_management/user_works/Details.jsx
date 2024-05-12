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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (data_store) {
        const { title } = data_store;
        return (
            <div className='card list_card'>
                <div className="card-header ">
                    <h2 className='heading'>Details</h2>
                    <div className="btns d-flex gap-2 align-items-center">
                        <a href="#/dashboard/user-work" className="btn rounded-pill btn-outline-secondary">
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
                                        <div>Title</div>
                                        <div>:</div>
                                        <div>
                                            {title}
                                        </div>
                                    </div>
                                    {/* <div className="custom_form_el">
                                <div>User name</div>
                                <div>:</div>
                                <div>
                                    {"user name"}
                                </div>
                            </div> */}
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