import React, { useEffect } from 'react';
import './App.css';
import "antd/dist/antd.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from './component/PrivateRoute';
import Auth from "./pages/Auth";
import BusinessOwner from "./pages/BusinessOwner";

function App() {
  useEffect(() => {
    let mode = process.env.NODE_ENV;
    // console.log(mode, "mode");
    if (mode === "production") {
      console.log = () => { }
    }

  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard"
            element={
              <PrivateRoute>
                <BusinessOwner />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
