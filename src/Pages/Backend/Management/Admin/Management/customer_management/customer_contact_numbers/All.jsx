import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableAction from './Components/all_data_components/TableAction';
import TopPart from './Components/all_data_components/TopPart';
import Pagination from './Components/all_data_components/Pagination';
import { Link } from 'react-router-dom';
import setup from './Config/dsetup';
import { useEffect, useState } from 'react';
import dataStoreSlice, { async_actions } from './Config/dstore';

function All() {
    const data_store = useSelector((state) => state[setup.prefix]);
    setup.dispatch = useDispatch();
    setup.set_async(async_actions, dataStoreSlice);
    const { fetch_all_data } = setup.actions;

    useEffect(() => {
        fetch_all_data();
    }, [])

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
                                    Operator
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Details
                                </th>

                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Status
                                </th>
                                <th aria-label="actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">

                            {
                                data_store?.data && data_store?.data?.data?.map(item => {
                                    return <tr key={item.id}>
                                        <td><input type="checkbox" className="form-check-input" /></td>
                                        <td>
                                            <span >
                                            {item.customer_id}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                            {item.operator}
                                            </span>
                                        </td>

                                        <td>
                                            <span>
                                            {item.details}
                                            </span>
                                        </td>

                                        <td>
                                            <span>Active</span>
                                        </td>
                                        <td>
                                            <span className='edit_class_submanu_active'><i className="mdi mdi-format-list-bulleted"></i>
                                                <div className='edit_class_submanu'>
                                                    <ul>
                                                        <li>
                                                            <Link to="/dashboard/customer-contact-number/edit">Edit</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/customer-contact-number/details/${item.id}`}>Details</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/dashboard/customer-contact-number/edit">Deactive</Link>
                                                        </li>

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