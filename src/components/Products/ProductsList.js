import React from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  productsSelector,
  isLoadingSelector,
  totalPagesSelector
} from "../../ducks/products";
import qs from "query-string";

import { Link } from "react-router-dom";

class ProductsList extends React.Component {
  componentDidMount() {
    const page = this.getPageNumber(this.props);
    this.props.fetchProducts(page).then();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevPage = this.getPageNumber(prevProps);
    const page = this.getPageNumber(this.props);
    if (page !== prevPage) {
      this.props.fetchProducts(page);
    }
  }

  getPageNumber = props => Number(qs.parse(props.location.search).page || 1);

  render() {
    let pages = new Array(this.props.totalPages)
      .fill(null)
      .map((_v, i) => i + 1);

    return (
      <div>
        <h1>
          ProductsList <Link to="/products/new">New Product</Link>
        </h1>

        {this.props.isLoading && <div>Loading...</div>}

        {this.props.products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>{" "}
            <Link to={`/products/${product.id}/edit`}>edit</Link>
          </div>
        ))}

        <div>
          {pages.map(p => (
            <Link key={p} to={`/products?page=${p}`}>
              {p}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    products: productsSelector(state),
    isLoading: isLoadingSelector(state),
    totalPages: totalPagesSelector(state)
  }),
  { fetchProducts }
)(ProductsList);
