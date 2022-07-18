import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, publishedAt, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {source.name}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                        <h5 className="card-title">{title ? ((title.length <= 45) ? title : title.slice(0, 45)) : title}...</h5>
                        <p className="card-text">{description ? (description.length <= 88 ? description : description.slice(0, 88)) : description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} {publishedAt ? `On ${new Date(publishedAt).toGMTString()}` : ""}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;