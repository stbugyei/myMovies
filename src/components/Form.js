import React from "react";
import '../styles/form.css'


const Form = ({ query, displayDiv, handleChange }) => {

    return (

        <div className="form">
            <input
                className='search-input'
                value={query}
                type='search'
                placeholder='Search ...'
                autoComplete='off'
                onChange={handleChange}
            />
            <button className='btn' onClick={displayDiv}><i className="fas fa-search"></i>
            </button>
        </div>
    )
}

export default Form