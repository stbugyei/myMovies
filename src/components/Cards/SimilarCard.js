import React from 'react'
import { Link } from "react-router-dom";
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Placeholder from '../../images/placeholder.jpeg';
const PosterUrl = "https://image.tmdb.org/t/p/original";

const SimilarCard = (props) => {
    const { movieInfo, genres } = props

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

    //============== Text trancating functions =========
    const trancateText = (text) => { return (text.substr(0, 200)).trim().concat(' ...') }

    const movieCard = movieInfo.map((data, i) => {

        return (

            <div className="film-list__container" key={i}>
                <Link key={data.id} to={{
                    pathname: `${data.id}`,
                    state: { movieInfo }
                }}>
                    <div className="film-list__card">
                        <div className="film-list__poster">
                            {data.poster_path === null ? <img className="optional-image" src={Placeholder} alt="poster" /> :
                                <img src={`${PosterUrl}` + data.poster_path} alt="poster" />}
                        </div>
                    </div>

                    <div className="info-wrapper" style={{ position: 'relative' }}>

                        {data.title || data.name ? <h5 className='title'>{data.title}{data.name} </h5> : <span>Nan</span>}

                        <div className="date-rate">
                            <span><i className="far fa-calendar-alt"></i> {data.release_date}{data.first_air_date}</span>

                            <span className={averageRate(data.vote_average)}> <i className="fas fa-star"></i> {data.vote_average}</span>
                        </div>
                    </div>


                    <div className="film-list__subdetails">
                        {data.title || data.name ? <h4 style={{ marginBottom: '5px', textTransform: 'capitalize' }}>{data.title}{data.name}</h4> : <span>Nan</span>}

                        {(data.overview) ? <small className="sypnonis">{trancateText(data.overview)}
                        </small> : ''}

                        <div className='film-list__countrygenre'>
                            {genres ? <h5> <span style={{ paddingRight: '2px' }}>Genre  :</span>
                                <span>{genres}</span>
                            </h5> : null}

                            <button className='preview'> <i className="fas fa-play"></i> <span>Preview now</span></button>
                        </div>
                    </div>
                </Link>
            </div>
        )
    })

    return (
        <div className="film-listpage__wrapper" style={{ marginTop: 'initial' }}>

            { movieInfo ? <>
                <div className='caption-div'>
                    <span> <h2>Similar Movies</h2></span>
                </div>
                <div className='film-list__cardwrapper'>
                    {movieCard}
                </div>
            </> : ''}
        </div>
    )
}

export default SimilarCard
