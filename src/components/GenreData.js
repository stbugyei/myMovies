import { useState, useEffect } from "react";

const api_key = `${process.env.REACT_APP_EMAIL_API_KEY}`,
    movieList = `https://api.themoviedb.org/3/genre/movie/list?&api_key=${api_key}`,
    tvList = `https://api.themoviedb.org/3/genre/tv/list?&api_key=${api_key}`;

const GenreData = () => {

    const [genresforMovies, setGenresforMovies] = useState("");
    const [genresforTv, setGenresforTv] = useState("");


    //========= An async and await function to fetch Movies & Tv Genre =========

    useEffect(() => {

        const getGenres = async () => {

            const filmFeed = await Promise.all([
                fetch(`${movieList}`),
                fetch(`${tvList}`)
            ]);

            if ((filmFeed[0].status) === 200) {
                try {
                    //=========Storing all fetched data to the state =========
                    const movieGenre = await filmFeed[0].json();
                    const tvGenre = await filmFeed[1].json();

                    setGenresforMovies(movieGenre.genres);
                    setGenresforTv(tvGenre.genres);

                } catch (error) {
                    console.log(error);
                }
            } else {
                setGenresforMovies("");
                setGenresforTv("");
            }
        };
        getGenres();
    }, []);


    return {
        genresforMovies,
        genresforTv,
    }
}

export default GenreData
