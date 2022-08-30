import { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import productApi from '../apis/productApi'
import Filter from '../components/Products/Filter/Filter'
import ProductCard from '../components/Products/ProductCard/ProductCard'

function Proudcts() {
  const [products, setProducts] = useState([])

  const fetchProduct = async () => {
    const response = await productApi.get('/api/product')
    // console.log(response.data)
    setProducts(response.data)
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <Container fluid className="m-3 mx-auto ">
      <Row>
        <Col lg={4} xl={3}>
          <Filter></Filter>
        </Col>
        <Col>
          <div className='d-flex justify-content-center'>
            <Row className="product_list gap-6">
              {products?.map((v, i) => {
                return (
                  <ProductCard
                    key={v.id}
                    productId={v.id}
                    imgs={v.img_name}
                    category={v.category_en_name}
                    storeName={v.store_name}
                    name={v.name}
                    price={v.price}
                    isFavorite={false}
                  />
                )
              })}
            </Row>
          </div>

          {/* <div className="d-flex flex-wrap  justify-content-start gap-5">
            {products?.map((v, i) => {              
              return (
                <ProductCard
                  key={v.id}
                  productId={v.id}
                  imgs={v.img_name}
                  category={v.category_en_name}
                  storeName={v.store_name}
                  name={v.name}
                  price={v.price}
                  isFavorite={false}
                />
              )
            })}
          </div> */}
        </Col>
      </Row>
    </Container>
  )
}

export default Proudcts
