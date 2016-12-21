import 'isomorphic-fetch';
import React, { Component } from 'react';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }

  handleRegister = () => {
    const body = this.state;
    console.log('body', body);
    fetch('/api/auth/signup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then(result => {
      this.setState({
        email: '',
        password: '',
        name: ''
      });
      console.log(result);
    });
  };

  handleLogin = () => {
    const body = this.state;
    fetch('/api/auth/signin', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then(result => {
      this.setState({
        email: '',
        password: '',
        name: ''
      });
      return result.json();
    }).then(result => {
      console.log(document.cookie);
      document.cookie = 'token=' + result.token + ';';
      console.log(document.cookie);
      console.log(result);
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <span className="input-group-addon" id="article-title">email</span>
              <input
                type="text"
                className="form-control"
                placeholder="email"
                aria-describedby="article-title"
                value={this.state.email}
                onChange={ e => {this.setState({ email: e.target.value });} }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <span className="input-group-addon" id="article-title">password</span>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                aria-describedby="article-title"
                value={this.state.password}
                onChange={ e => {this.setState({ password: e.target.value });} }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <span className="input-group-addon" id="article-title">name</span>
              <input
                type="text"
                className="form-control"
                placeholder="name"
                aria-describedby="article-title"
                value={this.state.name}
                onChange={ e => {this.setState({ name: e.target.value });} }
              />
            </div>
          </div>
        </div>
        <p><div className="btn btn-success btn-lg" role="button" onClick={ this.handleRegister }>註冊</div></p>
        <p><div className="btn btn-success btn-lg" role="button" onClick={ this.handleLogin }>登入</div></p>
      </div>
    );
  }
}

export default AuthPage;
