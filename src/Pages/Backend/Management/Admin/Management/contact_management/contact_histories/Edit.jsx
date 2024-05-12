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
  const data_store = useSelector((state) => state[setup.prefix])
  setup.set_async(async_actions, dataStoreSlice);
  const { get_users, set_data, update_data, fetch_all_contact_number, fetch_all_customer } = setup.actions;

  useEffect(() => {
    get_users(id);
    fetch_all_contact_number();
    fetch_all_customer();
    return () => {
      document.getElementById('form-data')?.reset();
      set_data(null)
    };
  }, [fetch_all_contact_number, fetch_all_customer, get_users, id, set_data]);
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
  if (data_store.singleData) {
    const { date, next_contact_date, contact_type, note } = data_store.singleData;
    const toDate = moment(date).format('YYYY-MM-DD');
    const nextDate = moment(next_contact_date).format('YYYY-MM-DD');
    console.log('formdata', nextDate);
    return (
      <div className="card list_card">
        <div className="card-header ">
          <h2 className="heading">Edit</h2>
          <div className="btns d-flex gap-2 align-items-center">
            <a href="#/dashboard/contact-history" className="btn rounded-pill btn-outline-secondary">
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
                      <label htmlFor="">Date</label>
                      <div>:</div>
                      <div><input name="date" type="date" className="form-control" defaultValue={toDate} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Next Contact Date</label>
                      <div>:</div>
                      <div><input name="next_contact_date" type="date" className="form-control" defaultValue={nextDate} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Contact type</label>
                      <div>:</div>
                      <div><input name="contact_type" type="text" className="form-control" defaultValue={contact_type} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Note</label>
                      <div>:</div>
                      <div><input name="note" type="text" className="form-control" defaultValue={note} /></div>
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