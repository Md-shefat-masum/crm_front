import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import dataStoreSlice, { async_actions } from './Config/store.js';
import setup from "./Config/setup.js";
import { useParams } from 'react-router-dom';
import moment from 'moment/moment.js';

function Edit() {
  const { id } = useParams();
  setup.dispatch = useDispatch();
  const data_store = useSelector((state) => state[setup.prefix]["singleData"])
  setup.set_async(async_actions, dataStoreSlice);
  const { get_users, set_data, update_data } = setup.actions;

  useEffect(() => {
    get_users(id);

    return () => {
      document.getElementById('form-data')?.reset();
      set_data(null)
    };
  }, [get_users, id, set_data]);
  console.log('id from edit', id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form_data = new FormData(event.target);
    form_data.append('id', id);
    // form_data.append('role', id);
    console.log('form data', form_data);
    // [...document.querySelectorAll('.form_error')].forEach((el => el.remove()));
    await update_data(form_data);
    // e.target.reset();
    // // e.target.serial.value = "";
    // // e.target.title.value = "";

  };
  console.log('datra store from edit', data_store?.customer);
  if (data_store && data_store.customer) {
    const { full_name, address, email, contact_number, is_admitted, department, admission_date } = data_store?.customer;
    return (
      <div className="card list_card">
        <div className="card-header ">
          <h2 className="heading">Edit</h2>
          <div className="btns d-flex gap-2 align-items-center">
            <a href="#/dashboard/customer" className="btn rounded-pill btn-outline-secondary">
              {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
              Back
            </a>
          </div>
        </div>
        <form onSubmit={(event) => handleSubmit(event)} id='form-data'>
          <div className="card-body">
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-group mb-5">

                    <div className="custom_form_el">
                      <label htmlFor="">Full name</label>
                      <div>:</div>
                      <div><input name="full_name" type="text" className="form-control" defaultValue={full_name} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Email</label>
                      <div>:</div>
                      <div><input name="email" type="text" className="form-control" defaultValue={email} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Contact number</label>
                      <div>:</div>
                      <div><input name="contact_number" type="text" className="form-control" defaultValue={contact_number} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Address</label>
                      <div>:</div>
                      <div><input name="address" type="text" className="form-control" defaultValue={address} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Department</label>
                      <div>:</div>
                      <div><input name="department" type="text" className="form-control" defaultValue={department} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Admission Date</label>
                      <div>:</div>
                      <div><input name="admission_date" type="date" className="form-control" defaultValue={moment(admission_date).format('YYYY-MM-DD')} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Is Admitted</label>
                      <div>:</div>
                      <div><input name="is_admitted" type="number" className="form-control" defaultValue={is_admitted === 1 ? 1 : 0} /></div>
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