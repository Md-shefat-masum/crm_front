import React from 'react'
import { Outlet } from 'react-router-dom'

function Main_content_page(props) {
    let isSidebarOpen = props.isSidebarOpen;
    return (
        <>
            <div className='main_content_page'>
                <div className={`main-content ${isSidebarOpen ? 'maincontent' : 'closeside'}`}  >
                    <div className="page-content">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main_content_page