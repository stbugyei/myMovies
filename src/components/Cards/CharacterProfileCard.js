import React from 'react'
import { Link } from "react-router-dom";
import '../../styles/showmovies.css';
import placeholder from '../../images/placeholder.jpeg';
const PosterUrl = "https://image.tmdb.org/t/p/original";

const CharacterProfileCard = (props) => {

    const { movie } = props

    const profileCard = movie.credits.cast.slice(0, 16).map((data) => {

        return (
            <div className="character-profile__card" key={data.id}>
                <Link key={data.id} to={{
                    pathname: `/person/${data.id}`,
                    state: { movie }
                }}>
                    <div className="profile-avatar">
                        {data.profile_path === null ? <img src={placeholder} alt="" /> : <img src={`${PosterUrl}` + data.profile_path} alt="" />}
                    </div>
                    <div className="profile-info">
                        <h3>{data.name}</h3>
                        <h5>{data.character}</h5>
                    </div>
                </Link>
            </div>
        )
    })

    return (
        <>
            {profileCard}
        </>
    )
}

export default CharacterProfileCard
