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
    // this.displayWineImg=this.displayWineImg.bind(this);
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
    let t=e.target;
  }  

  displayWineImgAndInfo(wine, id) {

    if (wine == undefined) {
      return "";
    }

    return (
        <div className="wineCard">
          <p className="wineName">{wine.name}</p>
          <img className="wineImg" src={wine.picture} wineInfo={wine} onClick={this.handleClickOnWine} /> 
        </div>
    )
  }

  // displayWineImg(path, id) {

  //   const wineImgStyle = {
  //     width: "200px",
  //     height: "auto"
  //   };

  //   return (
  //   <img src={path} style={wineImgStyle} />)
  // }

  render() {

    return (
      <div>
        <h3>Wine List from Angel's Wine Database</h3>
        <ul>
      
        { this.state.response.map( this.displayWineImgAndInfo)}

{/* { this.state.wineImagePaths.map( this.displayWineImg)} */}

        </ul>
      </div>
  )}
}