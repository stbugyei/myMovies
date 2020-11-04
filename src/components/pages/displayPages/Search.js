import React from "react";
import { withRouter, Link } from "react-router-dom";
import '../../../styles/searchlist.css'
import SearchCard from "../../Cards/SearchCard";
import Pagination from "../../Pagination";
import Spinner from "../../Spinner";



const ShowSearchedResult = (props) => {

  const { movies, genres, query, pageCount, paginationSearch, currentPage } = props

  const movieCard = movies.map((movies) => {
   
    return (

      <div className="film-list__container" key={movies.id}>
        <Link key={movies.id} to={{
          pathname: `/${movies.media_type}/${movies.id}`,
          state: { movies }
        }}>
          <SearchCard
            movies={movies}
            genres={genres}
          />
        </Link>
      </div>
    )
  })

  if (!(movies && Object.keys(movies).length)) {
    return <Spinner />
  }

  return (


    <div className="hearder">
      <div className="container">

        <div className="film-listpage__wrapper">
          <div className='search-caption'>
            <span> <h2>Searched Results for: {query}</h2></span>
            <Pagination paginationSearch={paginationSearch} pageCount={pageCount} currentPage={currentPage} />
          </div>

          <div className='film-list__cardwrapper'>
            {movieCard}
          </div>

          <div className="bottom-pagination">
            <div className='search-caption'>
              <Pagination paginationSearch={paginationSearch} pageCount={pageCount} currentPage={currentPage} />
            </div>
          </div>

        </div>
      </div>
    </div>


  )
}

export default withRouter(ShowSearchedResult)
