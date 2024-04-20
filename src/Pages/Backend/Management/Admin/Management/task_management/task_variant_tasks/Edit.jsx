import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import dataStoreSlice, { async_actions } from './Config/store.js';
import setup from "./Config/setup.js";
import { useParams } from 'react-router-dom';

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
  }, []);
  console.log('id from edit', id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form_data = new FormData(event.target);
    // form_data.append('id', id);
    // form_data.append('role', id);
    console.log('form data', form_data);
    // [...document.querySelectorAll('.form_error')].forEach((el => el.remove()));
    await update_data(form_data);
    // e.target.reset();
    // // e.target.serial.value = "";
    // // e.target.title.value = "";

  };
  console.log('datra store from edit', data_store);
  if (data_store) {
    const { task, task_variant, task_variant_value, user_uid, email, password, confirm_password, id  } = data_store;
  return (
    <div className="card list_card">
      <div className="card-header ">
        <h2 className="heading">Edit</h2>
        <div className="btns d-flex gap-2 align-items-center">
          <a href="#/dashboard/task-variant-task" className="btn rounded-pill btn-outline-secondary">
            {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
            Back
          </a>
        </div>
      </div>
      <form onSubmit={(event) =>handleSubmit(event)} id='form-data'>
        <div className="card-body">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-8">
                <div className="form-group mb-5">
                 
                  <div className="custom_form_el">
                    <label htmlFor="">Task Id</label>
                    <div>:</div>
                    <div><input name="customer_id" type="text" className="form-control" defaultValue={task?.title} /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Variant Id</label>
                    <div>:</div>
                    <div><input name="variant_id" type="text" className="form-control" defaultValue={task_variant?.title} /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Task variant value id</label>
                    <div>:</div>
                    <div><input name="task_variant_value_id" type="text" className="form-control" defaultValue={task_variant_value?.title} /></div>
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