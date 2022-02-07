import React, { memo, useState } from 'react'
import { TextareaItem, Button, Toast } from 'antd-mobile'
import { useStoreHook } from 'think-react-store'
import { useLocation } from 'umi'
import { Modal } from '@/components'

export default memo(function Footer() {
  const { query } = useLocation()
  const { house: { addCommentsAsync } } = useStoreHook()
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState('')
  const handleClick = () => {
    setShow(true)
  }
  const handleChange = (value) => {
    setComment(value)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleSubmit = () => {
    if (comment) {
      handleClose()
      addCommentsAsync({
        comment,
        houseId: query?.id
      })
    } else {
      Toast.fail('请输入内容')
    }
  }

  return (
    <>
      <div className="footer" onClick={handleClick}>
        评论~
      </div>
      <Modal
        show={show}
        styleBody={{
          height: '220px',
          bottom: '0px',
          top: 'unset'
        }}
        onClose={handleClose}
      >
        <div className="modal-comment">
          <TextareaItem
            rows={2}
            count={200}
            onChange={handleChange}
          />
          <Button className="comment-btn" type="warning" onClick={handleSubmit}>评论</Button>
        </div>
      </Modal>
    </>
  )
})
