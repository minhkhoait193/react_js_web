import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import '../css/style.css';
import '../css/danhmuc.css';
class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (


        


        <tr key={item._id}  onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
    return (
      <div id="content">
        <h1>Quản lý danh mục</h1>
        <div class="function">
            
            <div class="category-list">
                <h2>
                    Danh sách chuyên mục
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Danh mục</th>
                        </tr>
                    </thead>
                    <tbody>
                       {cates}
                        
                    </tbody>
                </table>
            </div>
            <div className="inline" />
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div className="float-clear" />
    
        </div>
    </div>



      
      // <div>
      //   <div className="float-left">
      //     <h2 className="text-center">CATEGORY LIST</h2>
      //     <table className="datatable" border="1">
      //       <tbody>
      //         <tr className="datatable">
      //           <th>IDsss</th>
      //           <th>Name</th>
      //         </tr>
      //         {cates}
      //       </tbody>
      //     </table>
      //   </div>
      //   <div className="inline" />
      //   <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
      //   <div className="float-clear" />
      // </div>













    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
}
export default Category;