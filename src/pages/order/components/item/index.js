import React, { memo } from 'react'
import { Button, Toast } from 'antd-mobile'
import { Http, timer } from '@/utils'

export default memo(function Item(props) {
  const handlePay = async () => {
    const result = await Http({
      url: '/orders/pay',
      body: {
        id: props.id
      }
    }) 
    if (result) {
      Toast.success('支付成功')
      window.location.reload()
    }
  }
  const renderPay = () => {
    switch (props.type) {
      case 0:
        return <Button type="warning" size="small" onClick={handlePay}>去支付</Button>
      case 1:
        return <Button size="small">已完成</Button>
      default:
        break;
    }
  }
  return (
    <div className="order-item">
      <img src={props?.house?.imgs[0].url} alt="" />
      <div className="center">
        <div className="title">{props?.house?.title}</div>
        <div className="price">{props?.house?.price}</div>
        <div className="time">{timer(props?.house?.createTime, 'day')}</div>
      </div>
      <div className="pay">
        {renderPay()}
      </div>
    </div>
  )
})
