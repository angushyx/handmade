import '../User.scss'
import React from 'react'
import { Row, Col, Form, Table, Container } from 'react-bootstrap'
import UserPassword from '../UserPassword'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const UserAccount = ({ account, name, email, phone, birthday, address }) => {
  console.log(
    'account, name, email, phone, birthday, address',
    account,
    name,
    email,
    phone,
    birthday,
    address
  )
  const transformBirthday = moment(birthday).format('YYYY/MM/DD')
  const [showUserPassword, setShowUserPassword] = useState(false)
  const [showUserAccount, setShowUserAccount] = useState(true)
  const [startDate, setStartDate] = useState(new Date())

  return (
    <>
      <Col>
        <div className="user_account_from mt-8">
          <h5 className="user_account_title fw-bold">帳號設定</h5>
          <Form.Group className="my-3">
            <Table className="d-flex user_account_table">
              <thead>
                <tr>
                  <th className="user_account_header text-end pe-8">帳號</th>
                </tr>
                <tr>
                  <th className="user_account_header text-end pe-8">密碼</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="user_account_text">{account}</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className="user_account_btn fw-bold"
                      onClick={() => {
                        setShowUserPassword(true)
                      }}
                    >
                      修改密碼
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form.Group>
          {showUserPassword && (
            <UserPassword closeUserPassword={setShowUserPassword} />
          )}
          <div>
            <h5 className="user_account_title fw-bold">
              會員資料
              <FontAwesomeIcon
                className="user_account_edit_show"
                icon="fa-solid fa-pen-to-square"
                size="sm"
                onClick={() => {
                  setShowUserAccount(false)
                }}
              />
            </h5>
          </div>
          <Form.Group className="user_account_form">
            <Table className="d-flex user_account_table">
              <thead>
                <tr>
                  <th className="user_account_header text-end pe-8 p-3">
                    姓名
                  </th>
                </tr>
                <tr>
                  <th className="user_account_header text-end pe-8 p-3">
                    生日
                  </th>
                </tr>
                <tr>
                  <th className="user_account_header text-end pe-8 p-3">
                    電話
                  </th>
                </tr>
                <tr>
                  <th className="user_account_header text-end pe-8 p-3">
                    聯絡地址
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {showUserAccount ? (
                    <td className="user_account_text py-3">{name}</td>
                  ) : (
                    <td>
                      <Form.Control
                        className="user_account_input"
                        type="name"
                        // placeholder="Enter name"
                      />
                    </td>
                  )}
                </tr>
                <tr>
                  {showUserAccount ? (
                    <td className="user_account_text py-3">
                      {transformBirthday}
                    </td>
                  ) : (
                    <td>
                      <DatePicker
                        className="user_account_inputBirth"
                        dateFormat="yyyy/MM/dd"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      {/* <DatePicker
                    // selected={date}
                    onSelect={handleDateSelect} 
                    onChange={handleDateChange}  
                    changed
                  /> */}
                    </td>
                  )}
                </tr>
                <tr>
                  {showUserAccount ? (
                    <td className="user_account_text py-3">{phone}</td>
                  ) : (
                    <td>
                      <Form.Control
                        className="user_account_input"
                        type="phone"
                        // placeholder="Enter phone"
                      />
                    </td>
                  )}
                </tr>
                <tr>
                  {showUserAccount ? (
                    <td className="user_account_text py-3">{address}</td>
                  ) : (
                    <td>
                      <Form.Control
                        className="user_account_input"
                        type="address"
                        // placeholder="Enter address"
                      />
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
            {showUserAccount ? (
              ''
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <button
                  onClick={() => setShowUserAccount(true)}
                  className="fw-bold user_account_editCheck_btn me-5"
                  type="submit"
                >
                  取消
                </button>
                <button
                  className="fw-bold user_account_editCheck_btn"
                  type="submit"
                >
                  確認
                </button>
              </div>
            )}
          </Form.Group>
        </div>
      </Col>
    </>
  )
}
export default UserAccount