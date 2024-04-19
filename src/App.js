import React from "react";
import {  Route, Routes } from "react-router-dom";
import Signup from "./views/SignUp";
import AppLayout from "./layouts/AppLayout";
import Login from "./views/Login";
import NoteView from "./views/NoteView";





const App = () => {
    
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
