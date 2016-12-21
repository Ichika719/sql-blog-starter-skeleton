import React, { Component } from 'react';

import cookie from 'cookie';

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Hi, Welcome Blog!</h1>

              { cookie.parse(document.cookie).token ? [
                <p><a className="btn btn-success btn-lg" href="#/articles" role="button">文章列表</a></p>,
                <p><a className="btn btn-success btn-lg" href="#/articles/new" role="button">發表新文章</a></p>,
              ] : [
                <p><a className="btn btn-success btn-lg" href="#/auth" role="button">登入</a></p>
              ] }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
