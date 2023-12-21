import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./index.css";


const Cart = ({ cartItems, removeFromCart}) => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState(cartItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

   const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
  };
  

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const handleSignUp = () => {
    navigate("/signup");
    setIsDropdownOpen(false);
  };

  const handleRemove = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    removeFromCart(index);
  };
  

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

 
  useEffect(() => {
    let initialSubtotal = 0;
    items.forEach((item) => {
      if (!isNaN(item.price)) {
        initialSubtotal += item.price * (item.quantity || 1);
      }
    });
    setSubtotal(initialSubtotal);
  }, [items]);
  

  const handleQuantityChange = (e, index) => {
    const updatedItems = [...items];
    const newQuantity = parseInt(e.target.value, 10);
    updatedItems[index].quantity = newQuantity || 1; // Default to 1 if NaN or 0
    setItems(updatedItems);
  };
 


  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const updateLocalStorage = (updatedCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };


  

  return (
    
    <div>
      
      <div id="heading" className='header'>
        <Link to="/">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.TMeUqek3CfxXKzm3OqsAJgHaHa&pid=Api&P=0&h=180"
            style={{ height: '50px', width: '60px' }}
            alt="Logo"
          />
        </Link>
        <div className='search-bar'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Search Products'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className='dropdown'>
          <button onClick={handleDropdownToggle} className='dropbtn'>
            My Account
          </button>
          {isDropdownOpen && (
            <div className='dropdown-content'>
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          )}
        </div>
        <Link to='/Cart'>
        <img
            src="https://tse3.mm.bing.net/th?id=OIP.aFFKaLiQ98rk3erTkUQX_AAAAA&pid=Api&P=0&h=180"
            style={{ height: '40px', width: '60px' }}
            alt="Cart"
          />
        </Link>
      </div>
      

      <div className="background" style={{ marginTop: '50px' }}>
  <img
    src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2023/BAU2023/ATFGW/LIGHTING-GWUNRECPC._CB570774247_.jpg"
    style={{ width: '100%', height: '400px', paddingBottom: '1px', marginTop: '0px' }}
    alt="Background"
  />
</div>
    
      
      <div id="products-wrapper">
        {items.map((item, index) => (
          <div key={index} className="product-card">
            <p>
              <b>{item.title}</b>
            </p>
            <img
              className="product-thumbnail"
              src={item.thumbnail}
              alt={item.title}
            />
            <p>
              <b>Price: ${item.price.toFixed(2)}</b>
            </p>
            <select
              className="quantity-dropdown"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e, index)}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            
            <button
              className="remove-from-cart-button"
              onClick={() => handleRemove(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
       
    
      <div>
        <h3 style={{textAlign:"center"}}>Subtotal: ${subtotal.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
