import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [value, setValue] = React.useState(4);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/products");
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/categories");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleAddToCart = (productId) => {
    const _productId = productId;
    const userId = localStorage.getItem("userID");
    const token = cookies.access_token;

    console.log({ productId: _productId, userId });
    const _data = { productId: _productId, userId };
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:8080/api/addToCart", _data, { headers })
      .then((res) => {
        console.log(res.data, "49");
        if (res.data.code === 200) {
          // Handle success if needed
        }
      })
      .catch((err) => {
        console.log(err, "30");
      });

    if (!token) {
      alert("Please Login To Continue");
    }
  };

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (categoryName) => {
    const filtered = products.filter(
      (product) => product.categoryName === categoryName
    );
    setFilteredProducts(filtered);
  };

  const resetFilter = () => {
    setFilteredProducts([]);
    setSelectedCategory("");
  };

  return (
    <div className="product-list-container"> 
      <div class="search-function">
      <SearchSharpIcon class="search-icon"></SearchSharpIcon>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div class="select-category">
        <select 
          value={selectedCategory}
          onChange={(e) => handleCategoryFilter(e.target.value)}
        >
          <option value="">Sort by Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <button onClick={resetFilter}>Reset Filter</button>
      </div>
      
      <div class="all-filter-products">
      <h1>Filtered Results:</h1>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product._id}>
              {product.productImage && (
                <img
                  src={product.productImage.location}
                  alt={product.productImage.filename}
                />
              )}
              <strong>{product.productName}</strong>
              <p>{product.productDescription}</p>
              <p class="item-price">{product.amount}/- Only</p>
              <p>{product.category.categoryName}</p>
              <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
    <span class="free-delivery-txt">Free Delivery..!</span><br></br><br></br>
              
              <div class="cart-btn">
              <button onClick={() => handleAddToCart(product._id)}>
                Add to Cart
              </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p class="no-products-found">No products found.</p>
      )}

      <h1>All Products:</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.productImage && (
              <img
                src={product.productImage.location}
                alt={product.productImage.filename}
              />
            )}
            <strong>{product.productName}</strong>
            <p>{product.productDescription}</p>
            <p class="item-price">{product.amount}/- Only</p>
            <p>{product.categoryName}</p>
            <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
    <span class="free-delivery-txt">Free Delivery..!</span><br></br><br></br>
            
            <button onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default ProductList;