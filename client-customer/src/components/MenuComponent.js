import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
          <li className="menu"><Link to='/'>Home</Link></li>
            {cates}
          </ul>
        </div>
        <div className="float-right">
          <form className="search">
            <input type="search" placeholder="Enter keyword" className="keyword" />
            <input type="submit" value="SEARCH" />
          </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Menu;