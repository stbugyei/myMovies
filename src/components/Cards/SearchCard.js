import React from 'react'
import './../../styles/searchlist.css'
import Placeholder from './../../images/placeholder.jpeg'
//const PosterUrl = "https://image.tmdb.org/t/p/original";
const PosterUrl = "https://image.tmdb.org/t/p/w185";


const SearchCard = (props) => {

    const { movies, genres } = props

    //============== Text trancating functions =========
    const trancateText = (text) => { return (text.substr(0, 200)).trim().concat(' ...') }

    //==================== vote formatting functions =============
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


    return (
        <>
            <div className="film-list__card">
                <div className="film-list__poster">

                    {movies.media_type === "person" ? <> {movies.profile_path === null ? <img className="optional-image" src={Placeholder} alt="" /> : <img src={`${PosterUrl}` + movies.profile_path} alt="" />}</>
                        :
                        <> {movies.poster_path === null ? <img className="optional-image" src={Placeholder} alt="" /> : <img src={`${PosterUrl}` + movies.poster_path} alt="" />}</>
                    }
                </div>

                {movies.title || movies.name ? <h5 className='title'>{movies.title}{movies.name} </h5> : <span>Nan</span>}

                {movies.media_type !== "person" ? <>
                        <div className="date-rate">
                            <span><i className="far fa-calendar-alt"></i> {movies.release_date}{movies.first_air_date}</span>

                            {movies.vote_average ? <div className={averageRate(movies.vote_average)}><small> <i className="fas fa-star"></i>  {movies.vote_average}</small></div> : ''}
                        </div>
                    </>
                    :
                    <><div className="date-rate">
                        {movies.gender === 1 ? <span>Female</span> : <span>Male</span>}

                        {movies.popularity ? <div className={averageRate(movies.popularity)}><small> <i className="fas fa-star"></i>  {movies.popularity}</small></div> : ''}
                    </div>
                    </>}

            </div>

            <button className='btn-mediatype'><small> {mediaType(movies.media_type)}</small></button>

            <div className="film-list__subdetails">
                {movies.title || movies.name ? <h4 style={{ marginBottom: '5px', textTransform: 'capitalize' }}>{movies.title}{movies.name}</h4> : <span>Nan</span>}

                {movies.overview ? <small className="sypnonis">{trancateText(movies.overview)} </small> : ''}

                <div className='film-list__countrygenre'>

                    {movies.genre_ids ? <h4> <span>Genre  :</span> {movies.genre_ids.map((id, index) => {
                        return <span key={`genres[id]${index}`}>{(index ? ' ' : '') + genres[id]}</span>
                    })}</h4> : null}
                </div>

                <button className='preview'> <i className="fas fa-play"></i> <span>Preview now</span></button>
            </div>
        </>
    )
}

export default SearchCard
