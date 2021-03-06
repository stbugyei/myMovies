import React from 'react'
import { useHistory, withRouter, Link } from "react-router-dom";
import PrefetchCard from '../../Cards/PrefetchCard';
import '../../../styles/latestmovies.css'
import '../../../styles/searchlist.css'


const LatestMovies = (props) => {

    const { preFetchMovies, genres } = props


    //======= Navigation functions =========
    const history = useHistory();

    const handleClick = () => { history.push("/latestmoviespage"); }

    const movieCard = preFetchMovies.map((details, index) => {
        return (
            <div className="film-list__container" key={details.id}>
                <Link to={{
                    pathname: `/movie/${preFetchMovies[index].id}`,
                    state: { preFetchMovies }
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
                        genres = {genres}
                    />
                </Link>
            </div>
        )
    })

    return (
            <div className="film-list__wrapper">
                <div className='caption-div'>
                    <span> <h2>Trending Movies</h2></span>
                    <div><button className='btn-load' onClick={handleClick}>Load More <i className="fas fa-angle-right"></i></button></div>
                </div>
                <div className='film-list__cardwrapper'>
                    {movieCard}
                </div>
            </div>
    )
}


export default withRouter(LatestMovies)

