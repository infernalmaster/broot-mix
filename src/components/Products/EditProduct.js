import React from "react";
import { connect } from "react-redux";
import {
  fetchProduct,
  saveProduct,
  productSelector,
  isLoadingSelector,
  deleteProduct
} from "../../ducks/products";

import ProductForm from "./ProductForm";

class EditProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  deleteCurrentProduct = () => {
    this.props.deleteProduct(this.props.product).then(isDeleted => {
      if (isDeleted) this.props.history.push("/products");
    });
  };

  render() {
    const { product, isLoading, saveProduct } = this.props;

    if (isLoading) return <div>Loading...</div>;

    if (!product) return null;

    return (
      <div>
        <h1>EDIT {product.name}</h1>

        <ProductForm product={product} saveProduct={saveProduct} />

        <button onClick={this.deleteCurrentProduct}>delete</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    product: productSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { fetchProduct, saveProduct, deleteProduct }
)(EditProduct);
