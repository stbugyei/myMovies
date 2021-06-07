/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import useLocalStorage from "../../useLocalStorage"
import placeholder from './../../../images/placeholder.jpeg'
import '../../../styles/showmovies.css'
import Spinner from '../../Spinner';
import TVSeasonsCard from '../../Cards/TVSeasonsCard';

const api_key = `${process.env.REACT_APP_EMAIL_API_KEY}`,
    PosterUrl = "https://image.tmdb.org/t/p/original";
let urls = "https://api.themoviedb.org/3/tv/",
    append = "&append_to_response=credits,videos,images,season/1";

const TvSeasons = (props) => {

    const [detailedEpisode, setDetailedEpisode] = useState([]);
    const [video, setVideo] = useState('');
    const [error, setError] = useState(false);
    const [geolocation, setGeolocation] = useState('');
    const [favoriteTvEpisodeList, setFavoriteTvEpisodeList] = useLocalStorage("favoriteTvEpisodeList", []);

    //============ Fetching data from the localstorage ===============
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'))
    const seasonEpisodeNumber = JSON.parse(localStorage.getItem('seasonEpisodeNumber'))

    const fetchFromLocalStorageGenres = () => {
        if (selectedMovie) {
            // let genres = selectedMovie.genres.map(gen => (gen.name));
            // return genres
            const genreDisplay = selectedMovie.genres.map((name, i) => {
                return <Link key={name.id} to={{
                    pathname: `/movie-genre/${name.id}`,
                }}>  <>{name.name}{selectedMovie.genres.length - 1 === i ? '' : ','}</></Link>
            })
            return genreDisplay
        }
    }

    //============ Storing localstorage data into variables ===============

    let episodeId = props.match.params.id;
    let tv_id = selectedMovie.id;
    let seasonName = selectedMovie.name;
    let season_number = seasonEpisodeNumber.season_number;
    let runtime = selectedMovie.episode_run_time;
    let genres = fetchFromLocalStorageGenres();

    //============ Favourite functions ===============

    const addFavorite = (favMovie) => {
        if (!favoriteTvEpisodeList.some(fav => fav.id === favMovie.id)) {
            setFavoriteTvEpisodeList([...favoriteTvEpisodeList, favMovie])

        } else {
            const newList = favoriteTvEpisodeList.filter((item) => item.id !== favMovie.id)
            setFavoriteTvEpisodeList(newList)
        }

    }

    const [url] = useState("https://get.geojs.io/v1/ip/geo.json");
    const [baseUrl] = useState(`${urls}${tv_id}/season/${season_number}/episode/${episodeId}?api_key=${api_key}${append}`);

    useEffect(() => {

        const getEpisode = async () => {

            const episode = await fetch(baseUrl);

            if (episode) {
                try {
                    const detailedEpisode = await episode.json();
                    const video = detailedEpisode.videos.results.map(video => (video.key));
                    setDetailedEpisode(detailedEpisode)
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

        //============ Get geolocation ==============
        fetch(url)
            .then(response => response.json())
            .then(contents => setGeolocation(contents))
            .catch((error) => console.log(error))

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [baseUrl, url]);


    let keys = video[0];
    let keySecond = video[1];


    if (!(detailedEpisode && Object.keys(detailedEpisode).length)) {
        return <Spinner />
    }

    return (

        <div className="hearder">
            <div className="container">
                <div className='showmovies_wrapper'>
                    {!error ?
                        <TVSeasonsCard
                            tv_id={tv_id}
                            geolocation={geolocation}
                            season_name={seasonName}
                            season_number={season_number}
                            streamId={episodeId}
                            seasonName={seasonName}
                            detailedEpisode={detailedEpisode}
                            keys={keys}
                            keySecond={keySecond}
                            PosterUrl={PosterUrl}
                            placeholder={placeholder}
                            runtime={runtime}
                            genres={genres}
                            addFavorite={addFavorite}
                            favoriteTvEpisodeList={favoriteTvEpisodeList}
                        /> :
                        <span>Resource is not Available</span>}
                </div>
            </div>
        </div>
    )
}

export default withRouter(TvSeasons)
