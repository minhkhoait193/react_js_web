import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../css/style.css';
import '../css/danhmuc1.css';
class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="category-form">
        <h2>Chi tiết danh mục:</h2>
        <div class="form-group">
                    <label for="categoryName">Tên danh mục:</label>
                    <input type="text" placeholder="Nhập tên danh mục" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
                </div>

                <div class="form-group">
                    <label for="categoryId">ID:</label>
                    <input placeholder="ID" disabled type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} />
                </div>

                <div class="action-buttons">
                    
                  <input type="submit"class="action-button add-button" value="Thêm" onClick={(e) => this.btnAddClick(e)} />
                  <input type="submit"class="action-button edit-button" value="Sửa" onClick={(e) => this.btnUpdateClick(e)} />
                  <input type="submit"class="action-button delete-button" value="Xóa" onClick={(e) => this.btnDeleteClick(e)} />
                </div>
        {/* <form>
          <table>
            <tbody>
              <tr class="form-group" >
                <td>ID</td>
                <td><input placeholder="ID" disabled type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr class="form-group">
                <td>Name</td>
                <td><input type="text" placeholder="Nhập tên danh mục" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                  <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form> */}
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default CategoryDetail;