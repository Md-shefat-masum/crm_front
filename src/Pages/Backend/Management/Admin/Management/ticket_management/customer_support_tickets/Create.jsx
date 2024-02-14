import React from 'react'

function Create() {
  return (
    <div className="card list_card">
      <div className="card-header ">
        <h2 className="heading">Create</h2>
        <div className="btns d-flex gap-2 align-items-center">
          <a href="#/dashboard/support-ticket" className="btn rounded-pill btn-outline-secondary">
            {/* <i className="material-symbols-outlined fill">arrow_back</i> */}
            Back
          </a>
        </div>
      </div>
              <form>
      <div className="card-body">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
                <div className="form-group mb-5">
                  
                  <div className="custom_form_el">
                    <label htmlFor="">Customer Id</label>
                    <div>:</div>
                    <div><input name="customer_id" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor=""> Ticket user id</label>
                    <div>:</div>
                    <div><input name="ticket_user_id" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor=""> Subject</label>
                    <div>:</div>
                    <div><input name="subject" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Description</label>
                    <div>:</div>
                    <div><input name="description" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor=""> Status</label>
                    <div>:</div>
                    <div><input name="status" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor=""> Priority</label>
                    <div>:</div>
                    <div><input name="priority" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor="">Is complete</label>
                    <div>:</div>
                    <div><input name="is_complete" type="text" className="form-control" /></div>
                  </div>
                  <div className="custom_form_el">
                    <label htmlFor=""> Assigned to</label>
                    <div>:</div>
                    <div><input name="assigned_to" type="text" className="form-control" /></div>
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