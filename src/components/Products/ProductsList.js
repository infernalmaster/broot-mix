import React from "react";
import { connect } from "react-redux";
import { fetchProducts, productsSelector } from "../../ducks/products";

class ProductsList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div>
        <h1>ProductsList</h1>
        {this.props.products.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    products: productsSelector(state)
  }),
  { fetchProducts }
)(ProductsList);
