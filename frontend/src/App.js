import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './components/AuthContext';
import { PostContextProvider } from './components/PostContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './pages/Login';
import Post from './pages/Post';
import Register from './pages/Register';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={
            <Navigate to={'/post'} />
          }/>
          <Route path="/login" element={
            <ProtectedRoutes accessBy={"non-authenticated"}>
              <Login/>
            </ProtectedRoutes>
          } />
          <Route path='/register'element={
            <ProtectedRoutes accessBy={"non-authenticated"}>
              <Register />
            </ProtectedRoutes>
          }/>
          <Route path='/post' element={
            <ProtectedRoutes accessBy={"authenticated"}>
              <PostContextProvider>
                <Post />
              </PostContextProvider>
            </ProtectedRoutes>
          } />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
