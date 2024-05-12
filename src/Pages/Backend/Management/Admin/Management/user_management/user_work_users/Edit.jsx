import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import dataStoreSlice, { async_actions } from './Config/store.js';
import setup from "./Config/setup.js";
import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  setup.dispatch = useDispatch();
  const data_store = useSelector((state) => state[setup.prefix]["singleData"])
  const data_store2 = useSelector((state) => state[setup.prefix]["user_work"])
  const data_store3 = useSelector((state) => state[setup.prefix]["user_work_department"])
  const data_store4 = useSelector((state) => state[setup.prefix]["user"])
  setup.set_async(async_actions, dataStoreSlice);
  const { get_users, set_data, update_data, fetch_all_user_work, fetch_all_user_work_department, fetch_all_user } = setup.actions;

  useEffect(() => {
    get_users(id);
    fetch_all_user_work();
    fetch_all_user_work_department();
    fetch_all_user();
    return () => {
      document.getElementById('form-data')?.reset();
      set_data(null)
    };
  }, [fetch_all_user, fetch_all_user_work, fetch_all_user_work_department, get_users, id, set_data]);
  // console.log('id from edit', id);
  // console.log('user work user ', data_store2);
  // console.log('user work user ', data_store3);
  // console.log('user work user ', data_store4);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form_data = new FormData(event.target);
    // form_data.append('id', id);
    // form_data.append('role', id);
    // console.log('form data', form_data);
    // [...document.querySelectorAll('.form_error')].forEach((el => el.remove()));
    await update_data(form_data);
    // e.target.reset();
    // // e.target.serial.value = "";
    // // e.target.title.value = "";

  };
  console.log('datra store from edit', data_store);
  if (data_store) {
    const { id } = data_store;
    return (
      <div className="card list_card">
        <div className="card-header ">
          <h2 className="heading">Edit</h2>
          <div className="btns d-flex gap-2 align-items-center">
            <a href="#/dashboard/user-work-user" className="btn rounded-pill btn-outline-secondary">
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
                    {/* <div className="custom_form_el">
                      <label htmlFor="">User Id</label>
                      <div>:</div>
                      <div>
                        {data_store?.user?.user_name}
                      </div>
                    </div> */}
                    <div className="custom_form_el">
                      <label htmlFor="">Id</label>
                      <div>:</div>
                      <div><input hidden name="id" type="text" className="form-control" defaultValue={id} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">User Id</label>
                      <div>:</div>
                      <div>
                        <select defaultValue={data_store?.user?.id} name="user_id" id="">
                          {
                            data_store4.length && data_store4?.map(item => {
                              return <option key={item.id} value={item.id}>{item.user_name}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>

                    <div className="custom_form_el">
                      <label htmlFor="">user work</label>
                      <div>:</div>
                      <div>
                        <select defaultValue={data_store?.user_work?.id} name="work_id" id="">
                          {
                            data_store2.length && data_store2?.map(item => {
                              return <option key={item.id} value={item.id}>{item.title}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Department Id</label>
                      <div>:</div>
                      <div>
                        <select defaultValue={data_store?.user_work_department?.id} name="department_id" id="">
                          {
                            data_store3.length && data_store3?.map(item => {
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