import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import './App.style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from '../NavigationBar';
import CartDarkOverlay from '../CartDarkOverlay';
import Categories from '../../route/Categories';
import Product from '../../route/Product';
import Cart from '../../route/Cart';
import FooterSection from '../FooterSection';
import ScrollIntoView from '../ScrollIntoView';

export default class App extends PureComponent {
	render() {
		return (
			<Router>
				<Helmet>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</Helmet>
				<ScrollIntoView />
				<div className="main-container">
					<NavigationBar />
					<CartDarkOverlay />
					<Routes>
						<Route path="/" exact element={<Categories />} />
						<Route path="/product" element={<Product />} />
						<Route path="/cart" element={<Cart />} />
					</Routes>
					<FooterSection />
				</div>
			</Router>
		);
	}
}
