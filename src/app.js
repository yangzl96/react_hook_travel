import { history } from 'umi'
// 在路由切换以及初始化的时候会执行
export function onRouteChange(route) {
  // 找到与当前路径对应的routes配置项
  const nowPath = route.routes[0].routes.filter(item => item.path === route.location.pathname)
  // const isLogin = cookie.get('user')
  const isLogin = localStorage.getItem('token')
  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    history.push({
      pathname: '/login',
      query: {
        // 存住来时的目标路径
        from: route.location.pathname
      }
    })
  }
}