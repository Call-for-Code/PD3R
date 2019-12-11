import React, { Component } from "react";
import HomePage from './homepage'
import { createDrawerNavigator } from "react-navigation";

export default( HomePageRouter = createDrawerNavigator(
  {
    HomePage:{screen:HomePage}
  
  },

  {
    initialRouteName: "HomePage",
    
  }
));

