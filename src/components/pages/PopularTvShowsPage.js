import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PrefetchCard from '../Cards/PrefetchCard';
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Spinner from "../Spinner";

const api_key = `${process.env.REACT_APP_EMAIL_API_KEY}`,
    popularTvUrl = `https://api.themoviedb.org/3/tv/popular?&api_key=${api_key}`;


const PopularTvShowPage = (props) => {

    const { genres } = props

    const [movies, setMovies] = useState([]);
    const [display, setDisplay] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    let [totalTopularTvShow, setTotalTopularTvShow] = useState('');


    const scrolltoBottom = () => {
        (window.innerHeight + window.scrollY) >= document.body.offsetHeight ? setDisplay(true) : setDisplay(false);
    }

    //========== A Style function to change the visibility of the scroll button ===========//
    const scrollVisibility = () => {
        return { transform: display ? 'scale(1)' : 'scale(0)' };
    }

    useEffect(() => {

        const getMovies = async (pageNumbered) => {

            const popularTvFeed = await fetch(`${popularTvUrl}&page=${pageNumbered}`);

            if ((popularTvFeed.status) === 200) {

                try {
                    //=========Storing all fetched data to the state =========
                    const popularTvUrl = await popularTvFeed.json();

                    setMovies((prev) => [...prev, ...popularTvUrl.results]);
                    setTotalTopularTvShow(popularTvUrl.total_pages)
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
                    pathname: `/tv/${movies[index].id}`,
                    state: { movies }
                }}>
                    <PrefetchCard
                        movies={movies}
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
                        </div>

                        <div className='film-list__cardwrapper' style={{ marginBottom: '4.6em' }}>
                            {movieCard}

                            <button className={pageNumber + 1 > totalTopularTvShow ? "none" : "loadmore-btn"} style={scrollVisibility()} onClick={() => setPageNumber(pageNumber + 1)}> <span> {pageNumber} of {totalTopularTvShow}</span><strong>Click to Load More</strong> </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


export default withRouter(PopularTvShowPage)

