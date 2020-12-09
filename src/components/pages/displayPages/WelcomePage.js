import React from 'react'
import { useHistory } from "react-router-dom";
import '../../../styles/latestmovies.css'
import CurrentDate from '../../CurrentDate';

const WelcomePage = () => {

    //======= Navigation functions ========
    const history = useHistory();
    const handleClickHome = () => {
        history.push("/home");
    }


    return (
        <>
            <div className="welcome__wrapper">
                <button className="btn-welcome" onClick={
                    handleClickHome
                }>STBugyei Movies</button>
                <CurrentDate />
            </div>
        </>

    )
}

export default WelcomePage
