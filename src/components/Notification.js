import React from 'react'

const Notification = ({ message }) => {

    const notifStyle = {
        color: '',
    }

    if (message.includes('Added')) {
        notifStyle.color = '#fff'
    }

    if (message.includes('Removed')) {
        notifStyle.color = 'red'
    }


    return (
        <div style={notifStyle} >
            <h5 className="notification">{message}</h5>
        </div>

    )
}

export default Notification
