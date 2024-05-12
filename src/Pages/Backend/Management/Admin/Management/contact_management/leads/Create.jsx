import React, { useEffect } from 'react'
import setup from './Config/setup.js';
import { useDispatch, useSelector } from 'react-redux';
import dataStoreSlice, { async_actions } from './Config/store.js';
import moment from 'moment/moment.js';


function Create() {
  setup.dispatch = useDispatch();
  const data_store = useSelector((state) => state[setup.prefix])
  setup.set_async(async_actions, dataStoreSlice);
  const { store_data, fetch_all_customer, fetch_all_user } = setup.actions;

  useEffect(() => {
    fetch_all_customer();
    fetch_all_user();
  }, [fetch_all_customer, fetch_all_user])


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
  return (
    <div className="card list_card">
      <div className="card-header ">
        <h2 className="heading">Create</h2>
        <div className="btns d-flex gap-2 align-items-center">
          <a href="#/dashboard/contact-leads" className="btn rounded-pill btn-outline-secondary">
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
                    <label htmlFor="">Customer </label>
                    <div>:</div>
                    <div>
                      <select defaultValue={data_store?.singleData?.customer_id} name="customer_id" id="">
                        {
                          data_store?.customer?.length && data_store?.customer?.map(item => {
                            return <option key={item.id} value={item.id}>{item.full_name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor=""> Lead status</label>
                    <div>:</div>
                    <div><input name="lead_status" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Lead source</label>
                    <div>:</div>
                    <div><input name="lead_source" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Assigned to</label>
                    <div>:</div>
                    <div>
                      <select defaultValue={data_store?.singleData?.assigned_to} name="assigned_to" id="">
                        {
                          data_store?.user?.length && data_store?.user?.map(item => {
                            return <option key={item.id} value={item.id}>{item.user_name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Qualification notes</label>
                    <div>:</div>
                    <div><input name="qualification_notes" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Follow up date</label>
                    <div>:</div>
                    <div><input name="follow_up_date" type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} /></div>
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