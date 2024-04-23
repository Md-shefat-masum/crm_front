import React from 'react'
import setup from './Config/setup.js';
import { useDispatch } from 'react-redux';
import dataStoreSlice, { async_actions } from './Config/store.js';
import moment from 'moment/moment.js';


function Create() {
  setup.dispatch = useDispatch();
  setup.set_async(async_actions, dataStoreSlice);
  const { store_data } = setup.actions;

  // useEffect(() => {
  //   get_roles();
  // }, [])


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
          <a href="#/dashboard/customer" className="btn rounded-pill btn-outline-secondary">
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
                    <label htmlFor="">Full name</label>
                    <div>:</div>
                    <div><input name="full_name" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Email</label>
                    <div>:</div>
                    <div><input name="email" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Contact number</label>
                    <div>:</div>
                    <div><input name="contact_number" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Address</label>
                    <div>:</div>
                    <div><input name="address" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Department</label>
                    <div>:</div>
                    <div><input name="department" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Admission Date</label>
                    <div>:</div>
                    <div><input name="admission_date" type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} /></div>
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