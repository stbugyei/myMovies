import React from 'react'
import { useState, useEffect } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import useLocalStorage from "../../useLocalStorage"
import placeholder from './../../../images/placeholder.jpeg'
import '../../../styles/showmovies.css'
import Spinner from '../../Spinner';
import ShowTVCard from '../../Cards/ShowTVCard';

const PosterUrl = "https://image.tmdb.org/t/p/original";
let urls = "https://api.themoviedb.org/3/tv/";
let api_key = "04c35731a5ee918f014970082a0088b1";
let append = "&append_to_response=credits,videos,season/1"
let content_ratings = "content_ratings";


const ShowMovies = (props) => {

    const { id } = useParams();

    const [movie, setMovie] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [detailedSeasonEpisode, setDetailedSeasonEpisode] = useState('')
    const [approvedAge, setApprovedAge] = useState([]);
    const [genres, setGenres] = useState('');
    const [linkGenres, setLinkGenres] = useState('');
    const [languages, setLanguages] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [tagline, setTagline] = useState('');
    const [runtime, setRuntime] = useState('');
    const [country, setCountry] = useState('');
    const [video, setVideo] = useState('');
    const [clicked, setClicked] = useState('');
    const [error, setError] = useState(false);
    const [favoriteTvList, setFavoriteTvList] = useLocalStorage("favoriteTvList", []);

    //============ Storing data to the localstorage ===============
    useState(localStorage.setItem("selectedMovie", JSON.stringify(movie)));
    useState(localStorage.setItem("seasonEpisodeNumber", JSON.stringify(detailedSeasonEpisode)));


    //============ Favourite functions ===============
    const addFavorite = (favMovie) => {
        if (!favoriteTvList.some(fav => fav.id === favMovie.id)) {
            setFavoriteTvList([...favoriteTvList, favMovie])
        } else {
            const newList = favoriteTvList.filter((item) => item.id !== favMovie.id)
            setFavoriteTvList(newList)
        }
    }


    //========= Active seasones className functions ========
    const activeColor = (clicked) => {
        setClicked(clicked)
    }


    const getSeasonAndEpisode = async (number = 1) => {

        const seasonEpisode = await fetch(`${urls}${id}/season/${number}?api_key=${api_key}`);
        if (seasonEpisode) {
            try {
                const detailedSeasonEpisode = await seasonEpisode.json();
                setDetailedSeasonEpisode(detailedSeasonEpisode)

            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("The resource is not available")
        }
    }

    const [baseUrl] = useState(`${urls}${id}?api_key=${api_key}${append}`);
    const [certificationUrl] = useState(`${urls}${id}/${content_ratings}?api_key=${api_key}`);
    const [recommendedUrl] = useState(`${urls}${id}/recommendations?api_key=${api_key}`);
    const [similarUrl] = useState(`${urls}${id}/similar?api_key=${api_key}`);

    useEffect(() => {

        const getMovies = async () => {

            const details = await fetch(baseUrl);
            const recommendedRes = await fetch(recommendedUrl);
            const similar = await fetch(similarUrl);
            const detailedData = await details.json();
            const certification = await fetch(certificationUrl);
            const certifieddAge = await certification.json();

            const recommendedResData = await recommendedRes.json();
            const similarData = await similar.json();

            setRecommended(recommendedResData.results)
            setSimilar(similarData.results)

            setMovie(detailedData);
            setTagline(detailedData.tagline)
            setRuntime(detailedData.episode_run_time)
            setError(null);

            if (detailedData) {
                try {
                    //========= extracting additonal movie info =========
                    const genres = detailedData.genres.map(gen => (gen.name));
                    const video = detailedData.videos.results.map(video => (video.key))
                    const ageRating = certifieddAge.results.map(age => (age.rating[0]))

                    setApprovedAge(ageRating[0])
                    setGenres(genres.join(', '))
                    setLinkGenres(detailedData.genres)
                    setLanguages(detailedData.languages.join(', '))
                    setCast(detailedData)
                    setCountry((detailedData.origin_country.slice(0, 5).join(', ')))
                    setVideo(video)
                } catch (error) {
                    console.log(error)
                }
            } else {
                setError(<><div style={errormsg}> The resource<p style={{ color: 'red' }}></p>is not available</div></>)
            }
        };

        getMovies();
        getSeasonAndEpisode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseUrl, certificationUrl, similarUrl, recommendedUrl]);


    let keys = video[0];
    let keySecond = video[1];

    if (!(movie && Object.keys(movie).length)) {
        return <Spinner />
    }


    if (!cast) { return error }
    const crew = cast.credits.cast.slice(0, 6).map((name, i) => {
        return <Link key={name.id} to={{
            pathname: `/person/${name.id}`,
        }}> <>{name.name}{cast.credits.cast.slice(0, 6).length - 1 === i ? '' : ','}</></Link>
    })

    const creator = cast.created_by.slice(0, 6).map((director, i) => {
        return <Link key={director.credit_id} to={{
            pathname: `/person/${director.id}`,
        }}> <>{director.name}{cast.created_by.slice(0, 6).length - 1 === i ? '' : ','}</></Link>
    })


    if (!linkGenres) { return '' }
    const genreDisplay = linkGenres.map((name, i) => {
        return <Link key={name.id} to={{
            pathname: `/tv-seriesgenre/${name.id}`,
        }}>  <>{name.name}{linkGenres.length - 1 === i ? '' : ','}</></Link>
    })


    if (!detailedSeasonEpisode) { return error }

    const episodeInfo = detailedSeasonEpisode.episodes.map((episode) => {
        return (
            <div className="episodes-content" key={episode.id}>
                <Link key={episode.id} to={{
                    pathname: `/tv/season/episode/${episode.episode_number}`,
                    state: { movie, detailedSeasonEpisode }
                }}>
                    <span style={{ paddingRight: '30px' }}>Episode: {episode.episode_number}</span>
                    <span>{episode.name}</span>

                    <div className="episodes-content__annex">
                        <div>S0{episode.season_number}</div>
                        <div>E0{episode.episode_number}</div>
                        <div><span className="episode-date"></span> {episode.air_date}</div>
                    </div>
                </Link>
            </div>
        )
    })


    return (

        <div className="hearder">
            <div className="container">
                <div className='showmovies_wrapper'>
                    <ShowTVCard
                        movie={movie}
                        recommended={recommended}
                        similar={similar}
                        id={id}
                        keys={keys}
                        keySecond={keySecond}
                        runtime={runtime}
                        genres={genres}
                        genreDisplay={genreDisplay}
                        approvedAge={approvedAge}
                        tagline={tagline}
                        country={country}
                        languages={languages}
                        director={creator}
                        cast={crew}
                        getSeasonAndEpisode={getSeasonAndEpisode}
                        episodeInfo={episodeInfo}
                        PosterUrl={PosterUrl}
                        placeholder={placeholder}
                        addFavorite={addFavorite}
                        favoriteTvList={favoriteTvList}
                        activeColor={activeColor}
                        clicked={clicked}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(ShowMovies)

const errormsg = {
    color: '#fff',
    margin: '30px',
    textAlign: 'center',
};

