import React, { memo, useEffect } from 'react'
import Banner from './components/banner'
import Info from './components/info'
import List from './components/list'
import Footer from './components/footer'
import { useStoreHook } from 'think-react-store'
import { useObserverHook } from '@/hooks'
import { CommonEnum } from '@/enums'
import { useLocation } from 'umi'

import './index.less'

export default memo(function House(props) {
  const { query } = useLocation()
  const { house: {
    detail, showLoading, getDetailAsync,
    getCommentsAsync, reloadComments, reloadCommentsNum,
    comments, resetData, order, hasOrderAsync, addOrderAsync, delOrderAsync
  } } = useStoreHook()

  const handleBtnClick = (id) => {
    if (!id) {
      addOrderAsync({
        id: query?.id
      })
    } else {
      delOrderAsync({
        id: query?.id  
      })
    }
  }

  // 获取详情
  useEffect(() => {
    getDetailAsync({
      id: query?.id
    })
  }, [])

  // 获取评论
  useEffect(() => {
    getCommentsAsync({
      id: query?.id
    })
  }, [reloadCommentsNum])

  // 获取是否有预定房屋
  useEffect(() => {
    hasOrderAsync({
      id: query?.id
    })
  }, [])

  // 页面返回的时候，重置数据，否则会沿用之前的数据
  useEffect(() => {
    return () => {
      resetData({
        detail: {}
      })
    }
  }, [])

  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    if (comments && comments.length && showLoading && entries[0].isIntersecting) {
      reloadComments()
    }
  }, [comments, showLoading])

  return (
    <div className="house-page">
      {/* banner */}
      <Banner banner={detail?.banner} />
      {/* 房屋信息 */}
      <Info detail={detail?.info} order={order} btnClick={handleBtnClick} />
      {/* 评论列表 */}
      <List lists={comments} showLoading={showLoading} />
      {/* footer */}
      <Footer />
    </div>
  )
})
