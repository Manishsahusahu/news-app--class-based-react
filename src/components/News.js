import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles=[];
    constructor(){
        super();
        this.state={
            articles: this.articles,
            loading: false
        }
    }
    async componentDidMount(){
        let url="https://newsapi.org/v2/everything?q=cricket&from=2022-07-15&sortBy=popularity&apiKey=c117423dc62e4fb2a8a00ba3b24e726f";
        let data= await fetch(url);
        let parsedData= await data.json();
        this.setState({articles:parsedData.articles})
    }
    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey Top-headlines</h2>
                <div className="row">
                {this.state.articles.map((element)=>{
                    return (
                    <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url } />
                    </div>
                    );
                })}
                </div>
            </div>
        )
    }
}

export default News