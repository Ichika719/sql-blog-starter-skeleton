import 'isomorphic-fetch';
import React, { Component } from 'react';

import cookie from 'cookie';

class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    fetch('/api/articles?token=' + cookie.parse(document.cookie).token)
      .then(res => res.json())
      .then(json => {
        this.setState({
          articles: json || [],
        });
      });
  }

  renderArticles() {
    const { articles } = this.state;
    return articles.map(article => (
      <tr>
        <td><a href={`#/articles/${article.id}`} key={article.id}>{article.title}</a></td>
        <td><a href={`#/articles/${article.id}`} key={article.id}>{(article.tags || []).join(', ')}</a></td>
        <th><a href={`#/articles/${article.id}`} key={article.id}>{article.createdAt}</a></th>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Created_at</th>
                </tr>
              </thead>
              <tbody>
                {this.renderArticles()}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <a href="#/" className="btn btn-default">
              <span className="glyphicon glyphicon-arrow-left" aria-hidden="true" /> Back
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;
