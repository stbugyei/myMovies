import React from 'react'
import { useState, useEffect } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
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
    const [detailedSeasonEpisode, setDetailedSeasonEpisode] = useState('')
    const [approvedAge, setApprovedAge] = useState([]);
    const [genres, setGenres] = useState('');
    const [languages, setLanguages] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [tagline, setTagline] = useState('');
    const [runtime, setRuntime] = useState('');
    const [country, setCountry] = useState('');
    const [video, setVideo] = useState('');
    const [error, setError] = useState(false);


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

    useEffect(() => {

        const getMovies = async () => {

            const details = await fetch(`${urls}${id}?api_key=${api_key}${append}`);
            const detailedData = await details.json();
            const certification = await fetch(`${urls}${id}/${content_ratings}?api_key=${api_key}`);
            const certifieddAge = await certification.json();

            setMovie(detailedData);
            setTagline(detailedData.tagline)
            setRuntime(detailedData.episode_run_time)
            setError(null);

            if (detailedData) {
                try {
                    //========= extracting additonal movie info =========
                    const genres = detailedData.genres.map(gen => (gen.name));
                    //const languages = detailedData.languages.map(lan => (lan.name))
                    const cast = detailedData.credits.cast.map(cas => (cas.name))
                    const director = detailedData.created_by.map(director => (director.name))
                    const video = detailedData.videos.results.map(video => (video.key))
                    const ageRating = certifieddAge.results.map(age => (age.rating[0]))

                    setApprovedAge(ageRating[0])
                    setGenres(genres.join(', '))
                    setLanguages(detailedData.languages.join(', '))
                    setCast(cast.slice(0, 5).join(', '))
                    setDirector(director.slice(0, 5).join(', '))
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
    }, [id]);



    let keys = video[0];
    let keySecond = video[1];


    if (!(movie && Object.keys(movie).length)) {
        return <Spinner />
    }


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
                        id={id}
                        keys={keys}
                        keySecond={keySecond}
                        runtime={runtime}
                        genres={genres}
                        approvedAge={approvedAge}
                        tagline={tagline}
                        country={country}
                        languages={languages}
                        director={director}
                        cast={cast}
                        getSeasonAndEpisode={getSeasonAndEpisode}
                        episodeInfo={episodeInfo}
                        PosterUrl={PosterUrl}
                        placeholder={placeholder}
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

