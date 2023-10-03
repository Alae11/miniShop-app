import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './NavBar.css';
import {AiOutlineHome, AiOutlineShoppingCart} from "react-icons/ai";
import {IconContext} from "react-icons";
import {useSelector} from "react-redux";


const Nav = styled.nav`
  background: #333;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;

`;

const NavLink = styled(Link)`
  color: #fff;
  margin: 0 15px;
  text-decoration: none;
  margin-left: 30px;
  margin-right:70px ;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
    const cartItemCount = useSelector(
        state => state.cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0
    );

    return (
           <Nav className="navbar">
                <NavLink className="navbar-link" to="/">
                    <IconContext.Provider
                        value={{ color: 'white', size: '30px' }}
                    >
                        <div>
                            <AiOutlineHome />
                        </div>
                    </IconContext.Provider>                </NavLink>

                <NavLink className="navbar-link" to="/cart">
                    <IconContext.Provider
                        value={{ color: 'white', size: '30px' }}
                    >
                        <div>
                            <AiOutlineShoppingCart />
                            {cartItemCount > 0 && (
                                <span className="cart-count">{cartItemCount}</span>
                            )}
                        </div>
                    </IconContext.Provider>
                </NavLink>
           </Nav>
    );
};

export default Navbar;
