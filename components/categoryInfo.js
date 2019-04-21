import React, { Component } from 'react';
import DOMPurify from 'dompurify'

const CategoryInfo = ({ categoryInfos }) => (
    <div className="categoryInfo">
        {!!categoryInfos &&
        categoryInfos.map(cat => (
            <div className="categoryInfoItem">
                <div className="categoryContent">
                    <h2>{cat.title}</h2>
                    <div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(cat.content)}}></div>
                </div>
                <div className="categoryImage">
                    <img className="categoryImage" src={cat.img_url}/>
                </div>
            </div>
        ))
        }
    </div>
);

export default CategoryInfo