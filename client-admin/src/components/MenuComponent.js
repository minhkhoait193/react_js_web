import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";
import '../css/style.css';
import logo from './logo.png'
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
 
  render() {
    return (
      <div>
        <div id="header">
        <img src={logo}  alt=""/>
        <div class="admin-info">
            <img class="avatar" src="https://w7.pngwing.com/pngs/429/434/png-transparent-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome-silhouette-thumbnail.png" alt="Avatar"/>
            <span class="name-admin">Welcome,{this.context.username} |{" "} </span> 
            
            <Link to="/admin/home" onClick={() => this.lnkLogoutClick() }>
            Logout
          </Link>
        </div>
      </div>
      <div id="sidebar">
        <ul>
            {/* <li className="menu"><a href="/admin/home">Trang chủ</a></li>
            <li className="menu"><a href="/admin/category">Danh sách chuyên mục</a></li>
            <li className="menu"><a href="sanpham.html">Sản phẩm</a></li>
            <li className="menu"><a href="lichsu.html">Lịch sử đặt hàng</a></li>
            <li className="menu"><a href="quanly.html">Quản lý tài khoản khách hàng</a></li>
            <li className="menu"><a href="settings.html">Settings</a></li> */}
            <li className="menu"><Link to="/admin/home">Trang chủ</Link></li>
            <li className="menu"><Link to='/admin/category'>Danh sách chuyên mục</Link></li>
            <li className="menu"><Link to='/admin/product'>Sản phẩm</Link></li>
            <li className="menu"><Link to='/admin/order'>Lịch sử đặt hàng</Link></li>
            <li className="menu"><Link to="/admin/customer">Quản lý tài khoản khách hàng</Link></li>
        </ul>
      </div>
      





      {/* <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu">
              <Link to="/admin/home">Home</Link>
            </li>
            <li className="menu"><Link to='/admin/category'>Category</Link></li>
            <li className="menu"><Link to='/admin/product'>Product</Link></li>
            <li className="menu"><Link to='/admin/order'>Order</Link></li>
            <li className="menu"><Link to="/admin/customer">Customer</Link></li>
          </ul>
        </div>
        <div className="float-right">
          Hello <b>{this.context.username}</b> |{" "}
          <Link to="/admin/home" onClick={() => this.lnkLogoutClick() }>
            Logout
          </Link>
        </div>
        <div className="float-clear" />
      </div> */}
    </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }
}
export default Menu;