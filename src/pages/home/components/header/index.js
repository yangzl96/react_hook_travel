import React, { memo, useState } from 'react'
import { Link } from 'umi'

export default memo(function Header() {
  const [username, setUsername] = useState(localStorage.getItem('username'))
  return (
    <div className="header">
      <div className="header_title">民宿</div>
      <div className="header_login">
        {
          username ? username :
            <><Link to="/login">登录</Link> | <Link to="/register">注册</Link></>
        }
      </div>
    </div>
  )
})
