/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
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
        <a
          href="/#"
          className={page.current ? "activeness" : ""}
          onClick={(e) => paginationSearch(page.id, e)}
        >
          {page.id}
        </a>
      </li>
    } else {
      return <li key={page.id}><span className="">&hellip;</span></li>
    }
  })


  return (
    <div className='pagination-search'>
      <ul>
        {currentPage > 1 ? <li onClick={(e) => paginationSearch(currentPage - 1, e)}> <a to="#" > <button className='prev'><span className='prev-text' >Prev</span></button> </a>
        </li>
          : ''}

        {links}

        {currentPage > 1 ? <li style={{ display: 'flex', color: '#fff', padding: '10px' }} onClick={(e) => paginationSearch(currentPage + 1, e)}> <a to="#" ><button className='next'> <span className='next-text' >Next</span> </button>  </a></li> : ''}
      </ul>
    </div>
  )
}

export default Pagination
