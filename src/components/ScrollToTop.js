import React, { useState, useEffect } from "react";
import '../styles/scrolltotop.css'



const ScrollToTop = () => {

    const [display, setDisplay] = useState(false);

    //========== Onclick function to move the page to the top ===========//
    const scrollTotop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }

    //========== A flag event to toggle the state with pageYoffset ===========//
    const scrollPosition = () => {
        window.pageYOffset > 400 ? setDisplay(true) : setDisplay(false);
    }

    //========== A Style function to change the visibility of the scroll button ===========//
    const scrollVisibility = () => {
        return { transform: display ? 'scale(1)' : 'scale(0)' };
    }

    useEffect(() => {
        const reset = setInterval(() => scrollPosition(), 1000)
        return () => {
            clearInterval(reset);
        }
    }, []);


    return (

        <>
            <button className='scroll' style={scrollVisibility()} onClick={scrollTotop}><i className="fas fa-angle-double-up"></i></button>
        </>

    )
}

export default ScrollToTop
