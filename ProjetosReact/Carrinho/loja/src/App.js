import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cart from './components/Cart';
import Products from './components/Products';
import logo from './logo.svg';
import './App.css';

/**
* Função para chamar API
* @param {string} url caminho da função 
* @param {string} method método do função 
* @returns objeto de resposta
*/
async function api(url, method, body = undefined) { 
  return await fetch(`http://localhost:4000${url}`, { 
    body: body !== undefined ? JSON.stringify(body) : body, 
    method: method,
    headers: {
      Accept: "application/json", 
      "Content-Type": "application/json"
    }
  }).then((res) => res.json());
}

/**
* Busca todos os produtos da API 
* @returns lista de produtos
*/
async function apiGetProducts() {
  const data = await api("/products", "GET"); 
  return data.products;
}

/**
* Salva o carrinho de compras na API
* @param {Object[]} products lista de produtos
*/
async function apiSubmitCart(products) {
  await api("/purchases", "POST", { products });
}

function App() {
  const [productsLoading, setProductsLoading] = useState(false); // Status do loading de produtos
  const [products, setProducts] = useState([]); // Lista de produtos
  const [cart, setCart] = useState([]); // Lista de produtos no carrinho
  const [cartLoading, setCartLoading] = useState(false); // Status do loading do carrinho

  /**
  * Busca os produtos
  */
  async function getProducts() {
    setProductsLoading(true); // Ativa loading de produtos
    setProducts(await apiGetProducts()); // Salva lista de produtos na variável global
    setProductsLoading(false); // Desativa loading de produtos
  }

  /**
  * Salva o carrinho
  */
  async function submitCart() {
    setCartLoading(true); // Ativa loading do carrinho
    await apiSubmitCart(cart); // Salva o carrinho
    setCart([]); // Limpa o carrinho
    setCartLoading(false); // Desativa loading do carrinho

    getProducts(); // Busca os produtos novamente
  }

  /**
  * Altera unidades do produto
  */
  function setProduct(product, change) {
    const existingProduct = cart.find(({ id }) => id === product.id);
    product.units += change;
    if (product.units > 0) {
      setCart((prevCart) => [...prevCart.filter(({ id }) => id !== product.id), product]);
    } else {
      setCart((prevCart) => prevCart.filter(({ id }) => id !== product.id));
      setProducts((prevProducts) => [...prevProducts, product]);
    }
  }

  /**
  * Adiciona produto no carrinho
  */
  function addProduct(product) {
    product.units = 1;
    setCart((prevCart) => [...prevCart, product]);
    setProducts((prevProducts) => prevProducts.filter(({ id }) => id !== product.id));
  }

  useEffect(() => {
    getProducts();
  }, []);

  /* Elemento main personalizado com CSS */ 
  const SMain = styled.main`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 300px 1fr; 
    grid-template-rows: 1fr;
  `;

  return (
    <SMain>
      <Cart
        products={cart}
        onChange={setProduct} 
        onClick={submitCart} 
        isLoading={cartLoading}
      />
      <Products
        products={products}
        onClick={addProduct}
        isLoading={productsLoading}
      />
    </SMain>
  );
}

export default App;
