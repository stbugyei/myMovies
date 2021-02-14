import React from "react";
import YouTube from 'react-youtube';
import { useHistory } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import '../../styles/showmovies.css';
import RecommendedCard from './RecommendedCard';
import SimilarCard from "./SimilarCard";
import CharacterProfileCard from "./CharacterProfileCard";
const PosterUrl = "https://image.tmdb.org/t/p/original";


const ShowMoviesCard = (props) => {

    const { favoriteList, addFavorite, movie, recommended, similar, keys, keySecond, runtime, showGenres, genreDisplay, approvedAge, tagline, country, languages, director, cast } = props


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

    //============== time formmtting function =========
    const hourMinutes = (num) => {
        const hours = Math.floor(num / 60);
        const minutes = num % 60;
        return `${hours}h  ${minutes}m`;
    }

    //======= Navigation functions =========
    const history = useHistory();
    const handleClick = () => {
        history.goBack();
    }

    const colorToggle = favoriteList.filter(data => data.id === movie.id)

    return (
        <>
            <div className="banner-linkref">
                <div>
                    <span>Home</span>
                    <span>Movie</span>
                    <span>{movie.title}
                    </span>
                </div>
                <div><button className="btn-back" onClick={handleClick}>Back</button></div>
            </div>

            <section className='play-video__wrapper'>
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
                            {approvedAge ? <div><span style={{ border: '1px solid', padding: '1px 2px', borderRadius: '4px' }}>{approvedAge} </span></div> : <span>Nan</span>}

                            {runtime ? <div> <span>{hourMinutes(runtime)}</span></div> : null}

                            {movie.release_date ? <div><span>{(movie.release_date).slice(0, 4)}</span> </div> : <span>Nan</span>}

                            {movie.vote_average || movie.vote_count ? <div> <span className={averageRate(movie.vote_average)}><i className="far fa-star"></i> {movie.vote_average} /10 ({movie.vote_count.toLocaleString('en-US')})</span> </div> : ''}

                            <div>
                                <button className="btn-addfav__show" onClick={() => addFavorite(movie)}>
                                    {colorToggle.length !== 0 ? <><IoIosHeart
                                        style={{ color: 'red', fontSize: '20px' }}
                                    /><small style={{ color: '#fff' }}> <sub>- Remove from List</sub></small> </>
                                        : <> <IoIosHeartEmpty
                                            style={{ color: 'white', fontSize: '20px' }}
                                        /> <small style={{ color: '#fff' }}> <sub> + Add to List</sub></small></>}
                                </button>
                            </div>

                        </div>

                        {tagline ? <h3 style={{ color: '#fff', marginBottom: '15px' }}>{tagline}</h3> : ''}

                        <div className="sypnosis">
                            <h3 style={{ color: '#fff', paddingBottom: '10px' }}>Overview</h3>

                            <p style={{ color: '#adb5bd' }}>{movie.overview}</p>
                        </div>

                        <div className='movieinfo-details__stats'>

                            <div><span>Country :</span> {country ? <span >{country}</span> : <span>Not Available</span>}</div>

                            <div><span>Genre :</span>{genreDisplay ? <span>{genreDisplay}</span> : <span>Not Available</span>}</div>

                            <div><span>Languages :</span> {languages ? <span>{languages}</span> : <span>Not Available</span>}</div>

                            <div><span> Released Date:</span> {movie.release_date ? <span> {(movie.release_date)}</span> : <span>Not Available</span>} </div>

                            {movie.first_air_date ? <div><span>Year Released :</span> <span>{(movie.first_air_date).slice(0, 4)}</span> </div> : ''}

                            <div><span>Cast :</span> {cast.length !== 0 ? <span>{cast}</span> : <span>Not Available</span>}</div>

                            <div><span>Director :</span>{director.length !== 0 ? <span>{director}</span> : <span>Not Available</span>} </div>
                        </div>

                        <div className="movieinfo-triller">
                            <YouTube videoId={keySecond} className="youtube-frame__annex" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="character-profile">
                <h2>Top Billed Cast</h2>
                <div className="character-profile-content">
                    <CharacterProfileCard movie={movie} />
                </div>
            </section>

            {similar.length !== 0 ? <SimilarCard movieInfo={similar} genres={showGenres} /> : ''}

            {recommended.length !== 0 ? <RecommendedCard movieInfo={recommended} genres={showGenres} /> : ''}
        </>
    )
}

export default ShowMoviesCard
