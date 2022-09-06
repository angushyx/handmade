import React from 'react'
import { Link } from 'react-router-dom'
import './Login_SignUp_img/ResetPassword.css'

const ResetPassword = () => {
  return (
    <>
      <div className="ResetPasswordFrame">
        <div className="border d-flex justify-content-center">
          <img
            className="ResetPasswordPic"
            src={require('./Login_SignUp_img/login_pic_工作區域_3_1.png')}
            alt=""
          />
          <form action="" className="ResetPasswordForm ">
            <h1 className="ResetPasswordTitle text-center">設置新密碼</h1>
            <input
              className="ResetPasswordInput"
              type="password"
              name="ResetPasswordInput"
              placeholder="新密碼"
            />
            <br />
            <input
              className="ResetPasswordInputSecond"
              type="password"
              name="ResetPasswordInputSecond"
              placeholder="確認新密碼"
            />
            <br />

            <button
              type="button"
              value="submit"
              className="ResetPasswordSubmit"
            >
              送出
            </button>
            <br />
          </form>
          {/* <Link className="text-primary btn" to="/blog">
          會員登入
        </Link> */}
        </div>
      </div>
    </>
  )
}

export default ResetPassword
