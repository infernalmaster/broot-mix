import React from "react";
import { connect } from "react-redux";
import {
  fetchProduct,
  productSelector,
  isLoadingSelector
} from "../../ducks/products";

class ShowProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const { product, isLoading } = this.props;

    if (isLoading) return <div>Loading...</div>;

    if (!product) return null;

    return (
      <div>
        <h1>{product.name}</h1>

        <div>{product.description}</div>

        <img src={product.image} alt={product.name} />
      </div>
    );
  }
}

export default connect(
  state => ({
    product: productSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { fetchProduct }
)(ShowProduct);
