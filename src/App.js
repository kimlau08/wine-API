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
      wineImagePaths: [],
      wineStrings: []
    }

    this.getWineAPI=this.getWineAPI.bind(this);
    this.loadWineInfo=this.loadWineInfo.bind(this);
    this.displayWineImgAndInfo=this.displayWineImgAndInfo.bind(this);
    this.postWineAPI=this.postWineAPI.bind(this);
    this.deleteWineAPI=this.deleteWineAPI.bind(this);
    this.addNewWineData=this.addNewWineData.bind(this);
    this.deleteWineData=this.deleteWineData.bind(this)
  }
  
  componentDidMount() {
    this.getWineAPI();
  }

  loadWineInfo() {
    let wineNameList=[];
    let wineImagePathList=[];
    let wineStrArray=[];
    for (let i=0; i<this.state.response.length; i++) {
      wineNameList.push(this.state.response[i].name);
      wineImagePathList.push(this.state.response[i].picture);
      wineStrArray.push(JSON.stringify(this.state.response[i])); //stringify the wine object
    }

    this.setState( {wineNames:      wineNameList } );
    this.setState( {wineImagePaths: wineImagePathList } );
    this.setState( {wineStrings:    wineStrArray } );
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

  async postWineAPI(wineObj) {  //create new wine product info obtained from WineForm component 
    try {
      const response = await axios.post('http://myapi-profstream.herokuapp.com/api/e02526/wines',
                   wineObj, { headers: {} } );   
      console.log(response.data);
  
      this.getWineAPI(); //update wine list rendering to see result
    } catch(e) {
      console.error.apply(e);
    }
  }

  async deleteWineAPI(wineId) {
    const deleteRequestURL='http://myapi-profstream.herokuapp.com/api/e02526/wines'+'/'+wineId;

    try {
      const response = await axios.delete( deleteRequestURL );
      console.log(response.data)
    
      this.getWineAPI(); //update wine list rendering to see result
    } catch(e) {
      console.error(e);
    }
  }
  
  addNewWineData(wineStr) {  //call back to post new wine obj to remote
    let wineObj=JSON.parse(wineStr);
    this.postWineAPI(wineObj);

  }
  deleteWineData(wineIdObj) { //call back to delete wine object from remote
     this.deleteWineAPI(wineIdObj.value);
  }

  displayWineImgAndInfo(wine, id) {

    if (wine === undefined) {
      return "";
    }

    return (
      <div className="wineCard">
        <p className="wineName">{wine.name}</p>


        <Link to={{
                    pathname:  "/WineForm",
                    wineStrings:  this.state.wineStrings,
                    idx:       id,
                    wineRowId: "wineRow",
                    createWineCallBack: this.addNewWineData,
                    deleteWineCallBack: this.deleteWineData
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
        <p className="wineListText" >Wine List</p>

        <Router>

          {/* Render wine list */}
          <nav>
            <ul id="wineRow">
              <li>
                { this.state.response.map( this.displayWineImgAndInfo) }
              </li>
            </ul>
          </nav>

          {/* Route to WineForm */}
          <Switch>
            <Route exact path="/WineForm" component={WineForm} />
          </Switch>

        </Router>

      </div>
  )}
}