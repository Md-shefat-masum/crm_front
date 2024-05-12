import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import setup from './Config/setup';
import { useEffect, useState } from 'react';
import dataStoreSlice, { async_actions } from './Config/store.js';
import moment from 'moment/moment.js';
import MultiselectDropdown from './components/Multiselect_dropdown.jsx';
import { useLocation } from 'react-router-dom';

// Debounce function
const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay);
    };
};

function CrmEntry() {
    const data_store = useSelector((state) => state[setup.prefix]);
    setup.dispatch = useDispatch();
    setup.set_async(async_actions, dataStoreSlice);
    const { fetch_all_data, fetch_all_user, set_search_key, store_data } = setup.actions;
    const [date1, setDate1] = useState();
    const [selectedData, setselectedData] = useState([]);
    const [selectedReason, setselectedReason] = useState([]);
    const [paramSearchNumber, setParamSearchNumber] = useState("");
    const [formatted_date, set_formatted_date] = useState('2024-04-05');
    const [customer_number, set_customer_number] = useState('');

    const location = useLocation();
    let queryParams;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        queryParams = new URLSearchParams(location.search);
        fetch_all_user();
        setDate1(moment().format('YYYY-MM-DD'))
        setParamSearchNumber(queryParams.get('num'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const search_data_by_param_number = debounce((value) => {
            set_search_key(value);
            fetch_all_data();
        }, 500);
        search_data_by_param_number(paramSearchNumber);
        set_customer_number(paramSearchNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramSearchNumber, set_search_key])

    useEffect(() => {
        let next_contact_date = data_store?.crm_entry_data?.contact_history?.next_contact_date;
        set_formatted_date(moment(next_contact_date).format('YYYY-MM-DD'));
    }, [data_store])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form_data = new FormData(event.target);
        selectedData.forEach((e, index) => {
            form_data.append(`customer_group_customer[]`, e.id);
        });
        selectedReason.forEach((e, index) => {
            form_data.append(`contact_reason[]`, e.id);
        });
        await store_data(form_data);
    };

    // Function to handle search
    const handleSearch = debounce((event) => {
        set_search_key(event.target.value);
        fetch_all_data();
    }, 500);

    const scrollToRef = (id, e) => {
        e.preventDefault();
        
        let els = document.querySelectorAll('.crm_form_menus li a');
        [...els].forEach(i => i.classList.remove('active'));
        els = document.querySelectorAll('.form_sections');
        [...els].forEach(i => i.classList.remove('active'));

        e.target.classList.add('active');
        let el = document.getElementById(id)
        if (el) {
            el.classList.add('active');
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (data_store && data_store.crm_user.users) {
        let data = data_store?.crm_user?.items;
        let reason = data_store?.crm_user?.reasons;

        // let fullName = data_store?.crm_entry_data?.newUser?.full_name
        // let id = data_store?.crm_entry_data?.newUser?.id
        return (
            <>
                <div className='mt-5'>
                    <div className="card list_card">
                        <div className='crm_form_body'>
                            <div className='crm_form_menus mt-3'>
                                <ul>
                                    <li>
                                        <a href="/#/" className='active' onClick={(e) => scrollToRef('customer_info', e)}>Customer Info</a>
                                    </li>
                                    <li>
                                        <a href="/#/" onClick={(e) => scrollToRef('customer_feedback', e)}>Customer Feedback</a>
                                    </li>
                                    <li>
                                        <a href="/#/" onClick={(e) => scrollToRef('contact_info', e)}>Contact Source</a>
                                    </li>
                                    <li>
                                        <a href="/#/" onClick={(e) => scrollToRef('set_an_appointment', e)}>Set An Appointment</a>
                                    </li>
                                    <li>
                                        <a href="/#/" onClick={(e) => scrollToRef('lead_information', e)}>Lead Information</a>
                                    </li>
                                    <li>
                                        <a href="/#/" onClick={(e) => scrollToRef('document', e)}>Document</a>
                                    </li>
                                    <li>
                                        <a href="/#/" onClick={(e) => scrollToRef('variants', e)}>Variants</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="form_content">
                                <div className="card-body p-3">
                                    <form onSubmit={(event) => handleSubmit(event)} className='form-group'>
                                        <div className='row'>
                                            <div className='col-xl-12'>
                                                <div id='customer_info' className='form_sections active p-3 mb-4 h-100'>
                                                    <h3 className='mb-4 section_heading'>Customer info</h3>
                                                    <div className="form_input_groups">
                                                        <div className="custom_form_el">
                                                            <label htmlFor="">Date</label>
                                                            {/* <div>:</div> */}
                                                            <div><input name="date" type="date" className="form-control" defaultValue={date1} /></div>
                                                        </div>
                                                        <div className="custom_form_el">
                                                            <label htmlFor="">CRM contact numbers</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <select name="crm_contact_number" className='form-select'>
                                                                    {
                                                                        data_store?.crm_user?.crm_contact_nums.map(item => {
                                                                            return <option key={item.id} value={item.id}>{item.details}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                                {/* <MultiselectDropdown data={reason} selectedData={selectedReason} setSelectedData={setselectedReason}></MultiselectDropdown> */}
                                                            </div>
                                                        </div>
                                                        <div className="custom_form_el">
                                                            <label htmlFor=""> Customer Name</label>
                                                            {/* <div>:</div> */}
                                                            <div><input name="full_name" type="text" className="form-control" /></div>
                                                        </div>
                                                        <div className="custom_form_el d-none">
                                                            <label htmlFor="">Customer DB id</label>
                                                            {/* <div>:</div> */}
                                                            <div><input name="id" type="text" className="form-control" /></div>
                                                        </div>
                                                        <div className="custom_form_el">
                                                            <label htmlFor=""> Customer Phone Number</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <input name='contact_number'
                                                                    onChange={(e) => { handleSearch(e); set_customer_number(e.target.value) }}
                                                                    // value={customer_number}
                                                                    type="text"
                                                                    className="form-control border border-success"
                                                                    placeholder="Search..."
                                                                ></input>
                                                            </div>
                                                        </div>
                                                        <div className="custom_form_el">
                                                            <label htmlFor="">Next contact date</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <input onChange={(e) => set_formatted_date(e.target.value)} name="next_contact_date" type="date" className="form-control" value={formatted_date} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="custom_form_el mt-4">
                                                        <label htmlFor="">Additional contact numbers</label>
                                                        {/* <div>:</div> */}
                                                        <div className='form_input_groups'>
                                                            <input className='mt-3 p-1 form-control' name='customer_contact_number[]' type="text" placeholder="number 1" />
                                                            <input className='mt-3 p-1 form-control' name='customer_contact_number[]' type="text" placeholder="number 2" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-xl-12'>
                                                <div id='customer_feedback' className='form_sections p-3 mt-4'>
                                                    <h3 className='mb-4 section_heading'>Customer feedback</h3>
                                                    <div className="form_input_groups">
                                                        <div className="custom_form_el">
                                                            <label htmlFor="">Feedback Type</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <select name="feedback_type" className='form-select'>
                                                                    <option value="agree">agree</option>
                                                                    <option value="disagree">disagree</option>
                                                                    <option value="well wisher">well wisher</option>
                                                                    <option value="runnig student">runnig student</option>
                                                                    <option value="old student">old student</option>
                                                                    <option value="wrong number">wrong number</option>
                                                                    <option value="contact later">contact later</option>
                                                                    <option value="next batch">next batch</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="custom_form_el">
                                                            <label htmlFor=""> Feedback Message</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <textarea name="feedback" type="text" className="form-control" defaultValue={data_store?.crm_entry_data?.newFeedback?.notes}></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="custom_form_el">
                                                            <label htmlFor="">Contact Notes</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <textarea placeholder='Take some notes' name="contact_notes" type="text" className="form-control" ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mt-4'>
                                            <div className='col-xl-12'>
                                                <div id='contact_info' className='form_sections p-3 mb-4 h-100' >
                                                    <h3 className='mb-4 section_heading'>Customer Source</h3>
                                                    <div className="form_input_groups">

                                                        <div className="custom_form_el">
                                                            <label htmlFor="">Contact type</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <select defaultValue={data_store?.crm_entry_data?.Contact_history?.contact_type} name="contact_type" className='form-select'>
                                                                    <option value="by phone">by phone</option>
                                                                    <option value="email">email</option>
                                                                    <option value="whatsup">whatsup</option>
                                                                    <option value="office">office</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="custom_form_el">
                                                            <label htmlFor="">Customer group</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <MultiselectDropdown data={data} selectedData={selectedData} setSelectedData={setselectedData}></MultiselectDropdown>
                                                            </div>
                                                        </div>
                                                        <div className="custom_form_el">
                                                            <label htmlFor="">Contact reason</label>
                                                            {/* <div>:</div> */}
                                                            <div>
                                                                <MultiselectDropdown data={reason} selectedData={selectedReason} setSelectedData={setselectedReason}></MultiselectDropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-xl-12 mt-4'>
                                                <div id='set_an_appointment' className='form_sections p-3 mt-2 mb-4 h-100'>
                                                    <h3 className='section_heading'>Set an appointment</h3>
                                                    <div className="custom_form_el mt-4">
                                                        <label htmlFor="">Online</label>
                                                        {/* <div>:</div> */}
                                                        <div className='form_input_groups'>
                                                            <input className='form-control' name='calender_event_date' type="date" placeholder="event_date" defaultValue={date1} />
                                                            <input className='form-control' name='calender_event_type' type="text" placeholder="event_type" />
                                                            <input className='form-control' name='calender_event_description' type="text" placeholder="event_descrption" />
                                                            <input className='form-control' name='calender_event_meet_link' type="text" placeholder="meet_link" />
                                                        </div>
                                                    </div>
                                                    <div className="custom_form_el mt-4">
                                                        <label htmlFor="">Offline</label>
                                                        {/* <div>:</div> */}
                                                        <div className='form_input_groups'>
                                                            <input className='form-control' name='appointment_date' type="date" placeholder="appointment_date" defaultValue={date1} />
                                                            <input className='form-control' name='appointment_contact_type' type="text" placeholder="contact_type" />
                                                            <input className='form-control' name='appointment_note' type="text" placeholder="notes" />
                                                        </div>
                                                    </div>
                                                    <div className="custom_form_el mt-4">
                                                        <label htmlFor="">Assignto</label>
                                                        {/* <div>:</div> */}
                                                        <div>
                                                            <select name="assigned_to" className='form-select'>
                                                                {
                                                                    data_store.crm_user.users.map(item => {
                                                                        return <option key={item.id} value={item.id}>{item.user_name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-xl-12 mt-4'>
                                                <div id='lead_information' className='form_sections p-3 mb-4'>
                                                    <h3 className=' section_heading'>lead information</h3>
                                                    <div className="custom_form_el mb-0 mt-3">
                                                        <label htmlFor="">lead details</label>
                                                        {/* <div>:</div> */}
                                                        <div className='form_input_groups'>
                                                            <input className='form-control' name='lead_status' type="text" placeholder="lead_status" />
                                                            <input className='form-control' name='lead_source' type="text" placeholder="lead_source" />
                                                            <textarea className='form-control' style={{ "height": "34px" }} name='lead_qualification_note' type="text" placeholder="qualification_note" id=""></textarea>
                                                            <input className='form-control' name='follow_up_date' type="date" placeholder="follow_up_date" defaultValue={date1} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-xl-12'>
                                                <div id='document' className='form_sections p-3 mb-4'>
                                                    <h3 className=' section_heading'>Documents</h3>
                                                    <div className="custom_form_el mb-0">
                                                        {/* <label htmlFor="">related images</label> */}
                                                        {/* <div>:</div> */}
                                                        <div className='form_input_groups'>
                                                            <input name='docu_1' className='m-3 p-1' type="file" accept="image/*,application/pdf" />
                                                            <input name='docu_2' className='m-3 p-1' type="file" accept="image/*,application/pdf" />
                                                            <input name='docu_3' className='m-3 p-1' type="file" accept="image/*,application/pdf" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-xl-12'>
                                                <div id='variants' className='form_sections p-3 mb-4 h-100' >
                                                    <h3 className=' section_heading'>Variants</h3>
                                                    {
                                                        data_store?.crm_user?.variants.map(item => {
                                                            return <div className="custom_form_el">
                                                                <label htmlFor="">{item.title}</label>
                                                                {/* <div>:</div> */}
                                                                <div>
                                                                    <select name={`customer_variants[${item.title}_${item.id}]`} id="">
                                                                        {
                                                                            data_store?.crm_user?.variant_values.map(item => {
                                                                                return <option key={item.id} value={item.variant_id}>{item.title}</option>
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mt-4 form_footer'>
                                            <button className='submit_button' type='submit'>Submit</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-body history_body">
                                    <h5 className='heading'>Histories</h5>
                                    <div className='history_list'>
                                        {
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0].map((i, k) => (

                                                <div className="history_item" key={k}>
                                                    <div className="date">{k + 1} april, 2024 5:40 pm</div>
                                                    <div className="message">
                                                        পরবর্তি ব্যাচে ভর্তি হবে, এখন এক্সাম চলছে, IELS, Spoken
                                                        course এ আগ্রহী
                                                    </div>
                                                    <div className="note">
                                                        মার্চ মাসের ব্যাচের সাথে যুক্ত করা হবে।
                                                    </div>
                                                    <div className="feeback_type">
                                                        <div className="item">agree</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </>
        );
    }
}
export default CrmEntry