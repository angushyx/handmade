import { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useGetStoreQuery } from '../../services/storeApi'
import { addFilterStore } from '../../slices/filterStore-silce'
import FilterKeyword from './FilterKeyword'
import FilterPrice from './FilterPrice'
import FilterStore from './FilterStore/FilterStore'

function Filter() {
  const { data, error, isload } = useGetStoreQuery()
  const dispatch = useDispatch()
  const getNewData = () => {
    const result = []
    let obj = {}
    // console.log('obj', !!obj)
    for (let item of data) {
      if (Object.keys(obj).length === 0) {
        obj['id'] = item.category_en_name
        obj['category'] = item.category_name
        obj['active'] = false
        obj['checked'] = false
        obj['innerList'] = [
          {
            id: item.id,
            completed: false,
            title: item.name,
          },
        ]
        // console.log('first')
        continue
      }
      if (obj.category === item.category_name) {
        obj.innerList.push({
          id: item.id,
          completed: false,
          title: item.name,
        })
      } else {
        result.push({ ...obj })
        obj = {}
      }
      // result.push({ ...obj })
      // console.log('obj', obj)
      // console.log('obj', Object.keys(obj))
    }
    // console.log('getNewData', result)
    return result
  }
  useEffect(() => {
    let newData = []
    if (Object.keys(data ?? {}).length !== 0) {
      newData = getNewData()
    }
    console.log('add data')
    dispatch(addFilterStore(newData))
  }, [dispatch, data])

  const state = useSelector((state) => state.filterStoreReducer.list)
  const [showFilterStore, setShowFilterStore] = useState(false)
  const [showFilterOther, setShowFilterOther] = useState(false)

  const toggleShowFilterStore = () => setShowFilterStore(!showFilterStore)
  const toggleShowFilterOther = () => setShowFilterOther(!showFilterOther)
  return (
    <>
      <FilterKeyword />
      <FilterStore state={state} className="d-none d-md-block" />
      <FilterPrice className="d-none d-md-block" />
      <div className="d-flex justify-content-around">
        <Button
          onClick={toggleShowFilterStore}
          className="text-white filter-store-btn rounded-5 px-3 fw-bold letter-spacing-2"
        >
          商品類別
        </Button>
        <Button
          onClick={toggleShowFilterOther}
          className="text-white filter-store-btn rounded-5 px-3 fw-bold letter-spacing-2 bg-gray-dark border-0"
        >
          更多條件
        </Button>
        <Button
          onClick={toggleShowFilterOther}
          className="text-gray-dark filter-store-btn rounded-5 px-3 fw-bold letter-spacing-2 bg-transparent border-0"
        >
          排序
        </Button>
      </div>
      <Modal
        show={showFilterStore}
        onHide={toggleShowFilterStore}
        dialogClassName="modal-100w"
      >
        <ModalHeader closeButton>
          <ModalTitle></ModalTitle>
        </ModalHeader>
        <ModalBody>
          <FilterStore state={state} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      <Modal
        show={showFilterOther}
        onHide={toggleShowFilterOther}
        dialogClassName="modal-auto-h"
      >
        <ModalHeader closeButton></ModalHeader>
        <ModalBody>
          <ModalTitle className="filter_title text-center text-gray-darker">
            更多條件
          </ModalTitle>
          <FilterPrice />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}
export default Filter
