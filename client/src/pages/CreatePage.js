import React, {useEffect, useState, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom';

const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
     const [link, setLink] = useState('');

    useEffect(()=> {
        window.M.updateTextFields()
    },[]);

    const pressHandler = async (event) => {
        if(event.key === 'Enter'){
            try {
               const data =  await request("/api/link/generate", "POST",{from: link },{
                   Authorization : `Bearer ${auth.token}`
               });
               console.log(data);
             history.push(`/detail/${data.link._id}`)
            }catch (e) {

            }
        }
    };
    const changeHandler = (event) => {
              setLink(event.target.value)
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <label htmlFor="link">Enter Link</label>
                <input
                    onChange={changeHandler}
                    placeholder="Enter Link"
                    id="link"
                    type="text"
                    value={link}
                    onKeyPress={pressHandler}
                />

            </div>
        </div>
    );
};

export default CreatePage;
