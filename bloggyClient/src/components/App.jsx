import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Home from './Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalContextProvider } from '../context/Context';

function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-out' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
