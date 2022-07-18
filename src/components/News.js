import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    articles = [];
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading:true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMonkey - ${this.capitalize(this.props.category)}`;
    }
    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c117423dc62e4fb2a8a00ba3b24e726f&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false });
    }
    async componentDidMount() {
        this.updateNews();
    }
    handlePrev = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNext = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c117423dc62e4fb2a8a00ba3b24e726f&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults });
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center my-5'>NewsMonkey - Top {this.capitalize(this.props.category)} headlines</h2>
                {this.state.loading ? <Spinner /> : ''}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source} />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
                    {/* <button disabled={this.state.page + 1 >= this.state.totalResults/5 } type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button> */}
                    <button disabled={this.state.page + 1 >= 6} type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button>
                    {/* // Maximum limit of news items is only 1${this.props.726f&pagesize=${this.props.pageSize}&pagesize=${this.props.pageSize}} as of now form news api */}
                </div>
            </div>
        )
    }
}

export default News