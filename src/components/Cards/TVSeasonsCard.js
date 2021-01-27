import React from "react";
import YouTube from 'react-youtube';
import { useHistory, Link } from "react-router-dom";
import '../../styles/showmovies.css';
import CharacterProfileCard from "./CharacterProfileCard";
const PosterUrl = "https://image.tmdb.org/t/p/original";



const TVSeasonsCard = (props) => {

    const {streamId, seasonName, season_number, season_name, detailedEpisode, runtime, genres, keys } = props

 
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


    const crew = detailedEpisode.credits.cast.slice(0, 6).map((name, i) => {
        return <Link key={name.id} to={{
            pathname: `/person/${name.id}`,
        }}> <>{name.name}{detailedEpisode.credits.cast.slice(0, 6).length - 1 === i ? '' : ','}</></Link>
    })

    const guestStars = detailedEpisode.guest_stars.slice(0, 6).map((star, i) => {
        return <Link key={star.credit_id + star.id} to={{
            pathname: `/person/${star.id}`,
        }}> <>{star.name}{detailedEpisode.guest_stars.slice(0, 6).length - 1 === i ? '' : ','}</></Link>
    })

 
    return (
        <>
            <div className="banner-linkref">
                <div>
                    <span>Home</span>
                    <span>TV-Series</span>
                    <span>{season_name}</span>
                    <span>Season {season_number}</span>
                    <span>Episode {streamId}</span>
                    <span>{detailedEpisode.name}
                    </span>
                </div>
                <div><button className="btn-back" onClick={handleClick}>Back</button></div>

            </div>

            <section className='movieinfo-wrapper'>

                <div className="movieinfo-container">
                    <div className="movieinfo-image" style={{ backgroundImage: `url(${PosterUrl + detailedEpisode.still_path}` }}>
                    </div>

                    <div className="movieinfo-details">

                        {seasonName ? <span className='movieinfo-details__title'><h3>{seasonName}</h3></span> : <span>Nan</span>}

                        <div className="movieinfo-details__item">

                            {runtime ? <div><span> {runtime} min</span></div> : <span>Nan</span>}

                            {detailedEpisode ? <div><span> {(detailedEpisode.air_date)}</span></div> : <span>Nan</span>}

                            {detailedEpisode.vote_average || detailedEpisode.vote_count ? <div><span className={averageRate(detailedEpisode.vote_average)}><i className="far fa-star"></i> {detailedEpisode.vote_average} /10 ({detailedEpisode.vote_count.toLocaleString('en-US')})</span></div> : ''}

                        </div>


                        <div className="sypnosis" style={{ width: '100%' }}>
                            <h3 style={{ color: '#fff', paddingBottom: '10px' }}>Overview</h3>
                            <p style={{ color: '#adb5bd' }}>{detailedEpisode.overview}</p>
                        </div>

                        <div className='movieinfo-details__stats'>

                            <div><span>Title:</span> {detailedEpisode.name ? <span>{detailedEpisode.name}</span> : <span>Not Available</span>}</div>

                            <div><span>Season:</span> {season_number ? <span>{season_number}</span> : <span>Not Available</span>}</div>

                            <div><span>Episode:</span>{detailedEpisode.episode_number ? <span> {detailedEpisode.episode_number}</span> : <span>Not Available</span>}</div>

                            <div><span>Genre:</span> {genres ? <span>{genres}</span> : <span>Not Available</span>}</div>

                            <div><span>Cast :</span> {crew.length !== 0 ?  <span>{crew}</span> : <span>Not Available</span>}</div>

                            <div><span>Guest Stars:</span>  {guestStars.length !== 0 ? <span>{guestStars}</span> : <span>Not Available</span>}</div>

                        </div>

                        <div className="movieinfo-triller">
                            <YouTube videoId={keys} className= "youtube-frame" /> 
                        </div>
                    </div>
                </div>
            </section>

            {detailedEpisode.credits.cast ?
                <section className="character-profile">
                    <h2>Series Cast</h2>
                    <div className="character-profile-content">
                        <CharacterProfileCard movie={detailedEpisode} />
                    </div>
                </section>
                : ''}
        </>
    )
}

export default TVSeasonsCard
