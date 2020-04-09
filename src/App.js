import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      response: [],   //contians a list of wine info
      wineNames: [],
      wineImagePaths: [],
    }

    this.getWineAPI=this.getWineAPI.bind(this);
    this.loadWineInfo=this.loadWineInfo.bind(this);
    this.displayWineImgAndInfo=this.displayWineImgAndInfo.bind(this);
    this.handleClickOnWine=this.handleClickOnWine.bind(this);    //display wine info
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

  handleClickOnWine(e) {

    if (e.target.attributes.wineinfo == undefined) {
      return;
    }

    let wineObj=JSON.parse( e.target.getAttribute('wineinfo') )


  }  

  displayWineImgAndInfo(wine, id) {

    if (wine == undefined) {
      return "";
    }

    let wineJSON=JSON.stringify(wine);

    return (
        <div className="wineCard">
          <p className="wineName">{wine.name}</p>
          <img className="wineImg" src={wine.picture} wineInfo={wineJSON} onClick={this.handleClickOnWine} /> 
          <p className="wineDetail"> Country: {wine.country} </p>
          <p className="wineDetail"> Year: {wine.year}  </p>
          <p className="wineDetail"> Price: ${wine.price}</p>
        </div>
    )
  }

  render() {

    return (
      <div>
        <h3>Wine List from Angel's Wine Database</h3>

        <div className="wineRow">
          { this.state.response.map( this.displayWineImgAndInfo)}
        </div>
      

      </div>
  )}
}