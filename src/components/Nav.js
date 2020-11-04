import React, { useState } from "react";
import { withRouter, NavLink, useHistory } from "react-router-dom";
import '../styles/nav.css'

const Nav = () => {

    //======= Navigation functions =========
    const history = useHistory();
    const handleClickHome = () => {
        history.push("/");
    }

    const [isopen, setIsopen] = useState(false)

    const handleClick = () => {
        setIsopen(!isopen)
    }

    const closeNavBar = () => {
        setIsopen(false)
    }


    return (
      
            <div className="wrapper-nav">
            <nav>
                <div className="logo-burger">
                    <div className="logo" onClick={handleClickHome}>StBugyei☻<span className="logo-movies">Movies</span>
                    </div>

                    <div className="hamburger" onClick={handleClick}>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                    </div>
                </div>

                 <ul className={isopen ? 'showNav' : 'undefined'}>
                    <div className="liwrapper">
                        <li>
                            <NavLink exact activeClassName="activenav" to="/" onClick={closeNavBar}> Home </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/latestmoviespage" onClick={closeNavBar}> Trending Movies </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/popularmoviespage" onClick={closeNavBar}> Popular Movies</NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/populartvpage" onClick={closeNavBar}> Latest Tv Episode</NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="activenav" to="/populartvshowspage" onClick={closeNavBar}> Popular Tv Shows </NavLink>
                        </li>
                    </div>
                </ul> 
            </nav>
        </div>
    )
}

export default withRouter(Nav)
