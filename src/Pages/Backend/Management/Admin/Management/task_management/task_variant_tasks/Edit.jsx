import React from 'react'
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
  const { get_users, set_data, update_data, fetch_all_task, fetch_all_task_variant, fetch_all_task_variant_value } = setup.actions;

  useEffect(() => {
    get_users(id);
    fetch_all_task();
    fetch_all_task_variant();
    fetch_all_task_variant_value();
    return () => {
      document.getElementById('form-data')?.reset();
      set_data(null)
    };
  }, [fetch_all_task, fetch_all_task_variant, fetch_all_task_variant_value, get_users, id, set_data]);
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
  console.log('datra store from edit', data_store);
  if (data_store) {
    // const { task, task_variant, task_variant_value, user_uid, email, password, confirm_password, id } = data_store?.singleData;
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
        <form onSubmit={(event) => handleSubmit(event)} id='form-data'>
          <div className="card-body">
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-group mb-5">

                    <div className="custom_form_el">
                      <label htmlFor="">Taks title</label>
                      <div>:</div>
                      <div>
                        <select defaultValue={data_store?.singleData?.task_id} name="task_id" id="">
                          {
                            data_store?.task?.length && data_store?.task?.map(item => {
                              return <option key={item.id} value={item.id}>{item.title}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Taks variant title</label>
                      <div>:</div>
                      <div>
                        <select defaultValue={data_store?.singleData?.variant_id} name="variant_id" id="">
                          {
                            data_store?.task_variant?.length && data_store?.task_variant?.map(item => {
                              return <option key={item.id} value={item.id}>{item.title}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Taks variant value title</label>
                      <div>:</div>
                      <div>
                        <select defaultValue={data_store?.singleData?.task_variant_value_id} name="task_variant_value_id" id="">
                          {
                            data_store?.task_variant_value?.length && data_store?.task_variant_value?.map(item => {
                              return <option key={item.id} value={item.id}>{item.title}</option>
                            })
                          }
                        </select>
                      </div>
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