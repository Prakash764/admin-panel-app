import React from 'react'
import { useState, useEffect } from 'react';
import './addproduct.css'
import { useNavigate } from 'react-router-dom';



export default function AddProduct() {
  const navigate = useNavigate();
  let apiData = JSON.parse(localStorage.getItem('data'))

  const [item, setItem] = useState({
    name: '',
    description: '',
    category: '',
    expireDate: '',
    stock: '',
    unitSold: '00',
    productImg: '',
  })

  //useEffect for page should always start from the top 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeHandler = (e) => {
    let { name, value } = e.target
    if (name === 'productImg') {
      let img = window.URL.createObjectURL(e.target.files[0]) //img update
      value = img;
    }
    const newObj = { ...item, [name]: value }
    setItem(newObj)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (item.name !== '' && item.description !== '' && item.expireDate !== '' && item.stock !== '' && item.unit !== '') {
      apiData.productsPage.products.push(item)
      localStorage.setItem('data', JSON.stringify(apiData))
      navigate('/Products')
    }
  }

  return (
    <>
      <div className='add-product-container'>
        <div><h5>Add product</h5></div>

        <div className='section-container'>

          {/* left section  */}
          <section className='left-section'>

            <form className='myform'>

              <div className="myform-group mb-3">
                <label htmlFor="productName">Product Name</label>
                <input name="name" value={item.name} type="text" className="form-control validate" required="" onChange={onChangeHandler} />
              </div>

              <div className="myform-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea name="description" value={item.description} className="form-control validate" rows="3" style={{ height: '110px' }} required="" onChange={onChangeHandler}></textarea>
              </div>

              <div className="myform-group mb-3">
                <label htmlFor="category">Category</label>
                <select name="category" className="form-control" value={item.category} onChange={onChangeHandler}>
                  <option value=''>Select category</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Most Popular">Most Popular</option>
                  <option value="Trending">Trending</option>
                </select>
              </div>

              <div className="date-stock">

                <div className="myform-group mb-3 ">
                  <label htmlFor="expire_date">Expire Date</label>
                  <input name="expireDate" value={item.expireDate} onChange={onChangeHandler} type="date" className="form-control validate hasDatepicker" data-large-mode="true" />
                </div>

                <div className="myform-group mb-3 ">
                  <label htmlFor="stock">Units In Stock</label>
                  <input name="stock" value={item.stock} type="text" className="form-control validate" required="" onChange={onChangeHandler} />
                </div>

              </div>

            </form>
          </section>

          {/* right section  */}
          <section className='right-section'>
            <div className='img-logo'>
              <img src={item.productImg} alt="" className='img-fluid mb-4' />
              <label htmlFor="logo"><i className="fas fa-cloud-upload-alt upload-icon"></i></label>
              <input style={{ display: 'none' }}  type="file" id='logo' accept="image/*" name="productImg" onChange={onChangeHandler}></input>
            </div>
            <div className='input_btn_container'>
              <label htmlFor='profilePic' className="btn mt-3 btn-block text-uppercase">UPLOAD PRODUCT IMAGE</label>
              <input style={{ display: 'none' }} type="file" id='profilePic' accept="image/*" name="productImg" onChange={onChangeHandler}></input>
            </div>
          </section>

        </div>
        <button type="submit" className="btn btn-block text-uppercase" onClick={onSubmitHandler}>Add Product Now</button>
      </div>
    </>
  )
}