import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import dataStoreSlice, { async_actions } from './Config/store.js';
import setup from "./Config/setup.js";
import { useParams } from 'react-router-dom';
import moment from 'moment/moment.js';

function Edit() {
  const { id } = useParams();
  setup.dispatch = useDispatch();
  const data_store = useSelector((state) => state[setup.prefix]["singleData"])
  const data_store2 = useSelector((state) => state[setup.prefix]);
  setup.set_async(async_actions, dataStoreSlice);
  const { get_users, set_data, update_data, fetch_all_user,get_only_user } = setup.actions;

  useEffect(() => {
    get_only_user(id);
    fetch_all_user();
    return () => {
      document.getElementById('form-data')?.reset();
      set_data(null)
    };
  }, []);
  console.log('id from edit', data_store2);
  console.log("data stor from user info front end", data_store2?.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form_data = new FormData(event.target);
    form_data.append('id', id);
    // form_data.append('role', id);
    console.log('form data', form_data);
    // [...document.querySelectorAll('.form_error')].forEach((el => el.remove()));
    // await update_data(form_data);
    // e.target.reset();
    // // e.target.serial.value = "";
    // // e.target.title.value = "";

  };
  console.log('datra store from edit', data_store2?.singleTask);
  if (data_store2 ) {
    // const {  } = data_store2?.singleTask[0];
    return (
      <div className="card list_card">
        <div className="card-header ">
          <h2 className="heading">Edit</h2>
          <div className="btns d-flex gap-2 align-items-center">
            <a href="#/dashboard/task-user" className="btn rounded-pill btn-outline-secondary">
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
                      <label htmlFor="">Task title</label>
                      <div>:</div>
                      <div><input name="task_title" type="text" className="form-control" defaultValue={'tastitle'} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Task Description</label>
                      <div>:</div>
                      <div><input name="task_description" type="text" className="form-control" defaultValue={'taskdescription'} /></div>
                    </div>
                    <div className="custom_form_el">
                    <label htmlFor="">End date</label>
                    <div>:</div>
                    {/* <div><input name="end_time" type="date" className="form-control" defaultValue={'taskend_time' ? 
                    moment(task?.end_time).format('YYYY-MM-DD')
                    :
                    moment().format('YYYY-MM-DD')
                   }/></div> */}
                  </div>
                    <div className="custom_form_el">
                      <label htmlFor="">User Id</label>
                      <div>:</div>
                      <div>
                        <select name='user_id' id="">
                          {
                          data_store2?.user?.length &&data_store2?.user?.map(item => {
                            return <option key={item.id} value={item.id}>{item.user_name}</option>
                          })
                        }
                          
                        </select>
                      </div>
                    </div>

                    {/* <div className="custom_form_el">
                    <label htmlFor="">Is complete</label>
                    <div>:</div>
                    <div><input name="is_complete" type="text" className="form-control" defaultValue={"username"} /></div>
                  </div> */}
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