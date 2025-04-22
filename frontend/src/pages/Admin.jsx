import React from 'react'
import { Navigate } from 'react-router-dom';

const Admin = () => {
    const isAdmin = localStorage.getItem("admin");
    if(isAdmin !=="true"){
        return(
            <>
                <div>
                    404 page not found
                </div>
            </>
        )
    }else{
        return (
            <div>
              Admin
            </div>
          )
    }
}

export default Admin
