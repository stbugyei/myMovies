import React, { useState, useEffect } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import PrefetchCard from "../Cards/PrefetchCard";
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Spinner from "../Spinner";

const api_key = `${process.env.REACT_APP_EMAIL_API_KEY}`,
    genreTvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc`;

const ShowTvGenre = (props) => {

    const { id } = useParams();

    const { genres, genresforTv } = props

    const [movies, setMovies] = useState([]);
    const [totalPopularMovie, setTotalPopularMovie] = useState("");
    const [display, setDisplay] = useState(false);
    let [currentPage, setCurrentPage] = useState(1);

    const scrolltoBottom = () => {
        (window.innerHeight + window.scrollY) >= document.body.offsetHeight ? setDisplay(true) : setDisplay(false);
    }

    //========== A Style function to change the visibility of the scroll button ===========//
    const scrollVisibility = () => {
        return { transform: display ? 'scale(1)' : 'scale(0)' };
    }

    useEffect(() => {

        const getMovies = async (pageNumbered) => {

            const tvGenreFeed = await fetch(`${genreTvUrl}&page=${pageNumbered}&with_genres=${id}`);

            if ((tvGenreFeed.status) === 200) {

                try {
                    //=========Storing all fetched data to the state =========
                    const genreTvUrl = await tvGenreFeed.json();
                    setMovies((prev) => [...prev, ...genreTvUrl.results]);
                    setTotalPopularMovie(genreTvUrl.total_pages)

                } catch (error) {
                    console.log(error)
                }

            } else {
                setMovies([]);
            }
        };

        getMovies(currentPage);

        window.addEventListener('scroll', scrolltoBottom);
        return () => window.removeEventListener('scroll', scrolltoBottom);

    }, [currentPage, id]);


    if (!genresforTv) { return '' }
    const generatedGenre = genresforTv.reduce((element, list) => {
        const { id, name } = list
        element[id] = name
        element[10759] = "Action & Adventure"
        return element
    });


    const movieCard = movies.map((details, index) => {

        return (

            <div className="film-list__container" key={movies[index].id}>
                <Link to={{
                    pathname: `/tv/${movies[index].id}`,
                    state: { movies }
                }}>
                    {movies ?
                        <PrefetchCard
                            poster_path={details.poster_path}
                            title={details.title}
                            name={details.name}
                            release_date={details.release_date}
                            first_air_date={details.first_air_date}
                            vote_average={details.vote_average}
                            overview={details.overview}
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

                        <div className='search-caption'>
                            <span> <h2>{generatedGenre[id]} TV-Series</h2></span>
                        </div>

                        <div className='film-list__cardwrapper' style={{ marginBottom: '4.6em' }}>
                            {movieCard}

                            <button className={currentPage + 1 > totalPopularMovie ? "none" : "loadmore-btn"} style={scrollVisibility()} onClick={() => setCurrentPage(currentPage + 1)}> <span> {currentPage} of {totalPopularMovie}</span><strong>Click to Load More</strong> </button>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(ShowTvGenre)

