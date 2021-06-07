import React from 'react'
import { useState, useEffect } from "react";
import { withRouter, useParams, Link } from "react-router-dom";
import useLocalStorage from "../../useLocalStorage"
import '../../../styles/showmovies.css'
import ShowMoviesCard from '../../Cards/ShowMoviesCard';
import Spinner from '../../Spinner';
import placeholder from './../../../images/placeholder.jpeg'

const api_key = `${process.env.REACT_APP_EMAIL_API_KEY}`,
    PosterUrl = "https://image.tmdb.org/t/p/original";
let urls = "https://api.themoviedb.org/3/movie/",
    append = "&append_to_response=credits,videos",
    release_dates = "release_dates";


const ShowMovies = (props) => {

    const { id } = useParams();

    const [movie, setMovie] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [approvedAge, setApprovedAge] = useState([]);
    const [genres, setGenres] = useState('');
    const [linkGenres, setLinkGenres] = useState('');
    const [languages, setLanguages] = useState('');
    const [cast, setCast] = useState('');
    const [tagline, setTagline] = useState('');
    const [runtime, setRuntime] = useState('');
    const [country, setCountry] = useState('');
    const [video, setVideo] = useState('');
    const [error, setError] = useState(false);
    const [geolocation, setGeolocation] = useState('');
    const [favoriteList, setFavoriteList] = useLocalStorage("favoriteList", []);

    //============ Favourite functions ===============
    const addFavorite = (favMovie) => {
        if (!favoriteList.some(fav => fav.id === favMovie.id)) {
            setFavoriteList([...favoriteList, favMovie])
        } else {
            const newList = favoriteList.filter((item) => item.id !== favMovie.id)
            setFavoriteList(newList)
        }
    }


    const [url] = useState("https://get.geojs.io/v1/ip/geo.json")
    const [baseUrl] = useState(`${urls}${id}?api_key=${api_key}${append}`);
    const [recommendedUrl] = useState(`${urls}${id}/recommendations?api_key=${api_key}`);
    const [similarUrl] = useState(`${urls}${id}/similar?api_key=${api_key}`);


    useEffect(() => {

        const getMovies = async () => {

            const details = await fetch(baseUrl);
            const recommendedRes = await fetch(recommendedUrl);
            const similar = await fetch(similarUrl);
            const detailedData = await details.json();
            const recommendedResData = await recommendedRes.json();
            const similarData = await similar.json();
            setRecommended(recommendedResData.results)
            setSimilar(similarData.results)

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
                    const country = detailedData.production_countries.map(country => (country.name))
                    const video = detailedData.videos.results.map(video => (video.key))
                    const ageRating = certifieddAge.results.map(age => (age.release_dates[0].certification))

                    setApprovedAge(ageRating[0])
                    setGenres(genres.join(', '))
                    setLinkGenres(detailedData.genres)
                    setLanguages(languages.join(', '))
                    setCast(detailedData)
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

        // ============ Get geolocation ==============
        fetch(url)
            .then(response => response.json())
            .then(contents => setGeolocation(contents))
            .catch((error) => console.log(error))

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseUrl, setRecommended, similarUrl, url]);

    let keys = video[0];
    let keySecond = video[1];

    if (!(movie && Object.keys(movie).length)) {
        return <Spinner />
    }


    if (cast.credits === undefined) { return '' }

    const crew = cast.credits.cast.slice(0, 6).map((name, i) => {
        return <Link key={name.id} to={{
            pathname: `/person/${name.id}`,
        }}> <span key={name.id}>{name.name}{cast.credits.cast.slice(0, 6).length - 1 === i ? '' : ','}</span></Link>
    })

    const director = cast.credits.crew.slice(0, 6).map((director, i) => {
        return <Link key={director.credit_id} to={{
            pathname: `/person/${director.id}`,
        }}> <>{director.name}{cast.credits.crew.slice(0, 6).length - 1 === i ? '' : ','}</></Link>
    })

    if (!linkGenres) { return '' }
    const genreDisplay = linkGenres.map((name, i) => {
        return <Link key={name.id} to={{
            pathname: `/movie-genre/${name.id}`,
        }}>  <>{name.name}{linkGenres.length - 1 === i ? '' : ','}</></Link>
    })

    return (

        <div className="hearder">
            <div className="container">

                <div className='showmovies_wrapper'>
                    <ShowMoviesCard
                        movie={movie}
                        recommended={recommended}
                        similar={similar}
                        geolocation={geolocation}
                        streamId={id}
                        keys={keys}
                        keySecond={keySecond}
                        runtime={runtime}
                        showGenres={genres}
                        genreDisplay={genreDisplay}
                        approvedAge={approvedAge}
                        tagline={tagline}
                        country={country}
                        languages={languages}
                        director={director}
                        cast={crew}
                        PosterUrl={PosterUrl}
                        placeholder={placeholder}
                        addFavorite={addFavorite}
                        favoriteList={favoriteList}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(ShowMovies)


