import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Home } from './Home';
import CardListing from './CardListing';
import { CardDetails } from './CardDetails';
import { CartAddItems } from './CartAddItems';
import CartEditItems from './CartEditItems';
const Header = () => 
{
    const [mode,setMode]=useState('dark');

    //navigate the Page to Add new CART
    const navigate=useNavigate();

    const darkTheme = createTheme({
        palette: {
          mode: mode,
        },
      });
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AppBar position="static">
            <Toolbar className='Header'>
               <div>
                <Link to='/products'><label id='logo'>products</label></Link>
               </div>
               <div>
            <Button variant="text" color='inherit' onClick={()=> navigate(`/products/add`)}>Add item</Button>

               <IconButton aria-label="theme" onClick={()=>setMode(mode ==='dark'?'light':'dark')}>
                {mode==='dark'?<LightModeIcon/>:<DarkModeIcon/>}
</IconButton>
               </div>
            </Toolbar>
            </AppBar>
            </ThemeProvider>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/products' element={<CardListing/>}/>
                <Route path='/products/:id' element={<CardDetails/>}/>
                <Route path='/products/add' element={<CartAddItems/>}/>
                <Route path='/products/edit/:id' element={<CartEditItems/>}/>
            </Routes>
           
        </div>
    );
};

export default Header;



