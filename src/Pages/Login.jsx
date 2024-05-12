import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const loginSubmit = async (event) => {

        event.preventDefault();

        let token = localStorage.getItem('token');
        console.log('token value', token);

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        axios.post("api/login-submit", new FormData(event.currentTarget), config)
            .then(res => {
                // {{-- localStorage.token = res.data.access_token; --}}
                console.log('from form submitddd', res.data?.data);
                console.log('token', res.data?.token);
                let token = res.data?.token;

                // return;

                if (['admin', 'employee'].includes(res?.data?.data?.role)) {
                    localStorage.setItem('token', token)
                    return navigate("/dashboard");

                }
                else {
                    return navigate("/dashboard/crmentry");
                }

            })
            .catch(err => {
                let { data } = err.response.data;
                console.log(data);
            })
    }
    return (
        <>
            {/* <h1 className='testt'>login</h1> */}

            <div style={{ "backgroundImage": "url(./assets/customize_img/bg.jpg)" }} className='login_page'>
                <div className='container'>
                    <div className='login_page_content'>

                        <div className='login_form_all_content'>
                            <div className='form_logo'>
                                <img src="./assets/customize_img/logo_big.png" alt="logo" />
                            </div>
                            <div className='form_title'>
                                <h2 className='title_text'>CRM</h2>
                            </div>

                            {/* form_area_start */}
                            <form onSubmit={(event) => loginSubmit(event)} method="POST" action="/api/login-submit" >
                                <div className="input_area">
                                    {/* email area start */}
                                    <div className="icon_and_input_text_area">

                                        <div className="input_text_area">
                                            <input name='email' type="email" className="input_text" placeholder="Email . . ." />
                                        </div>
                                    </div>
                                    {/* email area end */}

                                    {/* password area start */}
                                    <div className="icon_and_input_text_area">

                                        <div className="input_text_area">
                                            <input name='password' type="password" className="input_text" placeholder="Enter your password . . ." />
                                        </div>
                                    </div>
                                    {/* password area end */}

                                    {/* login_button_area start */}
                                    <div className='login_button_area'>
                                        <button className='login_button'>Login</button>
                                    </div>
                                    {/* login_button_area end */}
                                </div>
                            </form>
                            {/* form_area_end */}


                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login