import React, { memo } from 'react'
import Header from './components/header'
import Search from './components/search'
import Hot from './components/hot'
import { ErrorBoundary } from '@/components';
import { useHttpHook } from '@/hooks'
import './index.less'

export default memo(function index() {
  const [citys, citysLoading] = useHttpHook({
    url: '/commons/citys'
  })
  const [houses] = useHttpHook({
    url: '/house/hot'
  })
  return (
    <div className="home">
      <ErrorBoundary>
        <div className='home'>
          {/**header登录 */}
          <Header /> 
          {/**搜索 */}
          {citys && <Search citys={citys} citysLoading={citysLoading} />}
          {/**热门民宿 */}
          {houses && <Hot houses={houses} />}
        </div>
      </ErrorBoundary>
    </div>
  )
})
