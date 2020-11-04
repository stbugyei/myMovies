import React from 'react';
import YouTube from 'react-youtube';
import { Link, useHistory } from "react-router-dom";
import '../../styles/showmovies.css';
import placeholder from '../../images/placeholder.jpeg';
const PosterUrl = "https://image.tmdb.org/t/p/original";



const TVSeasonsCard = (props) => {

    const { id, season_number, season_name, detailedEpisode, keys, runtime, genres, guestStars, crew, keySecond } = props

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
                    <span>{season_name}</span>
                    <span>Season {season_number}</span>
                    <span>Episode {id}</span>
                    <span>{detailedEpisode.name}
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
                    <div className="movieinfo-image" style={{ backgroundImage: `url(${PosterUrl + detailedEpisode.still_path}` }}>
                    </div>

                    <div className="movieinfo-details">

                        {detailedEpisode.title || detailedEpisode.name ? <span className='movieinfo-details__title'><h1>{detailedEpisode.title}{detailedEpisode.name}</h1></span> : <span>Nan</span>}

                        <div className="movieinfo-details__item">

                            {runtime ? <div><span> {runtime} min</span></div> : <span>Nan</span>}

                            {detailedEpisode ? <div><span> {detailedEpisode.air_date}</span></div> : <span>Nan</span>}

                            {detailedEpisode.vote_average || detailedEpisode.vote_count ? <div><span><i className="far fa-star"></i> {detailedEpisode.vote_average} /10 ({detailedEpisode.vote_count.toLocaleString('en-US')})</span></div> : ''}
                        </div>


                        <div className="sypnosis" style={{ width: '100%' }}>
                            <h2 style={{ color: '#fff', paddingBottom: '10px' }}>Overview</h2>
                            <p style={{ color: '#adb5bd' }}>{detailedEpisode.overview}</p>
                        </div>

                        <div className='movieinfo-details__stats'>

                            <div><span>Season:</span> {detailedEpisode ? <span>{season_number}</span> : <span>Not Available</span>}</div>

                            <div><span>Episode:</span>{detailedEpisode ? <span> {detailedEpisode.episode_number}</span> : <span>Not Available</span>}</div>

                            <div><span>Genre:</span> {genres ? <span>{(genres).join(', ')}</span> : <span>Not Available</span>}</div>

                            <div><span>Crew :</span> {crew ? <span>{crew}</span> : <span>Not Available</span>}</div>

                            <div><span>Guest Stars:</span>  {guestStars ? <span>{guestStars}</span> : <span>Not Available</span>}</div>

                        </div>

                        <div className="movieinfo-triller">
                            <YouTube videoId={keySecond} className="youtube-frame__annex" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="character-profile">
                <h2>Series Cast</h2>
                <div className="character-profile-content">
                    {
                        detailedEpisode.credits.cast.slice(0, 16).map((data) => {
                            return (
                                <div className="character-profile__card" key={data.id}>
                                    <Link key={data.id} to={{
                                        pathname: `/person/${data.id}`,
                                        state: { detailedEpisode }
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

export default TVSeasonsCard
