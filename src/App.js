import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Graph from './components/graph';
import Helmet from 'react-helmet';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Datalogger V2</title>
        <meta charset="utf-8" />
      </Helmet>
      <div className="App">
        <div className="container">
        <h3 className="text-left" style={{paddingLeft: 15, paddingTop: 5}}>Datalogger V2</h3>
          <Router>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link" to="/hrtemp/">Temperature</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/humidity/">Humidity</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pressure/">Pressure</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lux/">Light</Link>
              </li>
            </ul>
            <div style={{height: "5%"}}>
              <Route path='/:id' component={Graph} />
            </div>
          </Router>
        </div>
      </div>
      <h6 className="text-center" style={{paddingTop: 5}}>by Zachary Linketter &copy; 2019</h6>
      <h6 className="text-center" style={{paddingTop: 5}}><a href="http://github.com/iburistu">Other stuff by me</a></h6>
    </React.Fragment>
  );
}

export default App;
