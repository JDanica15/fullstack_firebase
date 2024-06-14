import './App.scss';
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Layout from './containers/Layout';

function App() {


  useEffect(() => {
    document.title = "Menu Management Portal"
  },[])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/app/*" element={<Layout />} />
          <Route
            path="*"
            element={
              <Navigate to={"/app/dashboard"} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
