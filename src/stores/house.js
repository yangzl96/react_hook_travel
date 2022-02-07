import { Http } from '@/utils'
import { CommonEnum } from '@/enums'

async function handleOrder(url, dispatch, payload) {
  console.log(url)
  const result = await Http({
    url,
    body: payload
  })
  dispatch({
    type: 'setOrder',
    payload: result
  })
}

export default {
  state: {
    detail: {},
    comments: [],
    page: CommonEnum.PAGE,
    showLoading: true,
    reloadCommentsNum: 0,
    order: null
  },
  // 同步方法
  reducers: {
    setOrder(state, payload) {
      return {
        ...state,
        order: payload
      }
    },
    getDetail(state, payload) {
      return {
        ...state,
        detail: payload
      }
    },
    getComments(state, payload) {
      return {
        ...state,
        comments: payload
      }
    },
    setShowLoading(state, payload) {
      return {
        ...state,
        showLoading: payload
      }
    },
    reloadComments(state, payload) {
      return {
        ...state,
        reloadCommentsNum: state.reloadCommentsNum + 1,
        page: {
          ...CommonEnum.PAGE,
          pageNum: state.page.pageNum + 1
        }
      }
    },
    // 重置数据
    resetData(state, payload) {
      return {
        ...state,
        // detail: {},
        comments: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: 0,
        ...payload
      }
    }
  },
  // 异步方法
  effects: {
    // 当前用户是否已经预定了房屋
    async hasOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/hasOrder', dispatch, payload)
    },
    // 添加订单
    async addOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/addOrder', dispatch, payload)
    },
    // 删除订单
    async delOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/delOrder', dispatch, payload)
    },
    // 获取房屋详情
    async getDetailAsync(dispatch, rootState, payload) {
      const detail = await Http({
        url: '/house/detail',
        body: payload
      })
      dispatch({
        type: 'getDetail',
        payload: detail
      })
    },
    // 获取评论
    async getCommentsAsync(dispatch, rootState, payload) {
      const { comments, page } = rootState.house
      const lists = await Http({
        url: '/comment/lists',
        body: {
          ...payload,
          pageSize: page.pageSize,
          pageNum: page.pageNum
        }
      })
      dispatch({
        type: 'getComments',
        payload: [...comments, ...lists]
      })
      dispatch({
        type: 'setShowLoading',
        payload: lists.length ? true : false
      })
    },
    // 添加评论
    async addCommentsAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/comment/add',
        body: payload
      })
      if (result) {
        dispatch({
          type: 'resetData',
          payload: {}
        })
      }
    }
  }
}