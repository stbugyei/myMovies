/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import '../../../styles/latestmovies.css'
import '../../../styles/searchlist.css'
import Placeholder from './../../../images/placeholder.jpeg'
const PosterUrl = "https://image.tmdb.org/t/p/w185";


const SearchList = (props) => {

    const [isopen, setIsopen] = useState(false)

    const closeLink = () => {
        setIsopen(!isopen)
    }

    const { movies } = props

    //============== vote formmtting functions =========
    const averageRate = (rating) => {
        if (rating >= 8) {
            return 'green'
        } else if (rating >= 5) {
            return 'yellow'
        } else {
            return 'red'
        }
    }

    //============== Mediatype icon formatting functions =========
    const mediaType = (media_type) => {

        if (media_type !== 'tv') {
            return (<><span><i className="fas fa-film"></i></span> {media_type} </>)

        } else {
            return (<>{<span><i className="fas fa-tv"></i></span>} {media_type} </>)
        }

    }


    const searchCard = movies.slice(0, 5).map((movies) => {

        return (

            <div className='searchlist-container' key={movies.id}>
                <Link onClick={closeLink} to={{
                    pathname: `/${movies.media_type}/${movies.id}`,
                    state: { movies }
                }}>

                    <div className="searchlist-card">

                        {movies.media_type === "person" ? <>{movies.profile_path === null ? <img style={{ width: '60px' }} src={Placeholder} alt="" /> : <img className="searchlist-poster" src={`${PosterUrl}` + movies.profile_path} alt="" />}
                        </> :

                            <> {movies.poster_path === null ? <img style={{ width: '60px' }} src={Placeholder} alt="" /> : <img className="searchlist-poster" src={`${PosterUrl}` + movies.poster_path} alt="" />}</>}


                        {movies.media_type !== "person" ? <div className="searchlist-info">
                            <h5 className='searchlist-info__title'>{movies.name}{movies.title}</h5>
                            <div className='searchlist-info__subtitle'>
                                <div> <small><i className="far fa-calendar-alt"></i> {movies.release_date} {movies.first_air_date}</small> </div>

                                <div className={averageRate(movies.vote_average)}><small> <i className="fas fa-star"></i>{movies.vote_average}</small></div>

                                <div className='subtitle-media'><small> {mediaType(movies.media_type)}</small></div>
                            </div>
                        </div> :

                            <div className="searchlist-info">
                                <h5 className='searchlist-info__title'>{movies.name}</h5>

                                <div className='searchlist-info__subtitle'>
                                    {movies.gender === 1 ? <div><small>Female</small></div> : <div><small>Male</small></div>}
                                    
                                    <div className={averageRate(movies.vote_average)}><small> <i className="fas fa-star"></i>{movies.popularity}</small></div>

                                    <div className='subtitle-media'><small> {mediaType(movies.media_type)}</small></div>
                                </div>
                            </div>}
                    </div>
                </Link>
            </div>
        )
    })

    if (!(movies && Object.keys(movies).length)) {
        return <span>  </span>
    }

    return (
        <div className={isopen ? 'displaynone' : 'undefined'}>
            <div className='searchlist-wrapper'>
                {searchCard}
                <Link to="/search" onClick={closeLink}>
                    < button className='btn-preview'>
                        Load More Results <i className="fas fa-angle-double-right"></i>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default withRouter(SearchList)


