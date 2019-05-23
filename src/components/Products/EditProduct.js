import React from "react";
import { connect } from "react-redux";
import {
  fetchProduct,
  saveProduct,
  productSelector,
  isLoadingSelector
} from "../../ducks/products";

import ProductForm from "./ProductForm";

class EditProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const { product, isLoading, saveProduct } = this.props;

    if (isLoading) return <div>Loading...</div>;

    if (!product) return null;

    return (
      <div>
        <h1>EDIT {product.name}</h1>

        <ProductForm product={product} saveProduct={saveProduct} />
      </div>
    );
  }
}

export default connect(
  state => ({
    product: productSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { fetchProduct, saveProduct }
)(EditProduct);
