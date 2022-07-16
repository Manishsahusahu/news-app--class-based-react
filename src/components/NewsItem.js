import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{width:"18rem"}}>
                    <img src={imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{(title.length<=45)?title:`${title.slice(0,45)}...`}</h5>
                            <p className="card-text">{description.length<=88?description:`${description.slice(0,88)}...`}</p>
                            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;