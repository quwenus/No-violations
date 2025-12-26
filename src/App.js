import logo from './logo.svg';
import React from "react";
import { Route, Routes } from "react-router-dom"
import { Header, Main, Line } from "./main";
import Login from './Login';
import Register from './Register';
import Application from './Application';
import './App.css';
import Account from './Account';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Line />
              <Main />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/application' element={<Application />} />
        <Route path='/account' element={<Account />} />

        <Route path="*" element={<div>404 — Страница не найдена</div>} />
      </Routes>
    </div>
  );
}

export default App;
