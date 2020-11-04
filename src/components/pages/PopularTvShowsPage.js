import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PrefetchCard from "../Cards/PrefetchCard";
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Spinner from "../Spinner";


const popularTvUrl = "https://api.themoviedb.org/3/tv/popular?&api_key=04c35731a5ee918f014970082a0088b1";


const PopularTvShowPage = (props) => {

    const { genres } = props

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    let [totalTopularTvShow, setTotalTopularTvShow] = useState('');

    const getMovies = async () => {

        const popularTvFeed = await fetch(`${popularTvUrl}&page=${pageNumber}`);

        if ((popularTvFeed.status) === 200) {

            try {
                //=========Storing all fetched data to the state =========
                const popularTvUrl = await popularTvFeed.json();

                setMovies(popularTvUrl.results)
                setError(null);
                setTotalTopularTvShow(popularTvUrl.total_pages)

            } catch (error) {
                setError(<span><h4 style={{ color: 'red' }}>{(popularTvFeed.statusText)}</h4></span>);
            }
        } else {
            setMovies([]);
            setError(<div style={errormsg}> The resource is not available {error}</div>)
        }
    };

    //======================= Pagination function ==================

    const nextPageDefault = () => {
        if (movies && pageNumber < totalTopularTvShow) {
            setPageNumber(pageNumber += 1);
            getMovies();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }

    const PreviousPageDefault = () => {
        if (movies && pageNumber !== 1) {
            setPageNumber(pageNumber -= 1);
            getMovies();
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


    const movieCard = movies.map((details, i) => {
        return (
            <div className="film-list__container" key={details.id}>
                <Link to={{
                    pathname: `/tv/${movies[i].id}`,
                    state: { movies }
                }}>
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
                    />
                </Link>
            </div>
        )
    })

    if (!(movies && Object.keys(movies).length)) {
        return <Spinner />
    }

    return (

        <div className="hearder" >
            <div className="container">

                {(!(movies && Object.keys(movies).length)) ? <Spinner /> :

                    <div className="film-listpage__wrapper">
                        <div className='caption-div'>
                            <span><h2>Popular TV Shows</h2></span>
                            <div className='pagination'>
                                <button className='pagination-btn__prev' onClick={PreviousPageDefault}><i className="fas fa-arrow-left"></i></button>
                                <button className='pagination-btn__info'> {pageNumber} of {totalTopularTvShow}</button>
                                <button className='pagination-btn__next' onClick={nextPageDefault}><i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>

                        <div className='film-list__cardwrapper'>
                            {movieCard}
                        </div>

                        <div className="bottom-pagination">
                            <div className='pagination'>
                                <button className='pagination-btn__prev' onClick={PreviousPageDefault}><i className="fas fa-arrow-left"></i></button>
                                <button className='pagination-btn__info'> {pageNumber} of {totalTopularTvShow}</button>
                                <button className='pagination-btn__next' onClick={nextPageDefault}><i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}


export default withRouter(PopularTvShowPage)

const errormsg = {
    color: '#fff',
    margin: '30px',
    textAlign: 'center',
};