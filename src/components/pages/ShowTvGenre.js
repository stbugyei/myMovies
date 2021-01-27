import React, { useState, useEffect } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import PrefetchCard from "../Cards/PrefetchCard";
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Spinner from "../Spinner"; 

const genreTvUrl = "https://api.themoviedb.org/3/discover/tv?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&sort_by=popularity.desc"

const ShowTvGenre = (props) => {

    const { id } = useParams();
    let { genres, genresforTv } = props

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    let [totalPopularMovie, setTotalPopularMovie] = useState('');


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


    if (!genresforTv) { return '' }
    const generatedGenre =  genresforTv.reduce((element, list) => {
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
                        <div className='caption-div'>
                            <span> <h2>{generatedGenre[id]} Tv Series</h2></span>
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

export default withRouter(ShowTvGenre)

const errormsg = {
    color: 'red',
    margin: '100px auto',
    textAlign: 'center',
};


