import React from 'react'
import { ReactComponent as ReactLogo } from './../logo.svg';

const Header = () => {
  return (
    <div className="headerApp">
      <div>Micro-frontend App (Header) built in React
        <ReactLogo className="header-react-logo" />
      </div>
    </div>
  )
}

export default Header