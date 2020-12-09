import React from 'react'
import "./../styles/spinner.css"


const Spinner = () => {

    return (

        <div className="hearder">
            <div className="container">
                <div className="spin-position">
                    <div className="loader-wrapper">
                        <div className="box1 box"></div>
                        <div className="box2 box"></div>
                        <div className="box3 box"></div>
                        <div className="box4 box"></div>
                        <div className="box5 box"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spinner
