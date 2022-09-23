import NewsBanner from './NewsBanner'
import NewsDetails from './NewsDetails'
import NewsCoupon from './NewsCoupon'
import NewsCard from './NewsCard'
import { React, useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useGetProductListQuery } from '../../services/productApi'
import { Container } from 'react-bootstrap'

const News = () => {
  const [card, setCard] = useState()
  const { data } = useGetProductListQuery()
  // const dispatch = useDispatch()
  let newData = []

  useEffect(() => {
    if (data) {
      newData = [...data]?.sort(() => 0.5 - Math.random())
      setCard(newData)
    }
  }, [data])

  return (
    <>
      <NewsBanner />
      <NewsDetails />
      <NewsCoupon />
      <Container className="news_card mb-12 w-100 d-flex">
        {card?.map((v, i) => {
          if (i < 4) {
            return (
              <NewsCard
                key={'abc' + v.id}
                productId={v.id}
                storeId={v.store_id}
                categoryId={v.category_id}
                imgs={v.img_name}
                category={v.category_en_name}
                storeName={v.store_name}
                name={v.name}
                price={v.price}
                isFavorite={v.isFavorite}
                amount={v.amount}
              />
            )
          }
        })}
      </Container>
    </>
  )
}

export default News
