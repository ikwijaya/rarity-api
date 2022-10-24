import React, { Component } from 'react';
import * as Containers from '../container'
import { GeneralRoute } from './route';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class AppRoute extends Component {
  
  render() {  
    return (
      <Router>
        <Routes>
          <GeneralRoute exact path='/' component={Containers.Home} private={false} passData={this.state} passThis={this} />
          <Route component={Containers.NotFound} />
        </Routes>
      </Router>
    )
  }  
}

export default AppRoute