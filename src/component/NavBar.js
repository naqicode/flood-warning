import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    
    <header>
     
        <NavLink to='/'>
            <h1 id="nav-title">Flood.Monitoring</h1>
        </NavLink>
      

        
            <nav>
                <ul className='nav-links'>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>

                    <li>
                        <NavLink to='/BoxOne'>BoxOne</NavLink>
                    </li>

                    <li>
                        <NavLink to='/BoxTwo'>BoxTwo</NavLink>
                    </li>

                    <li>
                        <NavLink to='/BoxThree'>BoxThree</NavLink>
                    </li>

                </ul>
            </nav>
            

    </header>
  )
}

export default NavBar
