import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/showmovies.css';
import placeholder from '../../images/placeholder.jpeg';
const PosterUrl = "https://image.tmdb.org/t/p/w185";
const PosterUrlOriginal = "https://image.tmdb.org/t/p/original";


const ShowPersonCard = (props) => {

    const { personInfo, additionalNames, crew, placeOfBirth, biography, crewRow, castRow, genres } = props

    // console.log(personInfo)

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


    //============== Text trancating functions =========
    const trancateText = (text) => { return (text.substr(0, 200)).trim().concat(' ...') }

    // console.log( personInfo.combined_credits.cast[0].genre_ids)


    return (
        <>
            <div className="banner-linkref">
                <div style={{marginBottom:'5px'}}>
                    <span>Home</span>
                    <span>Person</span>
                    <span>{personInfo.name}
                    </span>
                </div>
            </div>

            <section className='personinfo_wrapper'>

                <div className="movieinfo-container">
                    <div className="personinfo-image" style={{ backgroundImage: `url(${PosterUrlOriginal + personInfo.profile_path})`}}>
                    </div>

                    <div className="personinfo-details">

                        {personInfo.name ? <h1 className='movieinfo-details__title'>{personInfo.name}</h1> : <h1>Nan</h1>}

                        <div className="personinfo-details__item">

                            {personInfo ? <div> AKA: <span> {additionalNames} </span></div> : <span>Nan</span>}

                            {personInfo.popularity ? <div><span><i className="far fa-star"></i> {personInfo.popularity} </span></div> : ''}
                        </div>

                        {personInfo ? <h3 style={{ color: '#fff', marginBottom: '15px' }}>{personInfo.birthday}</h3> : ''}

                        {personInfo ? <h3 style={{ color: '#fff', marginBottom: '15px' }}>{placeOfBirth}</h3> : ''}

                        <div className="sypnosis" style={{ width: '100%' }}>
                            <h3 style={{ color: '#fff', paddingBottom: '10px' }}>Biography</h3>
                            <p style={{ color: '#adb5bd' }}>{biography}</p>
                        </div>
                    </div>
                </div>
            </section>

            {crewRow !== 0 ?
                <>
                    <h1 className="crew-caption">Crew Roles</h1>
                    <section className="crew-content">
                        {crew}
                    </section>
                </>
                :
                <section className="crew-content">
                    <span>Not Available</span>
                </section>
            }

            <div className="cast-caption">
                <span>Cast Roles</span>
                <span>Cast Roles Played  = <span>&#123;</span>{castRow}<span>&#125;</span></span>
            </div>

            <section className="cast-roles__cardwrapper">
                <>
                    {
                        personInfo.combined_credits.cast.map((data, i) => {
                            return (
                                <div className="cast-roles__container" key={i}>
                                    <Link key={data.id} to={{
                                        pathname: `/${data.media_type}/${data.id}`,
                                        state: { personInfo }
                                    }}>
                                        <>
                                            <div className="cast-role__card">
                                                <div className="cast-roles__poster">
                                                    {data.poster_path === null ? <img src={placeholder} alt="" /> : <img src={`${PosterUrl}` + data.poster_path} alt="" />}
                                                </div>
                                                <div className="cast-roles__info">
                                                    <h3>{data.character}</h3>
                                                    <h5><span style={{ display: 'flex', justifyContent: 'space-between' }}>{data.release_date} {data.first_air_date}<small className={averageRate(data.vote_average)}> <i className="fas fa-star"></i>  {data.vote_average}</small></span></h5>
                                                </div>
                                                <button className='btn-mediatype__person'><small> {mediaType(data.media_type)}</small></button>

                                                {/* <button className="btn-play"><i className="fas fa-play"></i></button> */}

                                            </div>

                                            <div className="cast-role__subdetails">
                                                {data.title || data.name ? <h4 style={{ marginBottom: '5px', textTransform: 'capitalize' }}>{data.title}{data.name}</h4> : <span>Nan</span>}

                                                {(data.overview) ? <small className="sypnonis">{trancateText(data.overview)}
                                                </small> : ''}

                                                <div className='film-list__countrygenre'>
                                                    {genres ? <h5> <span style={{ paddingRight: '2px' }}>Genre  :</span>
                                                        {data.genre_ids.map((id, index) => {
                                                            return <span key={`genres[id]${index}`}>{(index ? ', ' : '') + genres[id]}</span>
                                                        })}
                                                    </h5> : null}

                                                    <button className='preview'> <i className="fas fa-play"></i> <span>Preview now</span></button>
                                                </div>
                                            </div>
                                        </>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </>
            </section>
        </>
    )
}

export default ShowPersonCard
