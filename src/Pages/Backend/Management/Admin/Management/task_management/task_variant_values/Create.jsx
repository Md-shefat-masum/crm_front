import React, { useEffect } from 'react'
import setup from './Config/setup.js';
import { useDispatch, useSelector } from 'react-redux';
import dataStoreSlice, { async_actions } from './Config/store.js';

function Create() {
  setup.dispatch = useDispatch();
  const data_store = useSelector((state) => state[setup.prefix])
  setup.set_async(async_actions, dataStoreSlice);
  const { store_data, fetch_all_task_variant, fetch_all_task_variant_value } = setup.actions;

  useEffect(() => {
    fetch_all_task_variant();
    fetch_all_task_variant_value();
  }, [fetch_all_task_variant, fetch_all_task_variant_value])


  const handleSubmit = async (event) => {
    // let e = event;
    // console.log('some from create submit', event.target.vlaue);
    event.preventDefault();
    let form_data = new FormData(event.target);
    // selectedRole.forEach((e, index) => {
    //   form_data.append(`role`, e.serial);
    // });
    // [...document.querySelectorAll('.form_error')].forEach((el => el.remove()));
    await store_data(form_data);
    event.target.reset();
  };
  if (data_store.singleData) {
    // const { title, task_variant_id, id } = data_store?.singleData;
    return (
      <div className="card list_card">
        <div className="card-header ">
          <h2 className="heading">Create</h2>
          <div className="btns d-flex gap-2 align-items-center">
            <a href="#/dashboard/task-variant-value" className="btn rounded-pill btn-outline-secondary">
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
                      <label htmlFor="">Taks variant title</label>
                      <div>:</div>
                      <div>
                        <select name="task_variant_id" id="">
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
                        <select name="title" id="">
                          {
                            data_store?.task_variant_value?.length && data_store?.task_variant_value?.map(item => {
                              return <option key={item.id} value={item.title}>{item.title}</option>
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
}
export default Create