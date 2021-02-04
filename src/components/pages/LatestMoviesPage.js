import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PrefetchCard from "../Cards/PrefetchCard";
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Spinner from "../Spinner";

const latestMovieUrl = "https://api.themoviedb.org/3/movie/upcoming?&api_key=04c35731a5ee918f014970082a0088b1";

const LatestMoviesPage = (props) => {

    const { genres } = props

    const [movies, setMovies] = useState([]);
    const [display, setDisplay] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    let [totalLatestMovies, setTotalLatestMovies] = useState('');

    const scrolltoBottom = () => {
        (window.innerHeight + window.scrollY) >= document.body.offsetHeight ? setDisplay(true) : setDisplay(false);
    }

    //========== A Style function to change the visibility of the scroll button ===========//
    const scrollVisibility = () => {
        return { transform: display ? 'scale(1)' : 'scale(0)' };
    }


    useEffect(() => {

        const getMovies = async (pageNumbered) => {

            const latestMovieFeed = await fetch(`${latestMovieUrl}&page=${pageNumbered}`);

            if ((latestMovieFeed.status) === 200) {

                try {
                    //=========Storing all fetched data to the state =========
                    const latestmovieUrl = await latestMovieFeed.json();

                    setMovies((prev) => [...prev, ...latestmovieUrl.results]);
                    setTotalLatestMovies(latestmovieUrl.total_pages)

                } catch (error) {
                    console.log(error)
                }

            } else {
                setMovies([]);
            }
        };

        getMovies(pageNumber);

        window.addEventListener('scroll', scrolltoBottom);
        return () => window.removeEventListener('scroll', scrolltoBottom);

    }, [pageNumber]);


    const movieCard = movies.map((details, index) => {

        return (

            <div className="film-list__container" key={details.id}>
                <Link to={{
                    pathname: `/movie/${index}`,
                    state: { movies }
                }}>
                    {movies ? <PrefetchCard
                        index={index}
                        movies={movies}
                        poster_path={details.poster_path}
                        title={details.title}
                        name={details.name}
                        release_date={details.release_date}
                        first_air_date={details.first_air_date}
                        vote_average={details.vote_average}
                        overview={details.overview}
                        details={details}
                        genre_ids={details.genre_ids}
                        genres={genres}
                    /> : null}
                </Link>
            </div>
        )
    })


    return (

        <div className="header">
            <div className="container">
                {(!(movies && Object.keys(movies).length)) ? <Spinner /> :
                    <div className="film-listpage__wrapper">
                        <div className='caption-div'>
                            <span> <h2>Trending Movies</h2></span>
                        </div>

                        <div className='film-list__cardwrapper' style={{ marginBottom: '4.6em' }}>
                            {movieCard}

                            <button className={pageNumber + 1 > totalLatestMovies ? "none": "loadmore-btn"} style={scrollVisibility()} onClick={() => setPageNumber(pageNumber + 1)}> <span> {pageNumber} of {totalLatestMovies}</span><strong>Click to Load More</strong> </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(LatestMoviesPage)
