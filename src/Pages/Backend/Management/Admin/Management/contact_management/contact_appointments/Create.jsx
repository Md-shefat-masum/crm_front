import React, { useEffect } from 'react'
import setup from './Config/setup.js';
import { useDispatch, useSelector } from 'react-redux';
import dataStoreSlice, { async_actions } from './Config/store.js';
import moment from 'moment/moment.js';


function Create() {
  setup.dispatch = useDispatch();
  const data_store = useSelector((state) => state[setup.prefix])
  setup.set_async(async_actions, dataStoreSlice);
  const { store_data, fetch_all_contact_number, fetch_all_customer } = setup.actions;

  useEffect(() => {
    fetch_all_contact_number();
    fetch_all_customer();
  }, [fetch_all_contact_number, fetch_all_customer])


  const handleSubmit = async (event) => {
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
          <a href="#/dashboard/contact-appointment" className="btn rounded-pill btn-outline-secondary">
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
                    <label htmlFor="">CRM contact number</label>
                    <div>:</div>
                    <div>
                      <select defaultValue={data_store?.singleData?.customer_id} name="contact_number_id" id="">
                        {
                          data_store?.contact_number?.length && data_store?.contact_number?.map(item => {
                            return <option key={item.id} value={item.id}>{item?.details}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Customer</label>
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
                    <label htmlFor="">Date</label>
                    <div>:</div>
                    <div><input name="date" type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Contact type</label>
                    <div>:</div>
                    <div><input name="contact_type" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Notes</label>
                    <div>:</div>
                    <div><input name="note" type="text" className="form-control" /></div>
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