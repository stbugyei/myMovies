import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import placeholder from './../../../images/placeholder.jpeg'
import '../../../styles/showmovies.css'
import Spinner from '../../Spinner';
import ShowPersonCard from "../../Cards/ShowPersonCard";

const PosterUrl = "https://image.tmdb.org/t/p/w185";
const PosterUrlOriginal = "https://image.tmdb.org/t/p/original";
let urls = "https://api.themoviedb.org/3/person/";
let api_key = "04c35731a5ee918f014970082a0088b1";
let append = "&append_to_response=videos,images,combined_credits"

const ShowPerson = (props) => {

    const { genres } = props
    const { id } = useParams();

    const [personInfo, setPersonInfo] = useState('');
    const [biography, setBiography] = useState('');
    const [additionalNames, setAdditionalNames] = useState('');
    const [placeOfBirth, setPlaceOfBirth] = useState('');
    const [error, setError] = useState(false);
    const [baseUrl] = useState(`${urls}${id}?api_key=${api_key}${append}`);

    useEffect(() => {

        const getPerson = async () => {

            const person = await fetch(baseUrl);

            if (person) {
                try {
                    const personalDetails = await person.json();
                    setPersonInfo(personalDetails)

                    //========= Extracting Personal data =========
                    setBiography(personalDetails.biography);
                    setAdditionalNames((personalDetails.also_known_as).slice(0, 3).join(', '));
                    setPlaceOfBirth(personalDetails.place_of_birth);
                    setError('');

                } catch (error) {
                    console.log(error)
                }

            } else {
                setError(<><span>The esource is not available</span></>)
            }
        }
        getPerson();
    }, [baseUrl]);


    if (!(personInfo && Object.keys(personInfo).length)) {
        return <Spinner />
    }


    const crew = personInfo.combined_credits.crew.map((crew, i) => {
        return (
            <div className='crew-details' key={i} >
                <div>{crew.title}</div>
                <div>{crew.job} </div>
            </div>
        )
    })


    const castRow = personInfo.combined_credits.cast.length
    const crewRow = personInfo.combined_credits.crew.length

    return (

        <div className="hearder">
            <div className="container">
                <div className='showmovies_wrapper'>
                    {!error ? <ShowPersonCard
                        personInfo={personInfo}
                        genres={genres}
                        additionalNames={additionalNames}
                        crew={crew}
                        placeOfBirth={placeOfBirth}
                        biography={biography}
                        crewRow={crewRow}
                        castRow={castRow}
                        placeholder={placeholder}
                        PosterUrl={PosterUrl}
                        PosterUrlOriginal={PosterUrlOriginal}
                    /> : error}
                </div >
            </div>
        </div>
    )
}

export default withRouter(ShowPerson)
