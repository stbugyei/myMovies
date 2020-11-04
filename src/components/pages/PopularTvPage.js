import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PrefetchCard from "../Cards/PrefetchCard";
import './../../styles/latestmovies.css'
import './../../styles/searchlist.css'
import Spinner from "../Spinner";


const latestTvEpisodeUrl = "https://api.themoviedb.org/3/tv/airing_today?&api_key=04c35731a5ee918f014970082a0088b1";
const genreList = "https://api.themoviedb.org/3/genre/movie/list?&api_key=04c35731a5ee918f014970082a0088b1"
//let api_key = "5dcf7f28a88be0edc01bbbde06f024ab";



const PopularTvPage = (props) => {

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState(null);
    const [error, setError] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    let [totalTvEpisode, setTotalTvEpisode] = useState('');


    const getMovies = async () => {

        const latestTvEpisodeFeed = await Promise.all([
            fetch(`${latestTvEpisodeUrl}&page=${pageNumber}`),
            fetch(`${genreList}`)
        ]);


        if ((latestTvEpisodeFeed[0].status) === 200) {

            try {
                //=========Storing all fetched data to the state =========
                const latestTvEpisodeUrl = await latestTvEpisodeFeed[0].json();
                const genreList = await latestTvEpisodeFeed[1].json();


                //========= Extracting the genre id and names =========

                const generatedGenre = genreList.genres.reduce((element, list) => {
                    const { id, name } = list
                    element[id] = name
                    element[28] = "Action"
                    element[10762] = "Kids"
                    element[10763] = "News"
                    element[10764] = "Reality"
                    element[10765] = "Sci-Fi & Fantasy"
                    element[10766] = "Soap"
                    element[10767] = "Talk"
                    element[10768] = "War & Politics"
                    element[10759] = "Action & Adventure"
                    return element
                });
                //console.log(generatedGenre)

                setMovies(latestTvEpisodeUrl.results)
                setGenres(generatedGenre);
                setError(null);
                setTotalTvEpisode(latestTvEpisodeUrl.total_pages)

            } catch (error) {
                setError(<span><h4 style={{ color: 'red' }}>{(latestTvEpisodeFeed.statusText)}</h4></span>);
            }
        } else {
            setMovies([]);
            setError(<div style={errormsg}> The resource is not available {(error)}</div>)
        }
    };


    //======================= Pagination function ==================
    const nextPageDefault = (pageNumber, totalPageNumber) => {
        if (movies && pageNumber < totalPageNumber) {
            setPageNumber(pageNumber += 1)
            getMovies();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }

    const PreviousPageDefault = (pageNumber) => {
        if (movies && pageNumber !== 1) {
            setPageNumber(pageNumber -= 1)
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
                    {movies ? <PrefetchCard
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

    // console.log(genres)

    return (

        <div className="hearder" >
            <div className="container">
                {(!(movies && Object.keys(movies).length)) ? <Spinner /> :
                    <div className="film-listpage__wrapper">
                        <div className='caption-div'>
                            <span><h2>Latest Tv Episode</h2></span>
                            <div className='pagination'>
                                <button className='pagination-btn__prev' onClick={() => PreviousPageDefault(pageNumber)}><i className="fas fa-arrow-left"></i></button>
                                <button className='pagination-btn__info'> {pageNumber} of {totalTvEpisode}</button>
                                <button className='pagination-btn__next' onClick={() => nextPageDefault(pageNumber, totalTvEpisode)}><i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>

                        <div className='film-list__cardwrapper'>
                            {movieCard}
                        </div>

                        <div className="bottom-pagination">
                            <div className='pagination'>
                                <button className='pagination-btn__prev' onClick={() => PreviousPageDefault(pageNumber)}><i className="fas fa-arrow-left"></i></button>
                                <button className='pagination-btn__info'> {pageNumber} of {totalTvEpisode}</button>
                                <button className='pagination-btn__next' onClick={() => nextPageDefault(pageNumber, totalTvEpisode)}><i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(PopularTvPage)

const errormsg = {
    color: '#fff',
    margin: '30px',
    textAlign: 'center',
};