import React from 'react'
import '../styles/banner.css'
import Nav from './Nav'

const Banner = (props) => {

    const { genresforMovies, genresforTv } = props

    return (

        <div className='banner-wrapper'>
            <Nav genresforMovies={genresforMovies} genresforTv={genresforTv} />
        </div>
    )
}

export default Banner
