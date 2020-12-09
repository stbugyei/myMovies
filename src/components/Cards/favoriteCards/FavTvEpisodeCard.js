import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../useLocalStorage"
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import Notification from '../../Notification'
import '../../../styles/latestmovies.css'
import '../../../styles/searchlist.css'
import Placeholder from '../../../images/placeholder.jpeg'
const PosterUrl = "https://image.tmdb.org/t/p/original";


const FavTvEpisodeCard = (props) => {

    const { favTvEpisodeList, details, index, still_path, title, name, release_date, air_date, vote_average, overview, season_number, episode_number } = props

    const [favoriteTvEpisodeList, setFavoriteTvEpisodeList] = useLocalStorage("favoriteTvEpisodeList", []);
    const [notification, setNotification] = useState('');


    const addFavorite = (favMovie) => {
        if (!favoriteTvEpisodeList.some(fav => fav.id === favMovie.id)) {
            setFavoriteTvEpisodeList([...favoriteTvEpisodeList, favMovie])
            setNotification(`${favMovie.name} Added!`)

        } else {
            const newList = favoriteTvEpisodeList.filter((item) => item.id !== favMovie.id)
            setFavoriteTvEpisodeList(newList)
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

    const colorToggle = favoriteTvEpisodeList.filter(data => data.id === details.id)


    return (
        <>
            <div className="film-list__card">
                <div className="film-list__poster">
                    {still_path === null ? <img className="optional-image" src={Placeholder} alt="poster" /> :
                        <img src={`${PosterUrl}` + still_path} alt="poster" />}
                </div>
            </div>

            <div className="info-wrapper" style={{ position: 'relative' }}>

                {title || name ? <h5 className='title'>{title}{name} </h5> : <span>Nan</span>}

                <div className="date-rate">
                    <span><i className="far fa-calendar-alt"></i> {release_date}{air_date}</span>

                    <span className={averageRate(vote_average)}> <i className="fas fa-star"></i> {vote_average}</span>
                </div>
            </div>


            <div> {colorToggle.length !== 0 ? (
                <button className="btn-addfav" onClick={() => addFavorite(details)}>

                    <IoIosHeart
                        style={{ color: 'red', fontSize: '20px' }}
                    />
                    <Notification message={notification} />
                </button>
            ) : (
                    <button className="btn-addfav" onClick={() => addFavorite(details)}>
                        <IoIosHeartEmpty
                            style={{ color: 'white', fontSize: '20px' }}
                        />
                        <Notification message={notification} />
                    </button>
                )}
            </div>

            <Link to={{
                pathname: `/tv/season/episode/${favTvEpisodeList[index].episode_number}`,
                state: { favTvEpisodeList }
            }}>
                <div className="film-list__subdetails" >
                    {title || name ? <h4 style={{ marginBottom: '5px', textTransform: 'capitalize' }}>{title}{name}</h4> : <span>Nan</span>
                    }

                    {
                        (overview) ? <small className="sypnonis">{trancateText(overview)}
                        </small> : ''
                    }

                    <div className='film-list__countrygenre'>

                        {season_number ? <h5><span style={{ paddingRight: '2px' }}>Season :</span> <span>{season_number}</span></h5> : null}

                        {episode_number ? <h5><span style={{ paddingRight: '2px' }}>Episode :</span> <span>{episode_number}</span></h5> : null}

                        <button className='preview'> <i className="fas fa-play"></i> <span>Preview now</span></button>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default FavTvEpisodeCard
