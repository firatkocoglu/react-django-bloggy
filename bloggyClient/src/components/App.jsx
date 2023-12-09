import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Home from './Home';
import Results from './Results';
import WriteBlog from './WriteBlog';
import Profile from './Profile';
import AllSavedBlogs from './AllSavedBlogs';
import YourBlogs from './YourBlogs';
import ResetPassword from './ResetPassword';
import NotFound from './NotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalContextProvider } from '../context/Context';
import BlogDetail from './BlogDetail';
import NewPassword from './NewPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalContextProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path='/sign-in' element={<Login />} />
            <Route path='/sign-out' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route
              path='/auth/users/reset_password_confirm/:uid/:token'
              element={<NewPassword />}
            />
            <Route path='/blogs/:blogID' element={<BlogDetail />} />
            <Route path='/search' element={<Results />} />
            <Route path='/writeIn' element={<WriteBlog />} />
            <Route path='/writeIn/:draftID' element={<WriteBlog />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/all-saved' element={<AllSavedBlogs />} />
            <Route path='/your-blogs' element={<YourBlogs />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
