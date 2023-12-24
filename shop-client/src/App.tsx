import React from 'react';
import 'App.css';
import ResponsiveAppBar from 'components/appBar';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'AppRouter';
import Footer from 'components/footer';

function App() {
 

  return (
    <>
    <BrowserRouter>
      <ResponsiveAppBar/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
