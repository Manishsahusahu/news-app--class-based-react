import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [];
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = "https://newsapi.org/v2/everything?q=cricket&from=2022-07-15&sortBy=popularity&apiKey=c117423dc62e4fb2a8a00ba3b24e726f&pagesize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles })
    }
    handlePrev = async () => {
        let url = `https://newsapi.org/v2/everything?q=cricket&from=2022-07-15&sortBy=popularity&apiKey=c117423dc62e4fb2a8a00ba3b24e726f&page=${this.state.page - 1}&pagesize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, page: this.state.page - 1 });
    }
    handleNext = async () => {
        // Maximum limit of news items is only 120 as of now form news api
        if (this.state.page+1 < Math.ceil(120 / 20)) {
            let url = `https://newsapi.org/v2/everything?q=cricket&from=2022-07-15&sortBy=popularity&apiKey=c117423dc62e4fb2a8a00ba3b24e726f&page=${this.state.page + 1}&pagesize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ articles: parsedData.articles, page: this.state.page + 1 });
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey Top-headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button>
                </div>
            </div>
        )
    }
}

export default News