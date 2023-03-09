import React, { useMemo } from 'react'
import { useState } from 'react';
import { flushSync } from 'react-dom';

import './accounts.css'


function Accounts() {

    let apiData = JSON.parse(localStorage.getItem('data'))
    let myarr = Object.keys(apiData.accountsPage)

    const [userArr, setUserArr] = useState(myarr)
    const [option, setOption] = useState('')
    const [val, setval] = useState({});


    useMemo(() => {
        if (option) {
            const userObj = apiData['accountsPage'][`${option}`]
            setval(userObj);
        }
        // eslint-disable-next-line
    }, [option])

    const onOptionChangeHandler = (e) => {
        setOption(e.target.value)
    }

    const onChangeHandler = (e) => {
        let { name, value } = e.target
        if (name === 'profilePic') {
            let img = window.URL.createObjectURL(e.target.files[0])   //img update
            value = img;
            apiData['accountsPage'][`${option}`]['profilePic'] = value
            localStorage.setItem('data', JSON.stringify(apiData))
        }
        const newObj = { ...val, [name]: value }
        setval(newObj)
    }

    //for delete profile pic
    const onDeleteBtnHandler = () => {
        console.log()
        if (option) {
            const userObj = apiData['accountsPage'][`${option}`]
            userObj.profilePic = "";
            setval(userObj)
            apiData['accountsPage'][`${option}`] = userObj
            localStorage.setItem('data', JSON.stringify(apiData))
        }
    }

    // for update profile button 
    const updateProfileHandler = (event) => {
        event.preventDefault();
        if (option) {
            if ((val.name !== '' || undefined) && (val.email !== '' || undefined) && (val.password !== '' || undefined) && (val.repassword !== '' || undefined)) {
                if (val.password === val.repassword) {
                    flushSync(() => {
                        setval({ ...val, repassword: '' })
                    })
                    delete val.repassword;
                    apiData['accountsPage'][`${option}`] = val
                    localStorage.setItem('data', JSON.stringify(apiData))
                    alert('Information Updated Successfully!')
                } else {
                    alert('Please Enter Valid Password')
                }
            }
        }
    }

    // for Delete account 
    const deleteAccountHandler = (e) => {
        e.preventDefault();

        const filterUserArr = userArr.filter((user, idx) => {
            return user !== option
        })

        setval((val) => {
            val.name = ''
            val.email = ''
            val.password = ''
            val.profilePic = ''
            return val;
        })

        delete apiData['accountsPage'][`${option}`]
        localStorage.setItem('data', JSON.stringify(apiData))
        setUserArr(filterUserArr);
    }

    return (
        <>
            <div className='account-container'>

                <div style={{ width: '100%', padding: '2rem', backgroundColor: '#435c70' }}>
                    <h5>List of Accounts</h5>
                    <div className="form-group mb-3">
                        <label htmlFor="category">Accounts</label>
                        <select className="form-control" name='option' value={val?.option} onChange={onOptionChangeHandler}>
                            <option>Select User</option>
                            {Array.isArray(userArr) && userArr.map((user, idx) => {
                                return <option key={idx} value={user}>{user}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <div className="avatar">
                        <h5>Change Avatar</h5>
                        <div className='avtar-img-container'>
                            <img src={val?.profilePic ? val.profilePic : `https://templatemo.com/templates/templatemo_524_product_admin/img/avatar.png`} alt="Avtar" className='img-fluid mb-4' />
                            <span className='product-delete-link' title='delete' onClick={onDeleteBtnHandler}><i className="far fa-trash-alt product-delete-icon"></i></span>
                        </div>

                        <div>
                            <label htmlFor='profilePic' className="btn btn-block text-uppercase">Upload New Photo</label>
                            <input style={{ display: 'none' }} type="file" id='profilePic' accept="image/jpg,image/jpeg,image/png" name="profilePic" onChange={onChangeHandler}></input>
                        </div>
                    </div>

                    <div className="settings">
                        <h5>Account Settings</h5>
                        <form className='form'>
                            <div className="form-group">
                                <label htmlFor="name">Account Name</label>
                                <input value={val?.name} name="name" id='name' onChange={onChangeHandler} type="text" className="form-control validate" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Account Email</label>
                                <input value={val?.email} name="email" id='email' onChange={onChangeHandler} type="email" className="form-control validate" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input value={val?.password} name="password" id='password' onChange={onChangeHandler} type="password" className="form-control validate" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="repassword">Re-enter Password</label>
                                <input value={val?.repassword} name="repassword" id='repassword' onChange={onChangeHandler} type="password" className="form-control validate" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input value={val?.phone} name="phone" id='phone' onChange={onChangeHandler} type="tel" className="form-control validate" />
                            </div>
                            <div className="form-group">
                                <label>&nbsp;</label>
                                <button type="submit" onClick={updateProfileHandler} className="btn btn-block text-uppercase">
                                    Update Your Profile
                                </button>
                            </div>
                            <div style={{ width: '100%' }}>
                                <button onClick={deleteAccountHandler} className="btn mt-4 btn-block text-uppercase">Delete Your Account</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Accounts;