import React from 'react'
import{ useEffect} from 'react'
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
    }, []);
    console.log("data_store", data_store);
    if (data_store) {
        const { customer_id,document_path,customer, createdAt, updatedAt, status  } = data_store;
  return (
    <div className='card list_card'>
        <div className="card-header ">
            <h2 className='heading'>Details</h2>
            <div className="btns d-flex gap-2 align-items-center">
                <a href="#/dashboard/customer-relavent-document" className="btn rounded-pill btn-outline-secondary">
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
                                <div>Customer</div>
                                <div>:</div>
                                <div>
                                    {customer?.full_name}
                                </div>
                            </div>
                            <div className="custom_form_el">
                                <div>Document path</div>
                                <div>:</div>
                                <div>
                                    {document_path}
                                </div>
                            </div>
                            <div className="custom_form_el">
                                <div>Status</div>
                                <div>:</div>
                                <div>
                                    {status === 1 ? "true" : "false"}
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