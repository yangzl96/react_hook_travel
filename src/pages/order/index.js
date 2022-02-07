import React, { memo, useState, useEffect } from 'react'
import { Tabs } from 'antd-mobile'
import List from './components/list'
import { useHttpHook, useObserverHook } from '@/hooks'
import { CommonEnum } from '@/enums'
import { Http } from '@/utils'
import { isEmpty } from 'project-libs'
import { ErrorBoundary } from '@/components';

import './index.less'

export default memo(function Order() {
  const tabs = [
    {
      title: '未支付', sub: 0
    },
    {
      title: '已支付', sub: 1
    }
  ]
  const [page, setPage] = useState(CommonEnum.PAGE)
  const [showLoading, setShowLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [type, setType] = useState(0)
  // const [orders] = useHttpHook({
  //   url: '/order/lists',
  //   body: {
  //     ...page,
  //   }
  // })
  const invokeHttp = async (pageNum) => {
    const result = await Http({
      url: '/orders/lists',
      body: {
        ...page,
        pageNum,
        type
      }
    });
    return result;
  };

  const handleChange = (e) => {
    setType(e.sub)
    setPage(CommonEnum.PAGE)
    setOrders([])
    setShowLoading(true)
  }

  const fetchOrder = async (pageNum) => {
    const result = await invokeHttp(pageNum)
    if (!isEmpty(result) && result.length <= page.pageSize) {
      setOrders(result)
      setShowLoading(true)
    } else {
      setShowLoading(false)
    }
  }

  // 滚动加载
  useObserverHook('#' + CommonEnum.LOADING_ID, async (entries) => {
    if (entries[0].isIntersecting) {
      const result = await invokeHttp(page.pageNum + 1)
      if (!isEmpty(orders) && !isEmpty(result) && result.length === page.pageSize) {
        setOrders([...orders, ...result])
        setPage({
          ...page,
          pageNum: page.pageNum + 1
        })
        console.log(page.pageNum)
        setShowLoading(true)
      } else {
        setShowLoading(false)
      }
    }
  }, null)

  useEffect(() => {
    fetchOrder(1)
  }, [type])

  return (
    <ErrorBoundary>
      <div className="order-page">
        <Tabs tabs={tabs} onChange={handleChange}>
          <div className="tab">
            <List orders={orders} type={0} showLoading={showLoading} />
          </div>
          <div className="tab">
            <List orders={orders} type={1} showLoading={showLoading} />
          </div>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
})
