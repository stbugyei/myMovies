import React, { useState, useEffect } from "react";
import './../styles/currentdate.css'


const CurrentDate = () => {

    const [geolocation, setGeolocation] = useState('')

    const [url] = useState("https://get.geojs.io/v1/ip/geo.json")

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(contents => setGeolocation(contents))
            .catch((error) => console.log(error))

    }, [url])


    //=== Time ===
    let curHour = new Date();
    let formatedTime = curHour.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    let curTime = formatedTime.slice(0, 5);
    let meridiem = formatedTime.substr(5, 6);


    //=== Date ===
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDate = new Date()
    let formatedDate = days[currentDate.getDay()] + " " + currentDate.getDate() + " " + months[currentDate.getMonth()]


    return (
        <div className="date-wrapper">
            <li className="curtime"> <span>{curTime}</span><span className="meridiem">{meridiem}</span></li>
            { geolocation ? <li className="formatedDate1">{geolocation.city}, {geolocation.country}</li> : ''}
            <li className="formatedDate">{formatedDate}</li>
        </div>
    )
}

export default CurrentDate
