import React from 'react';
import { render } from 'react-dom';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore, createMigrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './component/App';
import categoryReducer from './features/CategorySlice';
import productReducer from './features/ProductSlice';
import CurrencySlice from './features/CurrencySlice';
import CartSlice from './features/CartSlice';
import { migrations } from './features/Migration';

const MIGRATION_DEBUG = true;

const reducers = combineReducers({
	category: categoryReducer.reducer,
	product: productReducer.reducer,
	cart: CartSlice.reducer,
	currency: CurrencySlice.reducer
});

const persistConfig = {
	key: 'root',
	version: 17,
	migrate: createMigrate(migrations, { debug: MIGRATION_DEBUG }),
	storage
};

const persistedReducer = persistReducer(persistConfig, reducers);
document.title = "Entry Test"

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk]
});

const persistor = persistStore(store);

const app = document.createElement('div');

document.body.appendChild(app);

render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	app
);
module.hot.accept();
