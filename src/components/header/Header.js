import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'


function Header(props) {

    const { isloggedIn, setIsLoggedIn } = props
    const currentClass = document.getElementsByClassName("nav-item");

    const onLoggedinHandler = () => {
        localStorage.removeItem('userName')
        localStorage.removeItem('password')
        setIsLoggedIn(false);
        for (let ele of currentClass) {
            ele.classList.remove("active")
        }
    }

    const onClickActive = (e) => {
        if (isloggedIn) {
            for (let i = 0; i < currentClass.length; i++) {
                if (e.target.parentNode.id === currentClass[i].id) {
                    for (let item of currentClass) {
                        item.classList.remove("active")
                    }
                    currentClass[i].classList.add("active");
                }
            }
        }
    }

    return (
        <>
            <header className="d-flex justify-content-around header">
                <Link to="#" className="d-flex align-items-center mb-3 text-dark text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"></svg>
                    <span className="fs-4">PRODUCT ADMIN</span>
                </Link>

                <ul className="nav nav-pills list" >
                    <li id='1' className={`nav-item py-3 ${isloggedIn ? "active" : ""}`} onClick={onClickActive}>
                        <Link id='1' to="/dashboard" className="nav-link" aria-current="page">
                            <i id='1' className="fas fa-2x fa-tachometer-alt"></i>
                            <div>Dashboard</div>
                        </Link>
                    </li>
                    <li id='2' className="nav-item py-3" onClick={onClickActive}>
                        <Link id='2' to="/products" className="nav-link">
                            <i id='2' className="fa-solid fa-2x fa-cart-shopping"></i>
                            <div>Products</div>
                        </Link>
                    </li>
                    <li id='3' className="nav-item py-3" onClick={onClickActive}>
                        <Link id='3' to="/accounts" className="nav-link ">
                            <i id='3' className="fa-solid fa-2x fa-user"></i>
                            <div>Accounts</div>
                        </Link>
                    </li>
                </ul>

                {isloggedIn &&
                    <ul className="navbar-nav logout list">
                        <li onClick={() => onLoggedinHandler()}>
                            <Link className="nav-link d-block align-middle" to="/">
                                Admin, <b>Logout</b>
                            </Link>
                        </li>
                    </ul>}
            </header>
        </>
    )
}
export default Header;