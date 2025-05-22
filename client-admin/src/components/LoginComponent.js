import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import "../css/login.css"
// import "../js/fontawesome.js"
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        // <div className="align-valign-center">
        //   <h2 className="text-center">ADMIN LOGIN</h2>
        //   <form>
        //     <table className="align-center">
        //       <tbody>
        //         <tr>
        //           <td>Username</td>
        //           <td><input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
        //         </tr>
        //         <tr>
        //           <td>Password</td>
        //           <td><input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
        //         </tr>
        //         <tr>
        //           <td></td>
        //           <td><input type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
        //         </tr>
        //       </tbody>
        //     </table>
        //   </form>
        // </div>
        <div className="signinform">
  <h1>ADMIN</h1>
  {/* container */}
  <div className="container">
    {/* main content */}
    <div className="w3l-form-info">
      <div className="w3_info">
        <h2>Login</h2>
        <form action="#" method="post">
          <div className="input-group">
            <span><i className="fas fa-user" aria-hidden="true" /></span>
            {/* <input type="email" placeholder="Tên đăng nhập" required /> */}
            <input type="text" className="user" placeholder="Tên đăng nhập" required value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
          </div>
          <div className="input-group">
            <span><i className="fas fa-key" aria-hidden="true" /></span>
            {/* <input type="Password" placeholder="Password" required /> */}
            <input type="password" className="pass" placeholder="Password" required value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
          </div>
          <div className="form-row bottom">
            <div className="form-check">
              <input type="checkbox" id="remenber" name="remenber" defaultValue="remenber" />
              <label htmlFor="remenber"> Remember me?</label>
            </div>
            <a href="#url" className="forgot">Forgot password?</a>
          </div>
          <input type="submit" className="btn btn-primary btn-block" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} />
          {/* <button className="btn btn-primary btn-block" type="submit">Login</button> */}
        </form>
        {/* <p className="continue"><span>or Login with</span></p>
        <div className="social-login">
          <a href="#facebook">
            <div className="facebook">
              <span className="fab fa-facebook-f" aria-hidden="true" />
            </div>
          </a>
          <a href="#twitter">
            <div className="twitter">
              <span className="fab fa-twitter" aria-hidden="true" />
            </div>
          </a>
          <a href="#google">
            <div className="google">
              <span className="fab fa-google" aria-hidden="true" />
            </div>
          </a>
        </div> */}
        <p className="account">Don't have an account? <a href="#signup">Sign up</a></p>
      </div>
    </div>
    {/* //main content */}
  </div>
</div>

      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;