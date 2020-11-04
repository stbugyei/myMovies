import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import placeholder from './../../../images/placeholder.jpeg'
import '../../../styles/showmovies.css'
import Spinner from '../../Spinner';
import TVSeasonsCard from '../../Cards/TVSeasonsCard';

const PosterUrl = "https://image.tmdb.org/t/p/original";
let urls = "https://api.themoviedb.org/3/tv/";
let api_key = "04c35731a5ee918f014970082a0088b1";
let append = "&append_to_response=credits,videos,images,season/1"

const TvSeasons = (props) => {

    //======= Navigation functions =========
    const history = useHistory();
    // const handleClick = () => {
    //     history.goBack(-1);
    // }

    const id = props.match.params.id;
    const tv_id = history.location.state.movie.id;
    const season_number = props.location.state.detailedSeasonEpisode.season_number;
    const runtime = props.location.state.movie.episode_run_time;
    const genres = props.location.state.movie.genres.map(gen => (gen.name));
    const season_name = props.location.state.movie.name;

    const [detailedEpisode, setDetailedEpisode] = useState('');
    const [crew, setCrew] = useState('');
    const [guestStars, setGuestStars] = useState('');
    const [video, setVideo] = useState('');
    const [error, setError] = useState(false);


    useEffect(() => {

        const getEpisode = async () => {

            const episode = await fetch(`${urls}${tv_id}/season/${season_number}/episode/${id}?api_key=${api_key}${append}`);

            if (episode) {
                try {
                    const detailedEpisode = await episode.json();
                    setDetailedEpisode(detailedEpisode)

                    //========= Extracting episodes data =========
                    const crew = detailedEpisode.credits.cast.map(name => (name.name));
                    const stars = detailedEpisode.guest_stars.map(star => (star.name));
                    const video = detailedEpisode.videos.results.map(video => (video.key));
                    setCrew(crew.slice(0, 4).join(', '))
                    setGuestStars(stars.slice(0, 5).join(', '));
                    setVideo(video);
                    setError('');

                } catch (error) {
                    console.log(error)
                }

            } else {
                console.log("The resource is not available")
            }
        }
        getEpisode();


    }, [id, season_number, tv_id]);


    let keys = video[0];
    let keySecond = video[1];

    if (!history) { return null }

    if (!(detailedEpisode && Object.keys(detailedEpisode).length)) {
        return <Spinner />
    }

    return (

        <div className="hearder">
            <div className="container">
                <div className='showmovies_wrapper'>
                    {!error ? <TVSeasonsCard
                        season_name={season_name}
                        season_number={season_number}
                        id={id}
                        tv_id={tv_id}
                        detailedEpisode={detailedEpisode}
                        keys={keys}
                        keySecond={keySecond}
                        PosterUrl={PosterUrl}
                        placeholder={placeholder}
                        runtime={runtime}
                        genres={genres}
                        guestStars={guestStars}
                        crew={crew}
                    /> : <span>Resource is not Available</span>}

                </div>
            </div>
        </div>


    )
}

export default withRouter(TvSeasons)
