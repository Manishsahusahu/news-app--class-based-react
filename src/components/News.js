import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }
    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(35);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `NewsMonkey - ${capitalize(props.category)}`;
        updateNews();
        // eslint disable-next-line
    }, []);
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }
    return (
        <div className='container' style={{marginTop:'5rem'}}>
            <h2 className='text-center my-5'>NewsMonkey - Top {capitalize(props.category)} headlines</h2>
            {loading ? <Spinner /> : ''}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !==totalResults}
                loader={<Spinner />}
            >
                <div className="row">
                    {articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source} />
                            </div>
                        );
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News