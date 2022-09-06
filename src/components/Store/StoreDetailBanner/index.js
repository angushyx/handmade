import React from 'react'
import storeBanner from '../../../assets/store_banner/store_pettery＿6.jpg'
import './StoreDetailBanner.scss'
import { useParams } from 'react-router-dom'
import { useGetStoreDetailQuery } from '../../../services/storeApi'

const StoreDetailBanner = () => {
  const { storeId } = useParams()
  // // console.log('banner', storeId)
  const { data } = useGetStoreDetailQuery(storeId)

  return (
    <>
      {data?.map((item) => {
        return (
          <div key={item.banner} className="store_detail_banner_imgBox mt-5">
            <img
              src={require(`../../../assets/store_banner/${item.banner}`)}
              alt=""
            />
            <h1 className="text-white text-center">{item.name}</h1>
          </div>
        )
      })}
    </>
  )
}

export default StoreDetailBanner
