import React from 'react';
import { withRouter, Link } from "react-router-dom";
import Slider from "react-slick";
import '../../../styles/showmovieslider.css'
const PosterUrl = "https://image.tmdb.org/t/p/original";


const ShowMoviesSlider = (props) => {

    const { preFetchMovies, genres } = props

    //============== Text trancating functions =========
    const trancateText = (text) => { return (text.substr(0, 200)).trim().concat(' ...') }

    //============== vote formatting functions =========
    const averageRate = (rating) => {
        if (rating >= 8) {
            return 'green'
        } else if (rating >= 5) {
            return 'yellow'
        } else {
            return 'red'
        }
    }

    const slides = preFetchMovies.slice(0, 6).map((movies) => {

        return (
            <div className="movieslider-container" style={{ backgroundImage: `url(${PosterUrl + movies.backdrop_path}` }} key={movies.id}>
                <img className="movieslider-container__img" src={`${PosterUrl}` + movies.backdrop_path} alt="" />
                <div className="movieslider-details__wrapper">
                    <div className="movieslider-details">
                        <h1 className='movieslider-details__title'>{movies.title}{movies.name}</h1>
                        <div className="movieslider-details__item">
                            <span>{movies.release_date}</span> |
                                    <span className={averageRate(movies.vote_average)}> <i className="fas fa-star"></i> {movies.vote_average}</span>
                        </div>

                        {genres ? <h4 style={{ color: '#fff', marginBottom: '15px' }}>{movies.genre_ids.map((id, index) => {
                            return <span key={`genres[id]${index}`}>{(index ? ' ' : '') + genres[id]}</span>
                        })
                        }</h4> : null}

                        <div className="overview">

                            {(movies.overview) ? <small>{trancateText(movies.overview)}
                            </small> : ''}
                        </div>

                        <Link key={movies.id} to={{
                            pathname: `/movie/${movies.id}`,
                            state: { movies }
                        }}>
                            <button className='btn-slider'> <i className="fas fa-play"></i> <span>Preview now</span></button>
                        </Link>

                    </div>
                </div>
            </div>
        )
    })

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // speed: 2000,
        autoplaySpeed: 6000,
        pauseOnHover: false
    };


    return (
        <div>
            <Slider {...settings}>
                {slides}
            </Slider>
        </div>
    )
}

export default withRouter(ShowMoviesSlider)

