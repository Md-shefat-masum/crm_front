import React, { useEffect } from 'react'
import setup from './Config/setup.js';
import { useDispatch, useSelector } from 'react-redux';
import dataStoreSlice, { async_actions } from './Config/store.js';

function Create() {
  const data_store = useSelector((state) => state[setup.prefix]);
  setup.dispatch = useDispatch();
  setup.set_async(async_actions, dataStoreSlice);
  const { fetch_all_user } = setup.actions;

  useEffect(() => {
    fetch_all_user();
  }, [fetch_all_user])

  console.log("data stor from user info front end", data_store?.user);

  const handleSubmit = async (event) => {
    // let e = event;
    // console.log('some from create submit', event.target.vlaue);
    event.preventDefault();
    // selectedRole.forEach((e, index) => {
    //   form_data.append(`role`, e.serial);
    // });
    // [...document.querySelectorAll('.form_error')].forEach((el => el.remove()));
    // await store_data(form_data);
    event.target.reset();
  };
  return (
    <div className="card list_card">
      <div className="card-header ">
        <h2 className="heading">Create</h2>
        <div className="btns d-flex gap-2 align-items-center">
          <a href="#/dashboard/task-user" className="btn rounded-pill btn-outline-secondary">
            {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
            Back
          </a>
        </div>
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="card-body">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-8">
                <div className="form-group mb-5">

                  <div className="custom_form_el">
                    <label htmlFor="">Task Title</label>
                    <div>:</div>
                    <div><input name="task_title" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Task Description</label>
                    <div>:</div>
                    <div><input name="task_description" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">End date</label>
                    <div>:</div>
                    <div><input name="end_time" type="date" className="form-control" /></div>
                  </div>

                  <div className="custom_form_el">
                    <label htmlFor="">User Id</label>
                    <div>:</div>
                    <div>
                      <select name='user_id' id="">
                        {
                          data_store?.user?.length && data_store?.user?.map(item => {
                            return <option key={item.id} value={item.id}>{item.user_name}</option>
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
  );
}

export default Create