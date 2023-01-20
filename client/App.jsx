import React from "react";
import HomePage from "./containers/HomePage.jsx";
import PaymentsPage from "./containers/PaymentsPage.jsx";
import { Route, Routes } from "react-router";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/payments" element={<PaymentsPage />}></Route>
      </Routes>
    </div>
  )
}

export default App;