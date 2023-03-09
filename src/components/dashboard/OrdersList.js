import React from 'react'
import './dashboard.css'
import { Scrollbars } from 'react-custom-scrollbars-2';


function OrderList(props) {
    return (
        <>

            <div className="container">
                <div className="box-title  p-3">
                    <h6 className="m-0 text-light h4">Orders List</h6>
                </div>
                <Scrollbars autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={400}>
                    <div>
                        <table className='table'>
                            <thead className='table_head'>
                                <tr>
                                    <th>ORDER NO.</th>
                                    <th>STATUS</th>
                                    <th>OPERATORS</th>
                                    <th>LOCATION</th>
                                    <th>DISTANCE</th>
                                    <th>START DATE</th>
                                    <th>EST DELIVERY DUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data && props.data.map((item, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <th><strong>#{item.orderNo}</strong></th>
                                            <td><div className={item.status === 'Moving' ? 'status-circle moving ' : item.status === 'Pending' ? 'status-circle pending' : item.status === 'Cancelled' ? 'status-circle cancelled' : item.status === 'Delivered' ? 'status-circle delivered' : ''} > </div>{item.status}</td>
                                            <td><strong>{item.operators}</strong></td>
                                            <td><strong>{item.location}</strong></td>
                                            <td><strong>{item.distance} km</strong></td>
                                            <td>{item.startDate}</td>
                                            <td>{item.deliveryDate}</td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </Scrollbars>
            </div>
        </>
    )
}

export default OrderList;