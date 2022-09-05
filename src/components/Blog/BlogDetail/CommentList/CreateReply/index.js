import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import { Toast } from '../../../../UI/SwalStyle'

import {
  useRepliesQuery,
  useCreateReplyMutation,
} from '../../../../../services/replyApi'
import { getReply } from '../../../../../slices/reply-slice'

const CreateReply = ({ commentId }) => {
  const { data } = useRepliesQuery()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const [createReply] = useCreateReplyMutation()

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleCancel = () => {
    setInputValue('')
    setOpen(!open)
  }

  useEffect(() => {
    dispatch(getReply(data))
  }, [data, dispatch])

  // 要傳送的物件
  const reply = {
    id: uuidv4(),
    reply_content: inputValue,
    //TODO: USER_ID 從 LOCAL STROAGE拿
    user_id: '1',
    reply_date: moment().format('YYYY-MM-DD h:mm:ss'),
    comment_id: commentId,
  }

  /**
   * 把回覆傳送給後端和更新 slice
   * @param {event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await setInputValue('')
      await createReply(reply)
      await Toast.fire({
        icon: 'success',
        title: '已送出回覆',
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-controls="comment-collapse"
        aria-expanded={open}
        className="rounded-2 border-0 bg-secondary text-white px-4 py-1 mb-3 d-none d-md-block ms-auto"
      >
        回覆留言
      </button>
      <Collapse in={open}>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              className=" bg-skin-bright"
              as="textarea"
              rows={4}
              value={inputValue}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-end gap-3 align-items-center my-4">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-2 border-0 bg-secondary text-white px-4 py-1 d-none d-md-block"
              >
                取消
              </button>
              <button
                type="submit"
                className="rounded-2 border-0 bg-secondary-dark text-white px-4 py-1 d-none d-md-block"
              >
                送出
              </button>
            </div>
          </Form.Group>
        </form>
      </Collapse>
    </>
  )
}

export default CreateReply
