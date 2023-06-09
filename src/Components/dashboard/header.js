import React from "react"
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import cart from "../Images/cart.png"
import logout_img from "../Images/logout-logo.png"
import { useCookies } from "react-cookie";
import { useState } from "react";
import profile_img from "../Images/reg-user.png"
import useUserAPI from "../useUserApi";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import "../pages/styles/cartcount.css";
import axios from "axios";
import { useEffect } from "react";
import Website_logo from "../Images/website-logo-new2.png"
import logo from "../Images/Rent_logo-removebg-preview.png"



function Header() {

  const [cookies, setCookies] = useCookies(["access_token"]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchInput, setSearchInput] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const { isLogged, isAdmin, setIsLogged } = useUserAPI(cookies.access_token);

  console.log('isAdmin:', isAdmin);




  useEffect(() => {
    // Fetch the cart data and update the cartCount
    const fetchCartCount = async () => {
      const userId = localStorage.getItem("userID");
      const token = cookies.access_token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/getCart",
          { userId },
          { headers }
        );
        const cartData = response.data.data.cart || [];
        setCartCount(cartData.length);
      } catch (error) {
        console.log(error);
      }
    };

    if (cookies.access_token) {
      fetchCartCount();
    }
  }, [isLogged, cookies.access_token]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    setIsLogged(false);
    navigate("/");
    window.location.reload();
  };
  const adminRouter = () => {
    if (isAdmin) {
      return <li><Link to="/admin">Admin</Link></li>;
    }
    return null;
  };

  const handleSearch = () => {
    navigate(`/products?search=${searchInput}`);
  };



  return (
    <>
      <header>
        {/* <img class="website_logo" src={Website_logo} /> */}
        <div className="search_bar">
          <input
            className="search-input"
            type="search"
            placeholder="Search for Products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <input
            className="search-btn"
            type="button"
            value="Search"
            onClick={handleSearch}
          />
        </div>
        <div class="cart">
        {isAdmin ? (
              <>
               

              </>
            ) : (
              <>
              <Link to="/cart">
                <img src={cart} />
                {cartCount > 0 && <h3 class="cart-notification">{cartCount}</h3>}
              </Link>
                
              </>
            )}
          
        </div>
        <nav >
          <ul>


            {adminRouter()}

            <li><Link to="/" class="root">Home</Link></li>
            <hr class="dashboard-underline"></hr>

            <li><Link to="/blogs">Blogs</Link>
              <div class="sub-nav_1">
                <ul>
                  <li><Link to="#">Sellers</Link></li>
                  <li><Link to="#">Buyers</Link></li>
                </ul>
              </div>
            </li>
            <li><Link to="/products">Products</Link>
              <div class="sub-nav">
                <ul>
                  <li><Link to="#">Farm Machinery</Link>

                    <div class="sub-nav1">
                      <ul>
                        <li><Link to="#">Harvesters</Link></li>
                        <li><Link to="#">Sprayers</Link></li>
                        <li><Link to="#">Cultivaters</Link></li>
                        <li><Link to="#">Pipes</Link></li>
                        <li><Link to="#">more...</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><Link to="#">Pumps and Motors</Link>
                    <div class="sub-nav2">
                      <ul>
                        <li><Link to="#">domestic pumps</Link></li>
                        <li><Link to="#">Industrial pumps</Link></li>
                        <li><Link to="#">motors and Engines</Link></li>
                        <li><Link to="#">Agricultural pumps</Link></li>
                        <li><Link to="#">more...</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><Link to="#">Power Equipments</Link>
                    <div class="sub-nav3">
                      <ul>
                        <li><Link to="#"> Pipe sprinklers</Link></li>
                        <li><Link to="#">solar Products</Link></li>
                        <li><Link to="#">more...</Link></li>
                      </ul>
                    </div>

                  </li>
                  <li><Link to="#">Crop processors</Link>
                    <div class="sub-nav4">
                      <ul>
                        <li><Link to="#"> food packaging</Link></li>
                        <li><Link to="#">more...</Link></li>
                      </ul>
                    </div>

                  </li>
                  <li><Link to="#">Workshop tools</Link>
                    <div class="sub-nav5">
                      <ul>
                        <li><Link to="#">compressors</Link></li>
                        <li><Link to="#">power tools</Link></li>
                        <li><Link to="#">hand tools</Link></li>
                        <li><Link to="#">more...</Link></li>
                      </ul>
                    </div>

                  </li>
                </ul>
              </div>

            </li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>



          </ul>


          <div class="button">
            {!cookies.access_token ? (
              <>
                <Link to="/signin">
                  <button>Sign in</button>
                </Link>
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
                <Box sx={{ display: 'block', alignItems: 'right', textAlign: 'left ', marginTop: '-43px', marginLeft: '170px', transform: 'none' }}>
                  <Tooltip title="Manage Profile">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu class="menu"
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  sx={{
                    width: '250px'
                  }}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 20,
                        height: 9,
                        ml: 0,
                        mr: 0,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 2,
                        height: 10,
                        bgcolor: 'background.paper',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >

                  <MenuItem >
                    My account
                  </MenuItem>
                  <MenuItem>
                    <hr></hr></MenuItem>
                  <MenuItem>
                    <p>Please Sign Up to Manage<br></br> your Accounts.</p>
                  </MenuItem>



                </Menu>

              </>
            ) : (
              <>
                <img class="logout-logo" src={logout_img} />
                <button onClick={logout}>Logout</button>

                <img class="profile-pic" src={profile_img} />
                <Link to="/profile">
                  <button >My Account</button>
                  <span class="caret" ></span>
                </Link>
              </>
            )}
          </div>


        </nav>


        <div class="logo111">
              <img src={logo} />
            </div>
      </header>
      <div class="logo">
          <img class="website_logo" src={Website_logo} />
        </div>
        
      </>



  )
}
export default Header;

