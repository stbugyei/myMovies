import React, { useState, useEffect } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import PrefetchCard from "../Cards/PrefetchCard";
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Spinner from "../Spinner";

const genreMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&sort_by=popularity.desc"

const ShowMovieGenre = (props) => {

    const { id } = useParams();
    let { genres, genresforMovies } = props
    //console.log(props.match.params.id)

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    let [totalPopularMovie, setTotalPopularMovie] = useState('');


    const getMovies = async () => {

        const movieGenreFeed = await fetch(`${genreMovieUrl}&page=${pageNumber}&with_genres=${id}`);

        if ((movieGenreFeed.status) === 200) {

            try {
                //=========Storing all fetched data to the state =========
                const genreMovieUrl = await movieGenreFeed.json();

                setMovies(genreMovieUrl.results)
                setError(null);
                setTotalPopularMovie(genreMovieUrl.total_pages)

            } catch (error) {
                setError(<span><h4 style={{ color: 'red' }}>{(movieGenreFeed.statusText)}</h4></span>);
            }
        } else {
            setMovies([]);
            setError(<div style={errormsg}> The resource is not available {error}</div>)
        }
    };

    //======================= Pagination function ==================

    const nextPageDefault = () => {
        if (movies && pageNumber < totalPopularMovie) {
            setPageNumber(pageNumber += 1)
            getMovies()
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }

    const PreviousPageDefault = () => {
        if (movies && pageNumber !== 1) {
            setPageNumber(pageNumber -= 1)
            getMovies()
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }

    useEffect(() => {
        getMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!genresforMovies) { return '' }
    const generatedGenre =  genresforMovies.reduce((element, list) => {
        const { id, name } = list
        element[id] = name
        element[28] = "Action"
        return element
    });


    const movieCard = movies.map((details, index) => {

        return (

            <div className="film-list__container" key={movies[index].id}>
                <Link to={{
                    pathname: `/movie/${movies[index].id}`,
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
                        <div className='caption-div'>
                            <span> <h2>{generatedGenre[id]} Movies</h2></span>
                            <div className='pagination'>
                                <button className='pagination-btn__prev' onClick={PreviousPageDefault}><i className="fas fa-arrow-left"></i></button>
                                <button className='pagination-btn__info'> {pageNumber} of {totalPopularMovie}</button>
                                <button className='pagination-btn__next' onClick={nextPageDefault}><i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>

                        <div className='film-list__cardwrapper'>
                            {movieCard}
                        </div>

                        <div className="bottom-pagination">
                            <div className='pagination'>
                                <button className='pagination-btn__prev' onClick={PreviousPageDefault}><i className="fas fa-arrow-left"></i></button>
                                <button className='pagination-btn__info'> {pageNumber} of {totalPopularMovie}</button>
                                <button className='pagination-btn__next' onClick={nextPageDefault}><i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(ShowMovieGenre)

const errormsg = {
    color: 'red',
    margin: '100px auto',
    textAlign: 'center',
};


