import React, { useEffect } from 'react'
import './dashboard.css'
import LatestHits from './LatestHits';
import Notification from './Notification';
import OrderList from './OrdersList';
import Performance from './Performance';
import StorageInfo from './StorageInfo';

function Dashboard() {
    const data = JSON.parse(localStorage.getItem('data'))
   
    //useEffect for page should always start from the top 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <>
            <center><p className=" text-white d-flex align-items-start h6 mx-5 mt-5 mb-4">Welcome back, <strong>Admin</strong></p>
            <div className='section_container'>
                <section className='section mt-4'><LatestHits data={data.dasbhoardPage.latestHits}/></section>
                <section className='section mt-4'><Performance data={data.dasbhoardPage.performance}/></section>
                <section className='section mt-4'><StorageInfo data={data.dasbhoardPage.storage} /></section>
                <section className='section mt-4'><Notification data={data.dasbhoardPage.notifications}/></section>
                <section className='tableSection mt-4'><OrderList data={data.dasbhoardPage.orders}/></section>
            </div>
            </center>
        </>
    )
}
export default Dashboard;