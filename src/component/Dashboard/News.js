import React, { Component, useCallback } from "react";
import axios from "axios";
import moment from "moment";
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }
  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=26f494317e574b859f9dd860351daa3f"
      )
      .then(res => {
        console.log(res.data.articles, "res.data from api");
        this.setState({
          articles: res.data.articles
        });
      });
  };
  render() {
    const { articles } = this.state;
    const news =
      articles.length > 0 &&
      articles.map(article => {
        console.log(article, "%%%%");
        return (
          <div className="news-api">
            <div className="article-date">
              {moment(article.publishedAt).format("MMMM Do YYYY h:mm:ss a")}
            </div>
            <div className="article-title">
              <a href={article.url}>{article.title}</a>
            </div>
            <img src={article.urlToImage} key={article.author} />
            <div className="article-description">{article.description}</div>
            ---
          </div>
        );
      });
    // console.log(news);
    return <div className="BLAH">{news}</div>;
  }
}

export default News;
