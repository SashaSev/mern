import React from 'react';

const LinkCard = ({link}) => {
    return (
        <>
            <h2>Links</h2>

            <p>Your Link : <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Where: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Your Link :  <strong>{link.clicks}</strong></p>
            <p>Date : <strong>{new Date(link.date).toLocaleDateString()}</strong></p>

        </>
    );
};

export default LinkCard;
