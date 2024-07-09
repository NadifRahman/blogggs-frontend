import App from './App';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Blogpage from './components/pages/Blogpage';
import CreateBlog from './components/pages/CreateBlog';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'log-in',
        element: <Login />,
      },
      {
        path: 'sign-up',
        element: <Signup />,
      },
      {
        path: 'blogpost/:postid',
        element: <Blogpage />,
      },
      {
        path: 'createblog',
        element: <CreateBlog />,
      },
    ], //add 404 component later
  },
];

export default routes;
