import React,{useEffect,useCallback,useState,useContext}from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import LinkList from "../components/LinkList";

const LinksPage = () => {
    const [link,setLink] = useState([]);
    const {token} = useContext(AuthContext);
    const {loading,request} = useHttp();

    const fetchList = useCallback(async ()=> {
        try {
            const fetched = await request('/api/link', "GET", null, {
                Authorization: `Bearer ${token}`
            });

            setLink(fetched)
        }catch (e) {}
    },[request,token]);

    useEffect(() => {
        fetchList();
    },[fetchList]);

    if (loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinkList links={link}/>}
        </>
    );
};

export default LinksPage;
