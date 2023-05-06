import React, { Component } from 'react'
import Client from 'shopify-buy'
import { useState } from 'react';


const ShopContext = React.createContext();


const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
})

export class ShopProvider extends Component {

    state = {
        product: {},
        products: [],
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false
    }

    componentDidMount() {
        this.createCheckout()
    }

    createCheckout = async () => {
        // Create an empty checkout
    const checkout = await client.checkout.create().then((checkout) => {
    // Do something with the checkout
    localStorage.setItem("checkout-id", checkout.id)
    this.setState({checkout: checkout})
  });
    }

    fetchCheckout = async () => {

    }

    addItemtoCheckout = async () => {

    }

    removeLineItem = async (lineItemIDsToRemove) => {

    }

    fetchAllProducts = async () => {
        // Fetch all products in your shop
        // client.product.fetchAll().then((products) => {
        // Do something with the products
        // this.setState({products: products})

        const products = await client.product.fetchAll();
        this.setState({products: products})
  };
    

    fetchProductWithHandle = async (handle) => {
        const product = await client.product.fetchByHandle(handle).then((product) => {
            // Do something with the product
        this.setState({product: product})
          });
    };

    closeCart = () =>{}

    openCart = () => {}

    closeMenu = () => {}

    openMenu = () => {}

  render() {

    console.log(this.state.checkout)

    return (
      <ShopContext.Provider> 
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}


const ShopConsumer = ShopContext.Consumer;

export {ShopConsumer, ShopContext}

export default ShopProvider