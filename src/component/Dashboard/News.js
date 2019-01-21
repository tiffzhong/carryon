import React, { Component } from "react";
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
        "https://newsapi.org/v2/top-headlines?sources=abc-news&pageSize=3&apiKey=26f494317e574b859f9dd860351daa3f"
      )
      .then(res => {
        console.log(res.data.articles, "res.data from api");
        this.setState({
          articles: res.data.articles
          // articles: res.data.articles.splice(0, 3)
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
          <div class="news-news-news">
            <div className="news-display-image">
              <img src={article.urlToImage} alt="" key={article.author} />
            </div>

            <div className="news-display-title">
              <a href={article.url}>{article.title}</a>
              <br />
              {article.author}
              <br />
              {moment(article.publishedAt).format("MMMM Do YYYY h:mm a")}
            </div>
          </div>
        );
      });

    return <div className="holding-all-news">{news}</div>;
  }
}

export default News;
