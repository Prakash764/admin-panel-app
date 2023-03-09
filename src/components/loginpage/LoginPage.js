import React, { useState } from 'react'
import style from './loginpage.module.css'
import { useNavigate } from 'react-router-dom';



function LoginPage(props) {
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate();

    const { setIsLoggedIn } = props

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (name !== '' && password !== '') {
            if (name.length >= 8 && password.length >= 8) {
                if (name === password) {
                    localStorage.setItem("userName", name)
                    localStorage.setItem("password", password)
                    setIsLoggedIn(true)
                    navigate('/dashboard');
                }
                else {
                    alert('Please enter valid credentials!')
                }
            }else{
                alert('Username and Password must have 8 characters.')
            }
        }
    }

    return (
        <>
            <center className={`pt-5 ${style.center}`}>
                <div className={`container pt-5 ${style.loginpagediv}`}>
                    <div className="text-center">
                        <h2 className="tm-block-title mb-4">Welcome to Dashboard, Login</h2>
                    </div>

                    <form onSubmit={(e) => onSubmitHandler(e)} className={`tm-login-form ${style.form}`}>
                        <div className={style.form_Group}>
                            <label htmlFor="username">Username</label>
                            <input onChange={(e) => setname(e.target.value)} name="username" type="text" className={`validate ${style.formControl}`} id="username" value={name} required />
                        </div>
                        <div className={`mt-3 ${style.form_Group}`}>
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setpassword(e.target.value)} name="password" type="password" className={`validate ${style.formControl}`} id="password" value={password} required />
                        </div>
                        <div className={`mt-4 ${style.form_Group}`}>
                            <button type="submit" className={`btn-block text-uppercase ${style.btn}`}>
                                Login
                            </button>
                        </div>
                    </form>
                    <button onClick={() => { alert('Enter Password Same as UserName') }} className={`mt-4 btn-block text-uppercase ${style.btn}`}>
                        Forgot your password?
                    </button>

                </div>
            </center>
        </>
    )
}
export default LoginPage;