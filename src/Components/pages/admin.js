import React, { useState, useEffect } from 'react';
import "./styles/admin.css"
import { useCookies } from "react-cookie";
import useUserAPI from "../useUserApi";
import AddCategory from '../admin-header/addCategory';

const Admin = () => {
  const [cookies] = useCookies(["access_token"]);
  const {  isAdmin } = useUserAPI(cookies.access_token);



  

  return (
    <div>

    
      {isAdmin ? (
        <>
      <AddCategory />
        </>
      ) : (
        <p>You do not have access to the admin module.</p>
      )}
    </div>
  );
};

export default Admin;
