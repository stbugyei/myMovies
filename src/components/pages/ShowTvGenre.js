import React, { useState, useEffect } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import PrefetchCard from "../Cards/PrefetchCard";
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Spinner from "../Spinner";
import Pagination from "../Pagination";

const genreTvUrl = "https://api.themoviedb.org/3/discover/tv?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&sort_by=popularity.desc"

const ShowTvGenre = (props) => {

    const { id } = useParams();
    const { genres, genresforTv } = props

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const [pageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPopularMovie, setTotalPopularMovie] = useState("");


    useEffect(() => {

        const getMovies = async () => {

            const tvGenreFeed = await fetch(`${genreTvUrl}&page=${pageNumber}&with_genres=${id}`);

            if ((tvGenreFeed.status) === 200) {

                try {
                    //=========Storing all fetched data to the state =========
                    const genreTvUrl = await tvGenreFeed.json();

                    setMovies(genreTvUrl.results)
                    setError(null);
                    setTotalPopularMovie(genreTvUrl.total_pages)

                } catch (error) {
                    setError(<span><h4 style={{ color: 'red' }}>{(tvGenreFeed.statusText)}</h4></span>);
                }
            } else {
                setMovies([]);
                setError(<div style={errormsg}> The resource is not available {error}</div>)
            }
        };
        getMovies();
    }, [error, id, pageNumber]);


    //======================= Pagination for Genre ================
    const pageCount = Math.ceil(totalPopularMovie / 20)

    const paginationSearch = (pageNumbered, e) => {
        e.preventDefault();
        try {
            fetch(`${genreTvUrl}&page=${pageNumbered}&with_genres=${id}`)
                .then(res => res.json())
                .then(searchedmovie => {
                    setMovies(searchedmovie.results);
                    setCurrentPage(pageNumbered);
                    setError(null);
                });
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

        } catch (error) {
            console.log(error)

        }
    }

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
                            <Pagination paginationSearch={paginationSearch} pageCount={pageCount} currentPage={currentPage} />
                        </div>

                        <div className='film-list__cardwrapper'>
                            {movieCard}
                        </div>

                        <div className='search-caption'>
                            <Pagination paginationSearch={paginationSearch} pageCount={pageCount} currentPage={currentPage} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(ShowTvGenre)

const errormsg = {
    color: 'red',
    margin: '100px auto',
    textAlign: 'center',
};


