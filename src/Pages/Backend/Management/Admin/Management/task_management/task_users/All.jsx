import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableAction from './Components/all_data_components/TableAction';
import TopPart from './Components/all_data_components/TopPart';
import Pagination from './Components/all_data_components/Pagination';
import { Link } from 'react-router-dom';
import setup from './Config/setup';
import { useEffect, useState } from 'react';
import dataStoreSlice, { async_actions } from './Config/store';

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
                                    User name
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Total task
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Complite task
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    In Complite task
                                </th>


                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Department
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Work
                                </th>
                                <th className="cursor_n_resize edit_cursor_n_resize">
                                    Designation
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
                                            <span>
                                                Alif sagir
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                70
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                50
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                              {item.is_complete}
                                            </span>
                                        </td>

                                        <td>
                                            <span>It</span>
                                        </td>
                                        <td>
                                            <span>Frontend developer</span>
                                        </td>
                                        <td>
                                            <span>Team leader</span>
                                        </td>
                                        <td>
                                            <span className='edit_class_submanu_active'><i className="mdi mdi-format-list-bulleted"></i>
                                                <div className='edit_class_submanu'>
                                                    <ul>
                                                        <li>
                                                            <Link to="/dashboard/task-user/edit">Edit</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/task-user/details/${item.id}`}>Details</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/dashboard/task-user/edit">Deactive</Link>
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