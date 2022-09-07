import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Paginate.scss'
import {
  changePage,
  nextPage,
  prePage,
} from '../../slices/filterPagination-slice'

// function renderages(totalPage, currentPage) {
//   const result = []
//   for (let i = 1; i <= totalPage; i++) {
//     result.push(
//       <li>
//         <Link
//           to={'#'}
//           className={`fw-bold px-2 py-1 rounded ${
//             currentPage === i ? 'bg-primary text-white' : 'page_number'
//           }`}

//         >
//           {i}
//         </Link>
//       </li>
//     )
//   }
//   return result
// }

function Paginate() {
  const paginate = useSelector((state) => state.paginationReducer)
  // console.log('paginate', paginate)
  const { totalPage, currentPage } = paginate
  const dispatch = useDispatch()

  const renderPages = (totalPage, currentPage) => {
    const result = []
    for (let i = 1; i <= totalPage; i++) {
      result.push(i)
    }
    return result
  }
  // console.log(totalPage)

  if (totalPage === 1) return
  return (
    <ul className=" d-flex justify-content-center gap-2 list-unstyled text-center">
      <li
        onClick={() => {
          dispatch(prePage())
        }}
      >
        <Link className="page_number px-2 py-1 rounded" to={'#'}>
          <FontAwesomeIcon icon="fa-solid fa-caret-left" />
        </Link>
      </li>
      {renderPages(totalPage, currentPage)?.map((pageNumber) => {
        return (
          <li key={pageNumber}>
            <Link
              to={'#'}
              className={`fw-bold px-2 py-1 rounded ${
                currentPage === pageNumber
                  ? 'bg-primary text-white'
                  : 'page_number'
              }`}
              onClick={() => {
                dispatch(changePage(pageNumber))
              }}
            >
              {pageNumber}
            </Link>
          </li>
        )
      })}

      <li
        onClick={() => {
          dispatch(nextPage())
        }}
      >
        <Link className="page_number px-2 py-1 rounded" to={'#'}>
          <FontAwesomeIcon icon="fa-solid fa-caret-right" />
        </Link>
      </li>
    </ul>
  )
}

export default Paginate