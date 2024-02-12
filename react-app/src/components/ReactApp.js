import React from 'react'
import {ReactComponent as ReactLogo} from "./../logo.svg";

const ReactApp = () => {
  return (
    <div className="reactApp">
      <div>Micro-frontend built in React
        <ReactLogo className="react-app-logo"/>
      </div>
    </div>
  )
}

export default ReactApp