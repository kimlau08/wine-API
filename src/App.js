import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import WineForm from './components/WineForm';
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      response: [],   //contains a list of wine info
      wineNames: [],
      wineImagePaths: []
    }

    this.getWineAPI=this.getWineAPI.bind(this);
    this.loadWineInfo=this.loadWineInfo.bind(this);
    this.displayWineImgAndInfo=this.displayWineImgAndInfo.bind(this);
    // this.handleClickOnWine=this.handleClickOnWine.bind(this);    //display wine info
  }
  
  componentDidMount() {
    this.getWineAPI();
  }

  loadWineInfo() {
    let wineNameList=[];
    let wineImagePathList=[];
    for (let i=0; i<this.state.response.length; i++) {
      wineNameList.push(this.state.response[i].name);
      wineImagePathList.push(this.state.response[i].picture);
    }

    this.setState( {wineNames:      wineNameList } );
    this.setState( {wineImagePaths: wineImagePathList } );
  }

  async getWineAPI() {
    try {
      const response=await axios.get('http://myapi-profstream.herokuapp.com/api/e02526/wines');
      console.log("getHTTP response:", response.data);

      this.setState({response: response.data})
      this.loadWineInfo();
    } catch (e) {
      console.error(e);
    }
  }

  // handleClickOnWine(e) {

  //   if (e.target.attributes.wineinfo == undefined) {
  //     return;
  //   }

  //   let wineObj=JSON.parse( e.target.getAttribute('wineinfo') )
  //   let elem=document.getElementById("wineRow");
  //   elem.style.display = 'none';

  // }  

  displayWineImgAndInfo(wine, id) {

    if (wine == undefined) {
      return "";
    }

    let wineJSON=JSON.stringify(wine);

    return (
      <div className="wineCard">
        <p className="wineName">{wine.name}</p>


        <Link to={{
                    pathname: "/WineForm",
                    wineInfo: { wineJSON },
                    wineRowId: "wineRow"
                  }}>
              <img className="wineImg" src={wine.picture} /> 
        </Link>



        <p className="wineDetail"> Country: {wine.country} </p>
        <p className="wineDetail"> Year: {wine.year}  </p>
        <p className="wineDetail"> Price: ${wine.price}</p>
      </div>
    )
  }

  render() {

    return (
      <div>
        <h3>Wine List</h3>

        <Router>

          <nav>
            <ul id="wineRow">
              <li>
                { this.state.response.map( this.displayWineImgAndInfo) }
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/WineForm" component={WineForm} />
          </Switch>

        </Router>

      </div>
  )}
}