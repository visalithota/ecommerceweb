import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import './cart'

const Products = ({ addToCart,cartItemCount}) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState([]);
  const [addedItemsCount, setAddedItemsCount] = useState(0);



  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products');
        setProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const count = parseInt(localStorage.getItem('addedItemsCount'), 10) || 0;
    setAddedItemsCount(count);
  }, []);

  useEffect(() => {
    localStorage.setItem('addedItemsCount', addedItemsCount.toString());
  }, [addedItemsCount]);

 
  
  const handleAddToCart = (product) => {
    addToCart(product);
    const updatedCount = addedItemsCount + 1;
    setAddedItemsCount(updatedCount);
    setAddedToCart([...addedToCart, product.id]);

  };

  
 
 
  

  // Check if a product is already in the cart
  const isAddedToCart = (productId) => {
    return addedToCart.includes(productId);
  };
  
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const handleSignUp = () => {
    navigate('/signup');
    setIsDropdownOpen(false);
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
<div className='cart-container'>
<Link to='/Cart'>
  <img
    src="https://tse3.mm.bing.net/th?id=OIP.aFFKaLiQ98rk3erTkUQX_AAAAA&pid=Api&P=0&h=180"
    style={{ height: '40px', width: '60px' }}
    alt="Cart"
  />
  {/* Display the addedItemsCount in the header */}
  {addedItemsCount > 0 && ( <span  className="cart-count">{addedItemsCount}</span>)}
</Link>
</div>





       
      </div>

      <div>
      <div className="background" style={{ marginTop: '50px' }}>
  <img
    src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg"
    style={{ width: '100%', height: '400px', paddingBottom: '1px', marginTop: '0px' }}
    alt="Background"
  />
</div>

        <div id="product-wrapper">
          {filteredProducts.map((product, i) => (
            <div className="Products-card" key={i}>
              <img
                className="products-thumbnail"
                src={product.thumbnail}
                alt={`Thumbnail ${i}`}
              />
              <p><b>Title:</b> {product.title}</p>
              <p><b>Price:</b> {product.price} $</p>
              <p><b>Rating:</b> {product.rating} / 5</p>
              <div className="buttons-wrapper">
                <button className="btn" onClick={() => handleAddToCart(product)}> {isAddedToCart(product.id) ? 'Added to Cart' : 'Add to Cart'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
