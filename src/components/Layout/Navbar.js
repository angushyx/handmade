import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../src/assets/HANDMADE_LOGO.png'
import './Navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { cartToggle } from '../../slices/cart-ui-slice'
import { CourseCartToggle } from '../../slices/courseCart-slice'
import { ProductCartToggle } from '../../slices/productCart-slice'
import { getProductTotal } from '../../slices/productCart-slice'
import { getCourseTotal } from '../../slices/courseCart-slice'
import { useGetUserQuery } from '../../services/userApi'

const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem('user'))
  const id = JSON.parse(localStorage.getItem('user'))?.user.id
  //TODO:LOACL 裡面一開始沒東西不能用這ㄍ ID
  const { data } = useGetUserQuery(id)
  const authReducers = useSelector((state) => state.authReducers)

  const isLogin = authReducers.isLogin

  const courseCartQuantity = useSelector(
    (state) => state.courseCartReducer.totalQuantity
  )

  const productCartQuantity = useSelector(
    (state) => state.productCartReducer.totalQuantity
  )

  const cartTotalQuantity =
    Number(productCartQuantity) + Number(courseCartQuantity)

  console.log('datadata', data)

  const dispatch = useDispatch()
  const toggleCart = () => {
    dispatch(cartToggle())
    dispatch(ProductCartToggle())
    dispatch(CourseCartToggle())
  }

  const navRef = useRef(null)
  const menuRef = useRef(null)
  const toggleMenu = () => {
    menuRef.current.classList.toggle('navbar_showMenu')
    navRef.current.classList.toggle('click')
  }

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 152 ||
      document.documentElement.scrollTop > 152
    ) {
      navRef.current.classList.add('navbar_shrink')
    } else {
      navRef.current.classList.remove('navbar_shrink')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollFunction)
    return () => window.removeEventListener('scroll', scrollFunction)
  }, [])

  useEffect(() => {
    dispatch(getProductTotal())
  }, [courseCartQuantity, dispatch])

  useEffect(() => {
    dispatch(getCourseTotal())
  }, [productCartQuantity, dispatch])

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className="d-flex align-items-center">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>

          <p className="ms-3 mt-9">Handmade is Heartmade</p>
        </div>
        <div>
          <div className="d-flex justify-content-end align-items-center mt-3">
            <span onClick={toggleCart} className="navbar_cartIcon">
              <FontAwesomeIcon
                icon="fa-solid fa-cart-shopping"
                size="xl"
                className="mx-3 navbar_awesomeIcon"
                fixedWidth
              />
              {cartTotalQuantity > 0 ? (
                <span className="navbar_cartBadge d-flex justify-content-center align-items-center">
                  {cartTotalQuantity}
                </span>
              ) : (
                ''
              )}
            </span>

            {isLogin || userData ? (
              <>
                <Link to="/user/management">
                  {data?.map((v) => {
                    console.log(v.avatar)
                    return (
                      <div key={v.id} className="avatar">
                        <img
                          src={v.avatar}
                          className="rounded-circle avatar"
                          alt="user img"
                        />
                      </div>
                    )
                  })}
                </Link>
              </>
            ) : (
              <Link to="login" className="navbar_user">
                <FontAwesomeIcon
                  icon="fa-solid fa-user"
                  size="xl"
                  className="mx-3 navbar_awesomeIcon"
                  fixedWidth
                />
              </Link>
            )}

            <span className="navbar_bars" onClick={toggleMenu}>
              <FontAwesomeIcon
                icon="fa-solid fa-bars"
                size="xl"
                className="navbar_awesomeIcon"
                fixedWidth
              />
            </span>
          </div>

          <ul className="list-unstyled navbar_list me-3 mt-5" ref={menuRef}>
            <span className="navbar_mobileX" onClick={toggleMenu}>
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                size="xl"
                className=" ms-2 me-3 navbar_awesomeIcon"
                fixedWidth
              />
            </span>

            <li onClick={toggleMenu}>
              <Link to="/" className="navbar_link">
                HOME
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <a href="/store" className="navbar_link">
                STORE
              </a>
            </li>
            <li onClick={toggleMenu}>
              <a href="/course" className="navbar_link">
                COURSE
              </a>
            </li>
            <li onClick={toggleMenu}>
              <a href="/shop" className="navbar_link">
                SHOP
              </a>
            </li>
            <li onClick={toggleMenu}>
              <Link to="map" className="navbar_link">
                MAP
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="blog" className="navbar_link">
                BLOG
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="about" className="navbar_link">
                ABOUT
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
