import React, { memo, useEffect } from 'react'
import { List } from 'antd-mobile'
import { history } from 'umi'
import { useStoreHook } from 'think-react-store';
import { Button } from 'antd-mobile';
import { ErrorBoundary } from '@/components';

import './index.less'

export default memo(function User(props) {
  const { user: { username, avatar, phone, sign, getUserAsync, logoutAsync } } = useStoreHook()
  const handleClick = () => {
    history.push({
      pathname: '/user/edit',
      query: {

      }
    })
  }
  const handleLogout = () => {
    logoutAsync()
  }

  useEffect(() => {
    getUserAsync({ id: 10 })
  }, [])

  return (
    <ErrorBoundary>
      <div className="user-page">
        {/* 用户信息 */}
        <div className="info">
          <div className="set" onClick={handleClick}>设置</div>
          <div className="user">
            <img src={avatar || require('../../assets/yay.jpg')} alt="" />
            <div className="phone">{phone}</div>
            <div className="sign">{sign}</div>
          </div>
        </div>
        {/* 列表 */}
        <div className="lists">
          <List>
            <List.Item arrow="horizontal">
              用户协议
            </List.Item>
            <List.Item arrow="horizontal">
              常见问题
            </List.Item>
            <List.Item arrow="horizontal">
              联系客服
            </List.Item>
          </List>
          <Button style={{ marginTop: '100px' }} onClick={handleLogout}>退出登录</Button>
        </div>
      </div>
    </ErrorBoundary>
  )
})
