import React, { Component } from 'react';
import { Link } from "react-router-dom";
import notFound from "../../css/images/404.png";

class index extends Component {
    render() {
        return (
            <div className="not-found-page" style={{positon:'relative'}}>
                <img src={notFound} style={{maxWidth: '100%', height: 'auto', width: '100%'}} alt="not-found" />
                <Link to="/" className="btn-cm btn-primary bnt-m-continue"> Continue To Home</Link>
            </div>
        );
    }
}

export default index;