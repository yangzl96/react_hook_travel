import React, { memo, useState } from 'react'
import AwesomeSwiper from 'react-awesome-swiper'

export default memo(function Banner(props) {
  const [config, setConfig] = useState({
    loop: true,
    autoplay: {
      delay: 1500
    },
    pagination: {
      el: '.swiper-pagination'
    }
  })
  return (
    <AwesomeSwiper className="banner" config={config}>
      <div className="swiper-wrapper">
        {
          props?.banner?.map(item => (
            <div className="swiper-slide" key={item}>
              <img src={item?.url} alt="" />
            </div>
          ))
        }
      </div>
      <div className="swiper-pagination"></div>
    </AwesomeSwiper>
  )
})
