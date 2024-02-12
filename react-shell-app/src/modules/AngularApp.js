import React, { useEffect } from "react";
import {mount} from "angularApp/angularApp";;
// import "./LeftSidebar.css";

const AngularAppModule = () => {
  useEffect(() => {
    mount();  
  }, []);   
  return <div className="angular-app-module"><app-root></app-root></div>;
};

export default AngularAppModule;