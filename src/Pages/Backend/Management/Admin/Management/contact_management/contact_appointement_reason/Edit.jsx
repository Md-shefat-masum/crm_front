import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import dataStoreSlice, { async_actions } from './Config/store.js';
import setup from "./Config/setup.js";
import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  setup.dispatch = useDispatch();
  const data_store = useSelector((state) => state[setup.prefix])
  setup.set_async(async_actions, dataStoreSlice);
  const { get_users, set_data, fetch_all_appointment, fetch_all_reason } = setup.actions;

  useEffect(() => {
    get_users(id);
    fetch_all_appointment();
    fetch_all_reason();
    return () => {
      document.getElementById('form-data')?.reset();
      set_data(null)
    };
  }, [fetch_all_appointment, fetch_all_reason, get_users, id, set_data]);
  console.log('id from edit', id);


  console.log('datra store from edit', data_store);
  if (data_store) {
    // const { customer_group_id, customer_id, email, password, confirm_password, id } = data_store;
    return (
      <div className="card list_card">
        <div className="card-header ">
          <h2 className="heading">Edit</h2>
          <div className="btns d-flex gap-2 align-items-center">
            <a href="#/dashboard/contact-appointment-reason" className="btn rounded-pill btn-outline-secondary">
              {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
              Back
            </a>
          </div>
        </div>
        <form id='form-data'>
          <div className="card-body">
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-group mb-5">
                    <div className="custom_form_el">
                      <label htmlFor="">Contact reason id</label>
                      <div>:</div>
                      <div><input name="contact_reason_id" type="text" className="form-control" defaultValue={"123"} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Contact appointement id</label>
                      <div>:</div>
                      <div><input name="contact_appointement_id" type="text" className="form-control" defaultValue={"username"} /></div>
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
    )
  }
}
export default Edit