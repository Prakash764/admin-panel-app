import React from 'react'
import './dashboard.css'
import { Scrollbars } from 'react-custom-scrollbars-2';


function Notification(props) {

    return (
        <>

            <div className="container">
                <div className="box-title  p-3">
                    <h6 className="m-0 text-light h4">Recent</h6>
                </div>
                <Scrollbars autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={500}>
                    {props.data && props.data.map((item, idx) => {
                        return (
                            <div className="box-body p-0" key={idx}>
                                <div className="p-3 d-flex border-none">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src={item.pic} alt="img" />
                                    </div>
                                    <div>
                                        <p className="m-0 text-light h6">{item.message}</p>
                                        {/* <p className="m-0 text-light h6"><strong>Jessica</strong> and <strong>6 others</strong> sent you new <a href="/" className="notification-link">product updates</a>. Check new orders.</p> */}
                                        <p className=" small text-light m-0" style={{ opacity: '0.7' }}>{item.time} ago.</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </Scrollbars>
            </div>

        </>
    )
}

export default Notification;