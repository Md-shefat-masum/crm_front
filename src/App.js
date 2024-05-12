import './App.css';
// import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import routes from './Pages/routes/route';
import { createHashRouter, RouterProvider } from 'react-router-dom';


function App() {

  const router = createHashRouter([
    routes
  ]);
  return <RouterProvider router={router}></RouterProvider>
}


export default App;
