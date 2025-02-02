import React, {useState,useContext,useCallback,useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useParams} from 'react-router-dom';
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = () => {
    const {request,loading} = useHttp();
    const {token} = useContext(AuthContext);
    const [link, setLink]  =  useState(null);
    const linkId = useParams().id;

    const getLink = useCallback( async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, "GET", null , {
                Authorization: `Bearer ${token}`
            });
            setLink(fetched)
        }catch (e) {}
    },[token,linkId,request]);

    useEffect(() => {
        getLink();
    },[getLink]);

    if(loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    );
};

export default DetailPage;
