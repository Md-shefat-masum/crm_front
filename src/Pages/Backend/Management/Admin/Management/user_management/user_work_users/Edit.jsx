import React from 'react'

function Edit() {
  return (
    <div className="card list_card">
      <div className="card-header ">
        <h2 className="heading">Edit</h2>
        <div className="btns d-flex gap-2 align-items-center">
          <a href="#/user-work-user" className="btn rounded-pill btn-outline-secondary">
            {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
            Back
          </a>
        </div>
      </div>
      <form id='form-data'>
        <div className="card-body">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-8">
                <div className="form-group mb-5">
                  <div className="custom_form_el">
                    <label htmlFor="">User Id</label>
                    <div>:</div>
                    <div><input name="userid" type="text" className="form-control" defaultValue={"123"} /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Work Id</label>
                    <div>:</div>
                    <div><input name="work_id" type="text" className="form-control" defaultValue={"username"} /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Department Id</label>
                    <div>:</div>
                    <div><input name="department id" type="text" className="form-control" defaultValue={"password"} /></div>
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

export default Edit