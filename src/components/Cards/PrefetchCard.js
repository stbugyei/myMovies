import React from "react";
import '../../styles/latestmovies.css'
import '../../styles/searchlist.css'
import Placeholder from '../../images/placeholder.jpeg'
const PosterUrl = "https://image.tmdb.org/t/p/w185";


const PrefetchCard = (props) => {

    const { poster_path, title, name, release_date, first_air_date, vote_average, overview, genre_ids, genres } = props

    //============== Text trancating functions =========
    const trancateText = (text) => { return (text.substr(0, 200)).trim().concat(' ...') }

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

    return (
        <>
            <div className="film-list__card">

                <div className="film-list__poster">
                    {poster_path === null ? <img className="optional-image" src={Placeholder} alt="poster" /> :
                        <img src={`${PosterUrl}` + poster_path} alt="poster" />}
                </div>
            </div>

            <div className="info-wrapper" style={{ position: 'relative' }}>

                {title || name ? <h5 className='title'>{title}{name} </h5> : <span>Nan</span>}

                <div className="date-rate">
                    <span><i className="far fa-calendar-alt"></i> {release_date}{first_air_date}</span>

                    <span className={averageRate(vote_average)}> <i className="fas fa-star"></i> {vote_average}</span>
                </div>
            </div>


            <div className="film-list__subdetails">
                {title || name ? <h4 style={{ marginBottom: '5px', textTransform: 'capitalize' }}>{title}{name}</h4> : <span>Nan</span>}

                {(overview) ? <small className="sypnonis">{trancateText(overview)}
                </small> : ''}

                <div className='film-list__countrygenre'>
                    {genres ? <h5> <span style={{ paddingRight: '2px' }}>Genre  :</span>

                        {genre_ids.map((id, index) => {
                            return <span key={`genres[id]${index}`}>{(index ? ', ' : '') + genres[id]}</span>
                        })
                        }</h5> : null}

                    <button className='preview'> <i className="fas fa-play"></i> <span>Preview now</span></button>
                </div>
            </div>
        </>
    )
}

export default PrefetchCard
