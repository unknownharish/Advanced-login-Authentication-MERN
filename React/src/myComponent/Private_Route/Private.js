import React from 'react';
import { Redirect, Route } from 'react-router-dom';


export default function Private({ component: Component, ...rest }) {

    // console.log(...rest);
    // localStorage.setItem('token', 'token');
    return (

        <Route
            {...rest}

         render ={
             (props)=>localStorage.getItem('authtoken')?<Component {...props}/>:<Redirect to='/login'/>
         } 

        />

    )


}
