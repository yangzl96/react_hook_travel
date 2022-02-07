import React, { memo, useState } from 'react'
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile'
import { history } from 'umi'
import dayjs from 'dayjs'

export default memo(function Search(props) {
  const [selectedCity, setSelectedCity] = useState(['10001'])
  const [times, setTimes] = useState('可选时间')
  const [dateShow, setDateShow] = useState(false)
  const handleCityChange = (value) => {
    setSelectedCity(value)
  }
  const handleDate = () => {
    setDateShow(!dateShow)
  }
  const handleDateConfirm = (start, end) => {
    setDateShow(!dateShow)
    setTimes(dayjs(start).format('YYYY-MM-DD') + '~' + dayjs(end).format('YYYY-MM-DD'))
  }
  const handleClick = () => {
    if (times.includes('~')) {
      history.push({
        pathname: '/search',
        query: {
          code: selectedCity,
          startTime: times.split('~')[0],
          endTime: times.split('~')[1],
        }
      })
    } else {
      Toast.fail('请选择时间')
    }
  }
  return (
    <div className="search">
      {/* 可选城市 */}
      <div className="search-addr">
        {
          !props.citysLoading && <Picker
            title="城市"
            data={props.citys}
            value={selectedCity}
            cascade={false}
            cols={1}
            onChange={handleCityChange}
          >
            <List.Item>可选城市</List.Item>
          </Picker>
        }
      </div>
      {/* 可选时间 */}
      <div className="search-time" onClick={handleDate}>
        <p className="search-time_left">出租时间</p>
        <p className="search-time_right">{times}</p>
      </div>
      {/* 点击按钮 */}
      <Button type="warning" size="large" onClick={handleClick}>搜索民宿</Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={handleDateConfirm}
      />
    </div>
  )
})
