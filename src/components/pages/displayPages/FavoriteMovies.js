import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import '../../../styles/latestmovies.css'
import '../../../styles/searchlist.css'
import FavoriteCard from "../../Cards/favoriteCards/FavoriteCard";
import FavTvEpisodeCard from "../../Cards/favoriteCards/FavTvEpisodeCard";
import FavTvCard from "../../Cards/favoriteCards/FavTvCard";
//import Spinner from "../../Spinner";

const FavoriteMovies = (props) => {

    const [favMovieList, setfavMovieList] = useState([]);
    const [favTvList, setfavoriteTvList] = useState([]);
    const [favTvEpisodeList, setfavoriteTvEpisodeList] = useState([]);


    const favMovieListCard = favMovieList.map((details, index) => {
        if (!favMovieList) { return '' }
        const showGenres = (details.genres.map(gen => (gen.name)).join(', '))
        return (
            <div className='film-list__container' key={favMovieList[index].id}>
                {favMovieList ?
                    <FavoriteCard
                        favMovieList={favMovieList}
                        index={index}
                        poster_path={details.poster_path}
                        title={details.title}
                        name={details.name}
                        release_date={details.release_date}
                        first_air_date={details.first_air_date}
                        vote_average={details.vote_average}
                        overview={details.overview}
                        details={details}
                        showGenres={showGenres}
                    /> : null}
            </div>
        )
    })


    const favTvListCard = favTvList.map((details, index) => {
        if (!favTvList) { return '' }
        const showTvGenres = (details.genres.map(gen => (gen.name)).join(', '))
        return (

            <div className="film-list__container" key={favTvList[index].id}>
                {favTvList ?
                    <FavTvCard
                        favTvList={favTvList}
                        index={index}
                        poster_path={details.poster_path}
                        title={details.title}
                        name={details.name}
                        release_date={details.release_date}
                        first_air_date={details.first_air_date}
                        vote_average={details.vote_average}
                        overview={details.overview}
                        details={details}
                        showTvGenres={showTvGenres}
                    /> : null}
            </div>
        )
    })


    const favTvEpisodeListCard = favTvEpisodeList.map((details, index) => {
        if (!favTvEpisodeList) { return '' }
        return (
            <div className='film-list__container' key={favTvEpisodeList[index].id}>
                {favTvEpisodeList ?
                    <FavTvEpisodeCard
                        favTvEpisodeList={favTvEpisodeList}
                        index={index}
                        still_path={details.still_path}
                        title={details.title}
                        name={details.name}
                        release_date={details.release_date}
                        air_date={details.air_date}
                        vote_average={details.vote_average}
                        overview={details.overview}
                        episode_number={details.episode_number}
                        season_number={details.season_number}
                        details={details}
                    /> : null}
            </div>
        )
    })


    useEffect(() => {

        const fetchMovieData = async () => {
            const movieResponse = await JSON.parse(localStorage.getItem('favoriteList'));
            if (movieResponse) {
                setfavMovieList(movieResponse);
            }
        }

        const fetchTvData = async () => {
            const tvResponse = await JSON.parse(localStorage.getItem('favoriteTvList'));
            if (tvResponse) {
                setfavoriteTvList(tvResponse);
            }
        }

        const fetchTvEpisodeData = async () => {
            const tvEpisodeResponse = await JSON.parse(localStorage.getItem('favoriteTvEpisodeList'));
            if (tvEpisodeResponse) {
                setfavoriteTvEpisodeList(tvEpisodeResponse);
            }
        }


        fetchMovieData();
        fetchTvData();
        fetchTvEpisodeData();
        // favTally();

    }, [])

    // if ((!(favTvList && Object.keys(favTvList).length)) || (!(favMovieList && Object.keys(favMovieList).length))) {
    //     return <Spinner />
    // }

    return (
        <div className="header">
            <div className="container">
                <div className="favmovies-wrapper">
                    <h2>My Favorite Corner</h2>
                    <div className="favmovies">
                        {(favMovieList) ? <>{favMovieListCard}</> : ''}
                        {(favTvList) ? <>{favTvListCard}</> : ''}
                        {(favTvEpisodeList) ? <>{favTvEpisodeListCard}</> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(FavoriteMovies)
