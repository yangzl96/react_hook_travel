import React, { memo, useState, useEffect } from 'react'
import { SearchBar, ActivityIndicator } from 'antd-mobile'
import { useLocation } from 'umi';

import { useHttpHook, useObserverHook, useImgHook } from '@/hooks'
import { ShowLoading } from '@/components'
import { CommonEnum } from '@/enums';

import './index.less'

export default memo(function Search(props) {
  const { query } = useLocation()
  const [houseName, setHouseName] = useState('')
  const [houseSubmitName, setHouseSubmitName] = useState('')
  const [houseList, setHouseList] = useState([])
  const [showLoading, setShowLoading] = useState(true)
  const [page, setPage] = useState(CommonEnum.PAGE)
  // 获取数据
  const [houses, loading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59',
    },
    // 监听pageNum的改变 触发请求
    // houseSubmitName: 如果刚进来就做搜索，那么page.pageNum是不会变的
    // 那么就不会自动更新查询，所以这个字段也要被观测
    watch: [page.pageNum, houseSubmitName]
  })
  /**
   * 1.监听loading是否展示出来
   * 2.修改分页数据
   * 3.监听分页数据的修改，发送接口
   * 4.监听Loading的变化，拼装数据
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    if (!loading && entries[0].isIntersecting) { // loading 在可视区的时候 就触发
      setPage({
        ...page,
        pageNum: page.pageNum + 1
      })
    }
  }, null)

  // 图片懒加载
  useImgHook('.img-item', (entries) => { }, null)

  // 搜索
  const handleChange = (value) => {
    setHouseName(value)
  }
  const _handleSubmit = (value) => {
    setHouseName(value)
    setHouseSubmitName(value)
    setPage(CommonEnum.PAGE);
    setHouseList([])
  }
  const handleCancel = () => {
    _handleSubmit('')
  }
  const handleSubmit = (value) => {
    _handleSubmit(value)
  }

  useEffect(() => {
    if (!loading && houses) {
      if (houses.length) {
        setHouseList([...houseList, ...houses])
        // 如果返回的数据小于pageSize的时候
        if (houses.length > page.pageSize) {
          setShowLoading(false)
        }
      } else {
        setShowLoading(false)
      }
    }
  }, [loading])

  return (
    <div className="search-page">
      {/* 顶部所搜索栏 */}
      <SearchBar
        placeholder="搜索民宿"
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
      {/* 搜索结果 */}
      {!houseList.length
        ? <ActivityIndicator toast />
        : <div className="result">
          {
            houseList.map(item => (
              <div className="item" key={item.id}>
                <img src={require('../../assets/blank.png')} alt="" data-src={item?.imgs[0]?.url} className="img-item" />
                <div className="item-right">
                  <div className="title">{item.name}</div>
                  <div className="price">{item.price}</div>
                </div>
              </div>
            ))
          }
          <ShowLoading showLoading={showLoading} />
        </div>
      }
    </div>
  )
})
