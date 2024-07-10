import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
