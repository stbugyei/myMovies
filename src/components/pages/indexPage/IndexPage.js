import React from 'react'
import { withRouter } from "react-router-dom";
import ShowMoviesSlider from './../displayPages/ShowMoviesSlider';
import PopularMovies from "./PopularMovies";
import PopularTv from "./PopularTv";
import PopularTvShow from "./PopularTvShows";
import LatestMovies from "./LatestMovies";
import Spinner from '../../Spinner';



const IndexPage = (props) => {

    const { preFetchMovies, genres } = props

    if (!(preFetchMovies && Object.keys(preFetchMovies).length)) {
        return <Spinner />
    }

    return (

        <div className="header">
            <div className="container">
                <ShowMoviesSlider preFetchMovies={preFetchMovies[0]} genres={genres} />
                <LatestMovies preFetchMovies={preFetchMovies[0]} genres={genres} />
                <PopularTv preFetchMovies={preFetchMovies[1]} genres={genres} />
                <PopularMovies preFetchMovies={preFetchMovies[2]} genres={genres} />
                <PopularTvShow preFetchMovies={preFetchMovies[3]} genres={genres} />
            </div>
        </div>
    )
}

export default withRouter(IndexPage)
