import React, { memo, useState } from 'react'
import { history } from 'umi'

export default memo(function Hot(props) {
  const handleClick = (id) => {
    history.push({
      pathname: '/house',
      query: {
        id
      }
    })
  }
  return (
    <div className="hot">
      <h1>最热民宿</h1>
      <div className="hot-lists">
        {
          props?.houses?.map(item => (
            <div className="hot-lists-item" key={item.id} onClick={() => handleClick(item.id)}>
              <img className="img" src={item?.imgs[0]?.url} alt="" />
              <div className="title">{item.title}</div>
              <div className="info">{item.info}</div>
              <div className="price">￥{item.price}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
})
