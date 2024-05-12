import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import TableAction from './Components/all_data_components/TableAction';
import TopPart from './Components/all_data_components/TopPart';
import Pagination from './Components/all_data_components/Pagination';
import { Link } from 'react-router-dom';
import setup from './Config/setup';
import { useEffect } from 'react';
import dataStoreSlice, { async_actions } from './Config/store';

function All() {
    const data_store = useSelector((state) => state[setup.prefix]);
    setup.dispatch = useDispatch();
    setup.set_async(async_actions, dataStoreSlice);
    const { fetch_all_data, delete_data, restore_data } = setup.actions;

    useEffect(() => {
        fetch_all_data();
    }, [fetch_all_data])

    console.log("data stor from user info front end", data_store?.data?.data);
    return (

        <>
            <div className="card list_card">
                <div className="card-header px-0">
                    <TopPart></TopPart>
                </div>
                <div className="table-responsive card-body text-nowrap">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th><input type="checkbox" className="form-check-input" /></th>

                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Customer Id
                                </th>


                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Subject
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Description
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Priority
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Is complete
                                </th>

                                {/* <th className="cursor_n_resize edit_cursor_n_resize">
                                    Assigned to
                                </th> */}
                                <th aria-label="actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">

                            {
                                data_store?.data && data_store?.data?.data?.map(item => {
                                    return <tr key={item.id}>
                                        <td><input type="checkbox" className="form-check-input" /></td>

                                        <td>
                                            <span>
                                                {item?.customer?.full_name}
                                            </span>
                                        </td>

                                        <td>
                                            <span>
                                                {item.subject}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {item.description}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {item.priority}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {/* {item?.is_complete == false ? 'incomplete' : 'complete'} */}
                                                {
                                                    item.is_complete === 1 ?

                                                        <a className="text-success" href="/#/" onClick={(e) => { e.preventDefault(); }} >

                                                            complete
                                                        </a>

                                                        :

                                                        <a className="text-danger" href="/#/" onClick={(e) => { e.preventDefault(); }} >

                                                            incomplete
                                                        </a>

                                                }
                                            </span>
                                        </td>
                                        {/* <td>
                                            <span>
                                            {item.assigned_to}
                                            </span>
                                        </td> */}


                                        <td>
                                            <span className='edit_class_submanu_active'><i className="mdi mdi-format-list-bulleted"></i>
                                                <div className='edit_class_submanu'>
                                                    <ul>
                                                        <li>
                                                            <Link to={`/dashboard/customer-support-ticket/edit/${item.id}`}>Edit</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/customer-support-ticket/details/${item.id}`}>Details</Link>
                                                        </li>
                                                        {/* <li>
                                                            <Link to="/dashboard/customer-support-ticket/edit">Deactive</Link>
                                                        </li> */}
                                                        {
                                                            item.status === 1 ?
                                                                <li>
                                                                    <a href="/#/" onClick={(event) => { event.preventDefault(); delete_data(item.id) }}>

                                                                        Deactive
                                                                    </a>
                                                                </li>
                                                                :
                                                                <li>
                                                                    <a href="/#/" onClick={(event) => { event.preventDefault(); restore_data(item.id) }}>

                                                                        Restore
                                                                    </a>
                                                                </li>
                                                        }

                                                    </ul>
                                                </div>
                                            </span>

                                        </td>
                                    </tr>

                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer py-1">
                    <Pagination></Pagination>
                </div>
            </div>
        </>
    )
}

export default All