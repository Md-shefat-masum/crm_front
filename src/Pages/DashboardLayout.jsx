import React, { useEffect } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import MainContentPage from './Main_content_page';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Layout() {
    const navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            axios.interceptors.request.use(
                config => {
                    config.headers['Authorization'] = `Bearer ${token}`;
                    return config;
                }
            );
            axios.interceptors.response.use(function (response) {
                return response;
            }, function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    // window.location.href = "#/login";
                    return navigate("/login");
                }
                return Promise.reject(error);
            });
        } else {
            // window.location.href = "#/login";
            return navigate("/login");
        }
    }, [navigate])
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    // console.log('issidebaropen', isSidebarOpen);

    return (
        <>
            <div id="layout-wrapper">

                <div className='full_area'>
                    <div>
                        <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
                    </div>

                    <div className='sidebar_and_contentt'>
                        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <MainContentPage isSidebarOpen={isSidebarOpen} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Layout