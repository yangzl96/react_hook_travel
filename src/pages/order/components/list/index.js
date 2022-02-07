import React, { memo, useState, useEffect } from 'react'
import { isEmpty } from 'project-libs'
import Item from '../item'
import { ShowLoading } from '@/components'
import { OrderSkeletons } from '@/skeletons'

export default memo(function List(props) {
  const [state, setState] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (isEmpty(props?.orders)) {
        setState(true)
      }
    }, 1500)
  }, [])
  return (
    <div>
      {
        isEmpty(props?.orders) ?
          <>{state ? <ShowLoading showLoading={false} /> : <OrderSkeletons />}</> :
          <div className="tab-lists">
            {
              props.orders.map(item => (
                <Item type={props.type} key={item.id} {...item} />
              ))
            }
            <ShowLoading showLoading={props.showLoading} />
          </div>
      }
    </div>
  )
})
