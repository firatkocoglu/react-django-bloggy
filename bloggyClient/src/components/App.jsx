import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Home from './Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalContextProvider } from '../context/Context';
import BlogDetail from './BlogDetail';

function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-out' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/blogs/:blogID' element={<BlogDetail />} />
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
