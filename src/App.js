import React, { Suspense, useEffect, useState } from "react";

import Router from "./router";
import { Outlet, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";

import Signup from "./views/SignUp";
import AppLayout from "./layouts/AppLayout";
import Login from "./views/Login";
import NoteView from "./views/NoteView";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";




const App = () => {
    // const [isAuth,setIsAuth]=useState()
    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChanged(auth,(user)=>{
    //         if(user){
    //             setIsAuth(user);
    //             return;
    //         }
    //         setIsAuth(null);
    //     });
    //     return ()=>unsubscribe();
    // },[])
    return (
        <>
          
                
          <Routes>
                <Route path='/home' element={<AppLayout />}></Route>
                <Route path='/notes/add' element={<NoteView/>}></Route>
                <Route path='notes/edit/:noteId' element={<NoteView/>}></Route>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
        </>
        
    );
};

export default App;
