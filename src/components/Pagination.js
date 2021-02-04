/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from "react-router-dom";
import "./../styles/latestmovies.css"


const Pagination = (props) => {

  const { currentPage, paginationSearch, pageCount } = props

  const pageLinks = [];

  let ellipsisLeft = false;
  let ellipsisRight = false;

  for (let i = 1; i <= pageCount; i++) {
    if (i === currentPage) {
      pageLinks.push(
        { id: i, current: true, ellipsis: false }
      );
    } else {
      if (i < 2 || i > pageCount - 1 || i === currentPage - 1 || i === currentPage + 1) {
        pageLinks.push(
          { id: i, current: false, ellipsis: false }
        );
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        pageLinks.push(
          { id: i, current: false, ellipsis: true }
        );
        ellipsisLeft = true;
      } else if (i < pageCount && i > currentPage && !ellipsisRight) {
        pageLinks.push(
          { id: i, current: false, ellipsis: true }
        );
        ellipsisRight = true;
      }
    }
  }


  const links = pageLinks.map(page => {

    if (!page.ellipsis) {
      return <li key={page.id}>
        <Link to="#" className={page.current ? "activeness" : ""}
          onClick={() => paginationSearch(page.id)}> {page.id}
        </Link>
      </li>
    } else {
      return <li key={page.id}><span className="">&hellip;</span></li>
    }
  })

<<<<<<< HEAD
  const deactivateNextBtn = () => {
=======
const deactivateNextBtn = () => {
>>>>>>> 7eeb215bfee0c30185c013c474f849d95e9dec0d
    if (currentPage + 1 > pageCount) {
      return {
        display: 'none'
      }
    }
  }

  return (
    <div className='pagination-search'>
      <ul>
        {currentPage > 1 ? <li onClick={(e) => paginationSearch(currentPage - 1)}> <Link to="#" > <button className='prev'><span className='prev-text' >Prev</span></button> </Link>
        </li>
          : ''}

        {links}

        {currentPage > 1 ? <li style={deactivateNextBtn()} onClick={() => paginationSearch(currentPage + 1)}> <Link to="#" ><button className='next'> <span className='next-text' >Next</span> </button>  </Link></li> : ''}
      </ul>
    </div>
  )
}

export default Pagination
