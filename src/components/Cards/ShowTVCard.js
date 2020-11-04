import React from 'react';
import YouTube from 'react-youtube';
import { Link, useHistory } from "react-router-dom";
import '../../styles/showmovies.css';
import placeholder from '../../images/placeholder.jpeg';
const PosterUrl = "https://image.tmdb.org/t/p/original";


const ShowTVCard = (props) => {

    const { movie, keys, runtime, genres, approvedAge, tagline, country, languages, director, cast, getSeasonAndEpisode, episodeInfo, keySecond } = props

    //======= Navigation functions =========

    const history = useHistory();
    const handleClick = () => {
        history.goBack(-1);
    }


    return (
        <>
            <div className="banner-linkref">

                <div>
                    <span>Home</span>
                    <span>TV-Series</span>
                    <span>{movie.name}
                    </span>
                </div>
                <div><button className="btn-back" onClick={handleClick}>Back</button></div>
            </div>

            <section className='play-video__wrapper' >
                <div className='play-video__container'>
                    <YouTube videoId={keys} className="youtube-frame" />
                </div>
            </section>

            <section className='movieinfo-wrapper'>

                <div className="movieinfo-container">
                    <div className="movieinfo-image" style={{ backgroundImage: `url(${PosterUrl + movie.poster_path}` }}>
                    </div>
                    <div className="movieinfo-details">

                        {movie.title || movie.name ? <span className='movieinfo-details__title'><h1>{movie.title}{movie.name}</h1></span> : <span>Nan</span>}

                        <div className="movieinfo-details__item">
                            {approvedAge ? <div> <span style={{ border: '1px solid', padding: '1px 2px', borderRadius: '4px' }}>{approvedAge} </span></div> : <span>Nan</span>}

                            <div>{runtime ? <span>{runtime} min</span> : null}</div>

                            {movie ? <div><span> {movie.last_air_date}</span></div> : <span>Nan</span>}

                            {movie.vote_average || movie.vote_count ? <div><span><i className="far fa-star"></i> {movie.vote_average} /10 ({movie.vote_count.toLocaleString('en-US')})</span></div> : ''}
                        </div>

                        {tagline ? <h3 style={{ color: '#fff', marginBottom: '15px' }}>{tagline}</h3> : ''}

                        <div className="sypnosis" style={{ width: '100%' }}>
                            <h2 style={{ color: '#fff', paddingBottom: '10px' }}>Overview</h2>
                            <p style={{ color: '#adb5bd' }}>{movie.overview}</p>
                        </div>

                        <div className='movieinfo-details__stats'>

                            <div><span>Country :</span> {country ? <span >{country}</span> : <span>Not Available</span>}</div>

                            <div><span>Genre :</span>{genres ? <span>{genres}</span> : <span>Not Available</span>}</div>

                            <div><span>Languages :</span> {languages ? <span>{languages}</span> : <span>Not Available</span>}</div>

                            <div><span>Year Released :</span>{movie.first_air_date ? <span>{(movie.first_air_date).slice(0, 4)}</span> : <span>Not Available</span>}</div>

                            <div><span>cast :</span> {cast ? <span>{cast}</span> : <span>Not Available</span>} </div>

                            <div><span>Created by :</span>{director ? <span>{director}</span> : <span>Not Available</span>} </div>

                        </div>

                        <div className="movieinfo-triller">
                            <YouTube videoId={keySecond} className="youtube-frame__annex" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="movieinfo-seasonepisode">

                <div className="seasons-wrapper">
                    <h2>Seasons</h2>
                    <div className="seasons">
                        {
                            movie.seasons.map((season) => {
                                return (
                                    <div className="seasons-content" key={season.id} onClick={() => getSeasonAndEpisode(season.season_number)}>
                                        <div>{season.name}
                                        </div>
                                        <div className="airdate">{season.air_date}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="episodes-wrapper">
                    <h2>Episodes</h2>
                    <div className="episodes">
                        {episodeInfo}

                        {/* <img src={`${PosterUrl}` + detailedEpisode.images.stills[0].file_path} alt="" /> */}
                        <img src={`${PosterUrl}` + movie.still_path} alt="" />
                    </div>
                </div>
            </section>

            <section className="character-profile">
                <h2>Series Cast</h2>
                <div className="character-profile-content">
                    {
                        movie.credits.cast.slice(0, 16).map((data) => {
                            return (
                                <div className="character-profile__card" key={data.id}>
                                    <Link key={data.id} to={{
                                        pathname: `/person/${data.id}`,
                                        state: { movie }
                                    }}>
                                        <div className="profile-avatar">
                                            {data.profile_path === null ? <img src={placeholder} alt="" /> : <img src={`${PosterUrl}` + data.profile_path} alt="" />}
                                        </div>
                                        <div className="profile-info">
                                            <h3>{data.name}</h3>
                                            <h5>{data.character}</h5>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default ShowTVCard
