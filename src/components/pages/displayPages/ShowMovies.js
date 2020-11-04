import React from 'react'
import { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import '../../../styles/showmovies.css'
import ShowMoviesCard from '../../Cards/ShowMoviesCard';
import Spinner from '../../Spinner';
import placeholder from './../../../images/placeholder.jpeg'

const PosterUrl = "https://image.tmdb.org/t/p/original";
let urls = "https://api.themoviedb.org/3/movie/";
let api_key = "04c35731a5ee918f014970082a0088b1";
let append = "&append_to_response=credits,videos";
let release_dates = "release_dates";

const ShowMovies = (props) => {

    const { id } = useParams();

    const [movie, setMovie] = useState([]);
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


    useEffect(() => {

        const getMovies = async () => {

            const details = await fetch(`${urls}${id}?api_key=${api_key}${append}`);
            const detailedData = await details.json();
            const certification = await fetch(`${urls}${id}/${release_dates}?api_key=${api_key}`);
            const certifieddAge = await certification.json();

            setMovie(detailedData);
            setTagline(detailedData.tagline)
            setRuntime(detailedData.runtime)
            setError(null);

            if (detailedData) {
                try {

                    //========== extracting additonal movie info =============
                    const genres = detailedData.genres.map(gen => (gen.name));
                    const languages = detailedData.spoken_languages.map(lan => (lan.name))
                    const cast = detailedData.credits.cast.map(cas => (cas.name))
                    const director = detailedData.credits.crew.map(director => (director.name))
                    const country = detailedData.production_countries.map(country => (country.name))
                    const video = detailedData.videos.results.map(video => (video.key))
                    const ageRating = certifieddAge.results.map(age => (age.release_dates[0].certification))

                    setApprovedAge(ageRating[0])
                    setGenres(genres.join(', '))
                    setLanguages(languages.join(', '))
                    setCast(cast.slice(0, 5).join(', '))
                    setDirector(director.slice(0, 5).join(', '))
                    setCountry((country.slice(0, 5).join(', ')))
                    setVideo(video)

                } catch (error) {
                    console.log(error)
                }

            } else {
                console.log(error)
            }
        };

        getMovies();
    }, [error, id]);

    let keys = video[0];
    let keySecond = video[1];

    if (!(movie && Object.keys(movie).length)) {
        return <Spinner />
    }

    return (

        <div className="hearder">
            <div className="container">

                <div className='showmovies_wrapper'>
                    <ShowMoviesCard
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
                        PosterUrl={PosterUrl}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </div>


    )
}

export default withRouter(ShowMovies)


