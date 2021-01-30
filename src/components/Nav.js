import React, { useState, useEffect } from "react";
import { withRouter, NavLink, useHistory, Link } from "react-router-dom";
import '../styles/nav.css'


const Nav = (props) => {

    const { genresforMovies, genresforTv } = props

    const [isopen, setIsopen] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [favMovieList, setFavMovieList] = useState([]);
    const [favTvList, setFavTvList] = useState([]);
    const [favTvEpisodeList, setfavoriteTvEpisodeList] = useState([]);

    const favTally = () => {
        let tv = [];
        let tvepisode = [];
        let movie = [];
        if (favMovieList.length !== null) {
            movie.push(favMovieList.length)
        }

        if (favTvList.length !== null) {
            tv.push(favTvList.length)
        }

        if (favTvEpisodeList.length !== null) {
            tvepisode.push(favTvEpisodeList.length)
        }

        const tally = (((parseFloat(tv)) + (parseFloat(tvepisode)) + (parseFloat(movie))))
        return tally
    }


    useEffect(() => {

        const updateFavStore = () => {

            const favMovieListData = JSON.parse(localStorage.getItem('favoriteList'))
            const favTvListData = JSON.parse(localStorage.getItem('favoriteTvList'))
            const favoriteTvEpisodeListData = JSON.parse(localStorage.getItem('favoriteTvEpisodeList'))


            if (favTvListData) {
                setFavTvList(favTvListData)
            }

            if (favMovieListData) {
                setFavMovieList(favMovieListData)
            }

            if (favoriteTvEpisodeListData) {
                setfavoriteTvEpisodeList(favoriteTvEpisodeListData)
            }
        }

        const reset = setInterval(() => (updateFavStore()), 1000)
        return () => {
            clearInterval(reset);
        }

    }, [])


    //======= Navigation functions ========
    const history = useHistory();
    const handleClickWelcome = () => {
        history.push("/");
    }

    const handleClick = () => {
        setIsopen(!isopen)
    }

    const closeNavBar = () => {
        setIsopen(false)
    }

    const activateSubMenu = () => {
        setIsExpanded(!isExpanded)
    }

    const closeSubMenu = () => {
        setIsExpanded(false)
    }


    const movieGenreDisplay = genresforMovies.map((name) => {
        return (
            <li key={name.id} onClick={() => { closeNavBar(); closeSubMenu(); }}><Link to={{ pathname: `/movie-genre/${name.id}` }}>{name.name}</Link></li>
        )
    })

    const tvGenreDisplay = genresforTv.map((name) => {
        return (<li key={name.id} onClick={() => { closeNavBar(); closeSubMenu(); }}><Link to={{ pathname: `/tv-seriesgenre/${name.id}` }}>{name.name}</Link></li>
        )
    })


    return (

        <div className="wrapper-nav">
            <nav>

                <div className="logo-burger">
                    <div className="hamburger" onClick={handleClick}>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                    </div>
                    <div className="logo" onClick={handleClickWelcome}>StBugyei☻<span className="logo-movies">Movies</span>
                    </div>
                </div>

                <ul className={isopen ? 'showNav' : 'undefined'}>
                    <div className="liwrapper">
                        <li>
                            <NavLink exact activeClassName="activenav" to="/home" onClick={closeNavBar}> Home </NavLink>
                        </li>

                        <li className="genre-wrapper"
                            onMouseEnter={() => setIsExpanded(true)}
                            onMouseLeave={() => setIsExpanded(false)}>
                            <NavLink to="#">Genre</NavLink>
                            <div className={isExpanded ? 'genre-container' : 'genre-container1'}>
                                <ul className="genre-content__movie">
                                    <h3>Movies Genre</h3>
                                    {movieGenreDisplay}
                                </ul>

                                <ul className="genre-content__tv">
                                    <h3>Tv Series Genre</h3>
                                    {tvGenreDisplay}
                                </ul>
                            </div>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/latestmoviespage" onClick={closeNavBar}> Trending Movies </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/popularmoviespage" onClick={closeNavBar}> Popular Movies</NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/populartvpage" onClick={closeNavBar}> Latest Tv Episode</NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/populartvshowspage" onClick={closeNavBar}> Popular Tv Shows </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/favoritemovies" onClick={closeNavBar}>
                                <button className="fav-btn"><i className="far fa-heart"></i><span className="fav-text">{favTally()}</span></button>
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </nav>
        </div >
    )
}

export default withRouter(Nav)
