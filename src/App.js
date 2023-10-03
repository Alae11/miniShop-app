import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {PersistGate} from "redux-persist/integration/react";
import { store, persistor } from './store/configStore'; // adjust the path as needed


const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

            <QueryClientProvider client={queryClient}>
                <Router>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
