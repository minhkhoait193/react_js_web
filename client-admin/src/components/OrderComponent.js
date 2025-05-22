import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../css/style.css';
import '../css/lichsu.css';
class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id}  onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
          <td class="action-buttons">
            {item.status === 'PENDING' ?
            //   <div><span className="link">APPROVE</span> || <span className="link">CANCEL</span></div>
            <div><span class="action-button accept-button"  onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> 
             <span class="action-button reject-button" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span></div>

              : <div />}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div id="content">
        <div className="function">
          <h2 className="text-center">Danh sách đặt hàng</h2>
          <table >
            <thead>
              <tr >
                        <th>ID</th>
                        <th>Ngày đặt</th>
                        <th>Tên khách</th>
                        <th>Phone</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Action</th>
              </tr>
              {orders}
            </thead>
          </table>
        </div>
        {this.state.order ?
          <div className="function">
            <h2 className="text-center">ORDER DETAIL</h2>
            <table >
              <tbody>
                <tr >
                  <th>STT</th>
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Gía</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Order;