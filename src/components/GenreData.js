import { useState, useEffect } from "react";

const movieList = "https://api.themoviedb.org/3/genre/movie/list?&api_key=04c35731a5ee918f014970082a0088b1"
const tvList = "https://api.themoviedb.org/3/genre/tv/list?&api_key=04c35731a5ee918f014970082a0088b1"

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
