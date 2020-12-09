import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../useLocalStorage"
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import Notification from '../../Notification'
import '../../../styles/latestmovies.css'
import '../../../styles/searchlist.css'
import Placeholder from '../../../images/placeholder.jpeg'
const PosterUrl = "https://image.tmdb.org/t/p/w185";


const FavTvCard = (props) => {

    const { favTvList, index, details, poster_path, title, name, release_date, first_air_date, vote_average, overview, showTvGenres } = props

    const [favoriteTvList, setFavoriteTvList] = useLocalStorage("favoriteTvList", []);
    const [notification, setNotification] = useState('');

    const addFavorite = (favMovie) => {
        if (!favoriteTvList.some(fav => fav.id === favMovie.id)) {
            setFavoriteTvList([...favoriteTvList, favMovie])
            setNotification(`${favMovie.name} Added!`)

        } else {
            const newList = favoriteTvList.filter((item) => item.id !== favMovie.id)
            setFavoriteTvList(newList)
            setNotification(`${favMovie.name} Removed!`)
        }
    }

    useEffect(() => {
        const reset = setInterval(() => (setNotification("")), 5000)
        return () => {
            clearInterval(reset);
        }
    }, [])


    //============== Text trancating functions =========
    const trancateText = (text) => { return (text.substr(0, 200)).trim().concat(' ...') }

    //============== vote formmtting functions =========
    const averageRate = (rating) => {
        if (rating >= 8) {
            return 'green'
        } else if (rating >= 5) {
            return 'yellow'
        } else {
            return 'red'
        }
    }

    const colorToggle = favoriteTvList.filter(data => data.id === details.id)

    return (
        <>
            <div className="film-list__card">
                <div className="film-list__poster">
                    {poster_path === null ? <img className="optional-image" src={Placeholder} alt="poster" /> :
                        <img src={`${PosterUrl}` + poster_path} alt="poster" />}
                </div>
                <Link to={{
                    pathname: `/tv/${favTvList[index].id}`
                }}>
                    <button className='fav-preview'> <i className="fas fa-play"></i> <span>Preview now</span></button>
                </Link>
            </div>

            <div className="info-wrapper" style={{ position: 'relative' }}>

                {title || name ? <h5 className='title'>{title}{name} </h5> : <span>Nan</span>}

                <div className="date-rate">
                    <span><i className="far fa-calendar-alt"></i> {release_date}{first_air_date}</span>

                    <span className={averageRate(vote_average)}> <i className="fas fa-star"></i> {vote_average}</span>
                </div>
            </div>

            <div>
                <button className="btn-addfav" onClick={() => addFavorite(details)}>
                    {colorToggle.length !== 0 ? <IoIosHeart
                        style={{ color: 'red', fontSize: '20px' }}
                    /> :
                        <IoIosHeartEmpty
                            style={{ color: 'white', fontSize: '20px' }}
                        />}
                    <Notification message={notification} />
                </button>
            </div>

            <Link to={{
                pathname: `/tv/${favTvList[index].id}`,
                state: { favTvList }
            }}>
                <div className="film-list__subdetails" >
                    {title || name ? <h4 style={{ marginBottom: '5px', textTransform: 'capitalize' }}>{title}{name}</h4> : <span>Nan</span>
                    }

                    {
                        (overview) ? <small className="sypnonis">{trancateText(overview)}
                        </small> : ''
                    }

                    <div className='film-list__countrygenre'>

                        {showTvGenres ? <h5><span style={{ paddingRight: '2px' }}>Genre  :</span><span>{showTvGenres}</span></h5> : null}

                        <button className='preview'> <i className="fas fa-play"></i> <span>Preview now</span></button>
                    </div>
                </div>
            </Link>
        </>
    )

}

export default FavTvCard