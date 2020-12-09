import React from "react";
import YouTube from 'react-youtube';
import { useHistory } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import '../../styles/showmovies.css';
import RecommendedCard from './RecommendedCard';
import CharacterProfileCard from "./CharacterProfileCard";
const PosterUrl = "https://image.tmdb.org/t/p/original";


const ShowTVCard = (props) => {


    const { favoriteTvList, addFavorite, movie, recommended, cast, keys, keySecond, runtime, genres, approvedAge, tagline, country, languages, director, getSeasonAndEpisode, episodeInfo, clicked, activeColor } = props

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

    //======= Navigation functions =========

    const history = useHistory();
    const handleClick = () => {
        history.goBack();
    }


    const colorToggle = favoriteTvList.filter(data => data.id === movie.id)

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

                        {movie.title || movie.name ? <span className='movieinfo-details__title'><h3>{movie.title}{movie.name}</h3></span> : <span>Nan</span>}

                        <div className="movieinfo-details__item">
                            {approvedAge ? <div> <span style={{ border: '1px solid', padding: '1px 2px', borderRadius: '4px' }}>{approvedAge} </span></div> : <span>Nan</span>}

                            <div>{runtime ? <span>{runtime} min</span> : null}</div>

                            {movie ? <div><span> {(movie.first_air_date).slice(0, 4)}</span></div> : <span>Nan</span>}

                            {movie.vote_average || movie.vote_count ? <div><span className={averageRate(movie.vote_average)}><i className="far fa-star"></i> {movie.vote_average} /10 ({movie.vote_count.toLocaleString('en-US')})</span></div> : ''}


                            <div>
                                <button className="btn-addfav__show" onClick={() => addFavorite(movie)}>
                                    {colorToggle.length !== 0 ? <><IoIosHeart
                                        style={{ color: 'red', fontSize: '20px' }}
                                    /><small style={{ color: '#fff' }}> <sub>- Remove from List</sub></small>
                                    </> :
                                        <> <IoIosHeartEmpty
                                            style={{ color: 'white', fontSize: '20px' }}
                                        /> <small style={{ color: '#fff' }}> <sub> + Add to List</sub></small></>}
                                </button>
                            </div>
                        </div>

                        {tagline ? <h3 style={{ color: '#fff', marginBottom: '15px' }}>{tagline}</h3> : ''}

                        <div className="sypnosis" style={{ width: '100%' }}>
                            <h3 style={{ color: '#fff', paddingBottom: '10px' }}>Overview</h3>
                            <p style={{ color: '#adb5bd' }}>{movie.overview}</p>
                        </div>

                        <div className='movieinfo-details__stats'>

                            <div><span>Country :</span> {country ? <span >{country}</span> : <span>Not Available</span>}</div>

                            <div><span>Genre :</span>{genres ? <span>{genres}</span> : <span>Not Available</span>}</div>

                            <div><span>Languages :</span> {languages ? <span>{languages}</span> : <span>Not Available</span>}</div>

                            <div><span>Last Air Date:</span>{movie.first_air_date ? <span>{(movie.last_air_date)}</span> : <span>Not Available</span>}</div>

                            <div><span>Cast :</span> {cast.length !== 0 ? <span>{cast}</span> : <span>Not Available</span>}</div>

                            <div><span>Created by :</span>{director.length !== 0 ? <span>{director}</span> : <span>Not Available</span>} </div>

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
                                    <div className={`${(clicked === season.season_number ? 'seasons-content__active' : 'seasons-content')}`} key={season.id} onClick={() => {
                                        getSeasonAndEpisode(season.season_number);
                                        activeColor(season.season_number);
                                    }}>
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
                        <img src={`${PosterUrl}` + movie.still_path} alt="" />
                    </div>
                </div>
            </section>

            <section className="character-profile">
                <h2>Series Cast</h2>
                <div className="character-profile-content">
                    <CharacterProfileCard movie={movie} />
                </div>
            </section>

            {recommended.length !== 0 ? <RecommendedCard movieInfo={recommended} genres={genres} /> : ''}
        </>
    )
}

export default ShowTVCard
