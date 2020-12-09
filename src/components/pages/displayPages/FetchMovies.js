import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter, useLocation } from "react-router-dom";
import useDismiss from "use-dismiss";
import FavoriteMovies from "../displayPages/FavoriteMovies"
import Banner from "./../../Banner";
import Form from './../../Form'
import IndexPage from "./../indexPage/IndexPage";
import Search from "./../displayPages/Search";
import SearchList from "./../displayPages/SearchList";
import LatestMoviesPage from "./../LatestMoviesPage";
import PopularTvPage from "./../PopularTvPage";
import PopularMoviesPage from "./../PopularMoviesPage";
import PopularTvShowPage from "./../PopularTvShowsPage";
import ShowMovies from "./ShowMovies";
import ShowTv from "./ShowTV";
import TvSeasons from "./TvSeasons";
import Spinner from "../../Spinner";
import ShowPerson from "./ShowPerson";
import './../../../styles/form.css'
import WelcomePage from "./WelcomePage";


const genreList = "https://api.themoviedb.org/3/genre/movie/list?&api_key=04c35731a5ee918f014970082a0088b1"
const latestMovieUrl = "https://api.themoviedb.org/3/movie/upcoming?&api_key=04c35731a5ee918f014970082a0088b1";
const latestTvEpisodeUrl = "https://api.themoviedb.org/3/tv/airing_today?&api_key=04c35731a5ee918f014970082a0088b1";
const popularMovieUrl = "https://api.themoviedb.org/3/movie/popular?&api_key=04c35731a5ee918f014970082a0088b1";
const popularTvUrl = "https://api.themoviedb.org/3/tv/popular?&api_key=04c35731a5ee918f014970082a0088b1";
const url = "https://api.themoviedb.org/3/search/multi";
let api_key = "04c35731a5ee918f014970082a0088b1";
//let api_key = "5dcf7f28a88be0edc01bbbde06f024ab";

function FetchMovies(props) {

    const location = useLocation();

    const [preFetchMovies, setPreFetchMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState(null);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false);
    let [pageNumber] = useState(1);
    let [currentPage, setCurrentPage] = useState(1);
    let [pageNumbers] = useState(1);
    let [totalMovies, setTotalMovies] = useState('');
    const [showform, setShowform] = useState(false)

    const displayForm = () => {
        setShowform(!showform)
    }

    //======================= Search function ======================
    const searchMovies = async (e) => {
        let term = e.target.value;
        setQuery(term);

        const filmFeed = await fetch(`${url}?api_key=${api_key}&query=${term}&page=${pageNumbers}`)

        if ((filmFeed.status) === 200) {

            try {
                const searchedmovie = await filmFeed.json();
                setMovies(searchedmovie.results);
                setTotalMovies(searchedmovie.total_pages);
                setError(null);

            } catch (error) {
                setError(<span><h4 style={{ color: 'red' }}>{error}</h4></span>);
                setQuery('')
            }
        }
        else {
            setMovies([]);
            setError(<><div style={errormsg}> The resource<p style={{ color: 'red' }}>{query}</p>is not available</div></>)
        }
    }


    //======================= Pagination for search ================
    const pageCount = Math.ceil(totalMovies / 20)

    const paginationSearch = (pageNumbered, e) => {
        e.preventDefault();
        try {
            fetch(`${url}?api_key=${api_key}&query=${query}&page=${pageNumbered}`)
                .then(res => res.json())
                .then(searchedmovie => {
                    setMovies(searchedmovie.results);
                    setCurrentPage(pageNumbered)
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


    //========= An async and await function to fetch films =========
    useEffect(() => {

        const getMovies = async () => {

            const filmFeed = await Promise.all([
                fetch(`${latestMovieUrl}&page=${pageNumber}`),
                fetch(`${latestTvEpisodeUrl}&page=${pageNumber}`),
                fetch(`${popularMovieUrl}&page=${pageNumber}`),
                fetch(`${popularTvUrl}&page=${pageNumber}`),
                fetch(`${genreList}`)
            ]);
            // console.log(filmFeed)
            if ((filmFeed[0].status) === 200) {
                try {
                    //=========Storing all fetched data to the state =========
                    const latestmovie = await filmFeed[0].json();
                    const latesttvepisode = await filmFeed[1].json();
                    const popularmovieUrl = await filmFeed[2].json();
                    const populartvshow = await filmFeed[3].json();
                    const genreList = await filmFeed[4].json();

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

                    const userfilmInformation = [];
                    userfilmInformation.push(latestmovie.results, latesttvepisode.results, popularmovieUrl.results, populartvshow.results);

                    setPreFetchMovies(userfilmInformation);
                    setGenres(generatedGenre);
                    setError(null);

                } catch (error) {
                    setError(<span><h4 style={{ color: 'red' }}>{error}</h4></span>);
                }
            } else {
                setPreFetchMovies([]);
                setError(<div style={errormsg}> The resource is not available {error}</div>)
            }
        };
        getMovies();
    }, [error, pageNumber]);


    //=== Removing search result div when click outside, function ===
    const ref = useDismiss(() => setModal(false));
    const displayDiv = () => { setModal(true) }


    if (!(preFetchMovies && Object.keys(preFetchMovies).length)) {
        return <Spinner />
    }

    return (

        <div>
            <Banner />
            <input type="checkbox" id="moveform" />
            <label htmlFor="moveform">
                <span className="showform" onClick={displayForm} >
                    <i className="fas fa-search"></i>
                </span>
            </label>
            {showform && <div className='banner-wrapper' onChange={searchMovies} query={query}>
                <div className="form-content" onClick={displayDiv}>
                    <Form />
                    {modal ? <div ref={ref}><SearchList movies={movies} /> </div> : null}
                </div>
            </div>}

            {((preFetchMovies && Object.keys(preFetchMovies).length)) ?
                <>
                    <Switch location={location} key={location.pathname}>

                        <Route exact path="/search">
                            {((movies && Object.keys(movies).length)) ? <Search movies={movies} query={query} genres={genres} paginationSearch={paginationSearch} currentPage={currentPage} pageCount={pageCount} totalMovies={totalMovies} /> : ''}
                        </Route>

                        <Route path="/populartvpage">
                            <PopularTvPage genres={genres} />
                        </Route>

                        <Route path="/popularmoviespage">
                            <PopularMoviesPage genres={genres} />
                        </Route>

                        <Route path="/populartvshowspage">
                            <PopularTvShowPage genres={genres} />
                        </Route>

                        <Route path="/latestmoviespage">
                            <LatestMoviesPage genres={genres} />
                        </Route>

                        <Route path="/favoritemovies">
                            <FavoriteMovies />
                        </Route>

                        <Route path="/person/:id">
                            <ShowPerson movies={movies} query={query} genres={genres} />
                        </Route>

                        <Route path="/tv/season/episode/:id">
                            <TvSeasons movies={movies} query={query} genres={genres} />
                        </Route>

                        <Route path="/tv/:id">
                            <ShowTv movies={movies} query={query} genres={genres} />
                        </Route>

                        <Route path="/movie/:id">
                            <ShowMovies movies={movies} query={query} genres={genres} />
                        </Route>

                        <Route exact path="/home">
                            <IndexPage preFetchMovies={preFetchMovies} genres={genres} />
                        </Route>

                        <Route exact path="/">
                            <WelcomePage />
                        </Route>

                    </Switch> </>
                : <><span style={errormsg}>Resource Not Available</span> <span style={{ display: "none" }}>{error}</span> </>}
        </div>
    );
}

export default withRouter(FetchMovies)

const errormsg = {
    color: '#fff',
    margin: '30px',
    textAlign: 'center',
};
