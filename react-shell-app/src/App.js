import React, { lazy } from 'react'; // Must be imported for webpack to work
import './App.css';
import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom';
import Home from './components/Home'
import {ReactComponent as ReactLogo} from "./logo.svg";

const Header = lazy(() => import('ReactHeaderApp/Header'));
const Footer = lazy(() => import('ReactHeaderApp/Footer'));
const ReactApp = lazy(() => import('ReactApp/App'));
const AngularAppModule = lazy(() => import('./modules/AngularApp'));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Main Application in React</h1>
        <ReactLogo className="react-logo"/>
        <React.Suspense fallback={<>Loading Header ...</>}>
          <Header />
        </React.Suspense>
        <nav className='nav'>
          <NavLink to="/" className={({ isActive }) =>
            isActive ? 'is-active' : ''
          }>Home</NavLink>
          <NavLink to="/react-app"  className={({ isActive }) =>
            isActive ? 'is-active' : ''
          }>React App</NavLink>
          <NavLink to="/angular-app"  className={({ isActive }) =>
            isActive ? 'is-active' : ''
          }>Angular App</NavLink>
        </nav>
        <Routes className="routes">
          <Route path="/" exact element={<Home />} />
          <Route path="/react-app" element={
            <React.Suspense fallback={<>Loading ReactApp ...</>}>
              <ReactApp />
            </React.Suspense>
          } />
          <Route path="/angular-app" element={
            <React.Suspense fallback={<>Loading Angular app</>}>
              <AngularAppModule />
            </React.Suspense>
          } />
        </Routes>
        <React.Suspense fallback={<>Loading Footer ...</>}>
          <Footer />
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;