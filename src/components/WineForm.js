import React, {Component} from 'react';
import '../App.css';

import cameraCircleImg from '../assets/cameraCircle.png';

export default class wineForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            newName: "",
            newYear: ""
        };

        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleYearChange=this.handleYearChange.bind(this);
        this.handleSubmitForm=this.handleSubmitForm.bind(this);
        this.handleDeleteButtonClick=this.handleDeleteButtonClick.bind(this);
    }

    handleNameChange(event) {

    }

    handleImagePathChange(event) {

    }

    handleGrapesChange(event) {

    }

    handleCountryChange(event) {

    }

    handleDescChange(event) {

    }

    /**********************************************************/

    handleTextChange(event) {

        this.setState({newName: event.target.value}); //update the state when the field is changed
    }
    
    handleYearChange(event) {

        this.setState({newYear: event.target.value}); 
    }

    handlePriceChange(event) {

        // this.setState({value: event.target.value}); //update the value state when the field is changed
    }

    handleRegionChange(event) {

        // this.setState({value: event.target.value}); //update the value state when the field is changed
    }


    handleSubmitForm(event) {
        let a=true;

        event.preventDefault();
    }
    handleDeleteButtonClick(event) {

    }


    validateCurrency(amount) {
        let regex = /^[1-9]\d*(?:\.\d{0,2})?$/;
        return regex.test(amount);
    }


    render() {
        if (this.props.location.wineStrings === undefined) {
            return <div> </div>
        }
    
        let wineIdx=this.props.location.idx;  //index to the stringified wine object array
        let wineObj=JSON.parse(this.props.location.wineStrings[wineIdx]);
    
        let elem=document.getElementById("wineRow");
        elem.style.display = 'none';

        return (
            <div className="windFormContainer">
                <div className="wineImgBox">
                    <h2 className="wineFormTitle"> {wineObj.name} </h2><br />
                    <img className="wineImg" src={wineObj.picture} /> 
                </div>
                <div className="wineFormBox">
                    <h2 className="wineFormTitle"> Wine Info </h2><br />

                    <form className="inputContainer"  onSubmit={this.handleSubmitForm}>

                        <label className="nameInputBox">
                            Name<br />
                            <input className="textInput" type="text" defaultValue={wineObj.name} placeholder="wine name" onChange={this.handleTextChange} />
                        </label>

                        <label className="yearInputBox">
                            Year<br />
                            <input className="textInput" type="text" defaultValue={wineObj.year} placeholder="year" onChange={this.handleYearChange} />
                        </label>

    {/* 
                        <div className="uploadPhotoBox">
                        <img className="cameraImg" src={cameraCircleImg} />
                            <label className="uploadLabel" for="filePickerInput">Upload a photo</label>
                            <input id="filePickerInput" type="file" value={wineObj.picture}  onChange={handleTextChange} />
                        </div>

                        <label className="grapesInputBox">
                            Grapes<br />
                            <input className="textInput" type="text" value={wineObj.grapes} placeholder="grapes" onChange={handleTextChange} />
                        </label>
                        
                        <label className="countryInputBox">
                            Country<br />
                            <input className="textInput" type="text" value={wineObj.country} placeholder="country" onChange={handleTextChange} />
                        </label>
                        
                        <label className="regionInputBox">
                            Country<br />
                            <input className="textInput" type="text" value={wineObj.region} placeholder="region" onChange={handleRegionChange} />
                        </label>
                        
                        <label className="priceInputBox">
                            Country<br />
                            <input className="textInput" type="text" value={wineObj.price} placeholder="price" onChange={handlePriceChange} />
                        </label>
                        
                        <label className="descInputBox">
                            Country<br />
                            <input className="textInput" type="text" value={wineObj.price} placeholder="description" onChange={handleDescChange} />
                        </label> */}

                        <div className="updateButtonRow">
                            <button type="submit" className="createButton">Create</button>
                            <button className="deleteButton" onClick={this.handleDeleteButtonClick} >Delete</button>
                        </div>
                    </form>
                
                </div>
            </div>
        )
    }

}
