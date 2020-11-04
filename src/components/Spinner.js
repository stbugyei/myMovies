import React from 'react'
import "./../styles/spinner.css"


const Spinner = () => {
    return (
        <div className="hearder">
            <div className="container">
                <div className="spin-position">
                    <div className="spin">
                        <div className="spin-sector spin-sector-first"></div>
                        <div className="spin-sector spin-sector-second"></div>
                        <div className="spin-sector spin-sector-third"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spinner
