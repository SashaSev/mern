import React from 'react';
import {Link} from "react-router-dom";

const LinkList = ({links}) => {
    if (!links.length)  {
        return <p className="center">No LInks</p>
    }
    return (
            <table>
                <thead>
                <tr>
                    <th>N</th>
                    <th>Original</th>
                    <th>Reduction</th>
                    <th>Open</th>
                </tr>
                </thead>

                <tbody>
                {links.map((link,i) => {
                    return(
                        <tr key={link._id}>
                            <td>{i+1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )
                 })}

                </tbody>
            </table>
    );
};

export default LinkList;
