import React from 'react';
import {Link} from "react-router-dom";

function Product({value}) {
    console.log(value)

    return (
        <div className='column is-4 has-text-centered'>
            <Link to={`/product/${value.id}`}>
                <div style={{width: '350px', height: '478px'}} className="contain ml-4">
                    <img className='image'
                         style={{width: '350px', height: '478px'}}
                         src={`${process.env.REACT_APP_UPLOAD_URL}${value.attributes.Thumbnail.data[0].attributes.url}`}/>

                    <div className="overlay"></div>
                </div>
            </Link>
            <div className="has-text-centered">
                <Link to={`/product/${value.id}`}>
                    <p className='title is-5 mt-3 mb-2 has-text-weight-normal texthover'>{value.attributes.Title}</p>
                </Link>
            </div>
            <div className="has-text-centered">
                <p style={{color: '#998E78', fontSize: '15px'}}>${value.attributes.Price}</p>
            </div>
        </div>
    );
}

export default Product;