import React from 'react'
import './products.css'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ProductTable() {

    let apiData = JSON.parse(localStorage.getItem('data'))

    const [data, setData] = useState(apiData.productsPage.products);
    const [myArr, setMyArr] = useState(apiData.productsPage.categories);
    const [categoryName, setCategoryName] = useState('')

    // for table delete 
    const onClickHandler = (e, idx) => {
        const newData = data.filter((item, index) => index !== idx)
        setData(newData)
        apiData.productsPage.products = newData;
        localStorage.setItem('data', JSON.stringify(apiData))
    }

    // for category delete 
    const onCategoryDeleteHandler = (e, idx) => {
        const newData = myArr.filter((item, index) => index !== idx)
        setMyArr(newData)
        apiData.productsPage.categories = newData;
        localStorage.setItem('data', JSON.stringify(apiData))
    }

    // for filter table and delete  
    let newArr = [];
    const onchnageHandler = (e, idx) => {
        if (e.target.checked) {
            newArr.push(data[idx])
            // console.log(newArr)
        }
        if (!e.target.checked) {
            const findIndex = newArr.indexOf(data[idx])
            newArr.splice(findIndex, 1)
            // console.log(newArr)
        }
    }
    const checkboxDelete = () => {
        const filterArr = data.filter((element) => !newArr.includes(element));
        setData(filterArr)
        apiData.productsPage.products = filterArr;
        localStorage.setItem('data', JSON.stringify(apiData))
        newArr = [];
    }

    // for category add 
    const onCategoryAddHandler = (e) => {
        setCategoryName(e.target.value)
    }

    const addCategory = (e) => {
        e.preventDefault();
        if (categoryName !== '') {
            myArr.push(categoryName)
            apiData.productsPage.categories = myArr;
            localStorage.setItem('data', JSON.stringify(apiData))
            setCategoryName('')
        }
    }


    return (
        <div className="product_div m-5">
            {/* table section  */}
            <div style={{ padding: '3%', backgroundColor: '#435c70', width: '60%' }}>
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={480}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>PRODUCT NAME</th>
                                <th>UNIT SOLD</th>
                                <th>IN STOCK</th>
                                <th>EXPIRAY DATE</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody className='table_body'>
                            {data && data.map((item, idx) => (
                                <tr key={item.name + '' + idx}>
                                    <th><input type="checkbox" onChange={(e) => onchnageHandler(e, idx)} /></th>
                                    <td><strong>{item.name}</strong></td>
                                    <td><strong>{item.unitSold}</strong></td>
                                    <td><strong>{item.stock}</strong></td>
                                    <td>{item.expireDate}</td>
                                    <td><button className='myproduct-delete-link' onClick={(e) => onClickHandler(e, idx)}><i className="far fa-trash-alt myproduct-delete-icon"></i></button></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </Scrollbars>
                <div><Link className='btn btn-block text-uppercase mb-3 mt-3' to="/addproducts">ADD NEW PRODUCT</Link></div>
                <button className='btn btn-block text-uppercase' onClick={() => checkboxDelete()}>DELETE SELECTED PRODUCTS</button>
            </div>


            {/* category section  */}
            <div style={{ padding: '2%', backgroundColor: '#435c70', width: '30%', position: 'relative', right: '20px' }}>
                <h2 className='myheading'>Product Categories</h2>
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={480}>
                    <table className='table'>
                        <tbody>
                            {myArr.map((item, idx) => {
                                return (
                                    <tr key={item.name + '' + idx}>
                                        <td><strong>{item}</strong></td>
                                        <td><Link className='myproduct-delete-link' to="/products" onClick={(e) => onCategoryDeleteHandler(e, idx)}><i className="far fa-trash-alt myproduct-delete-icon"></i></Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Scrollbars>   

                {/* add category  */}
                <button type="button" className="btn btn-block text-uppercase mb-3 mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">ADD NEW CATEGORY</button>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Add Category</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form className="modal-body">
                                <div className="myform-group mb-3">
                                    <label htmlFor="name">Category Name</label>
                                    <input name="categoryName" value={categoryName} onChange={onCategoryAddHandler} type="text" className="form_control validate" required="" />
                                </div>
                            </form>
                            <div className="modal-footer">
                                <button type='submit' className="btn btn-block text-uppercase mb-3 mt-3" onClick={addCategory} data-bs-dismiss="modal">submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ProductTable;