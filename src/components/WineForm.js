import React, {Component} from 'react';
import '../App.css';

export default class wineForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            newName: "",
            newYear: "",
            newGrapes: "",
            newCountry: "",
            newRegion: "",
            newPrice: "",
            newDesc: "",
            newImgURL: ""
        };

        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleYearChange=this.handleYearChange.bind(this);
        this.handleGrapesChange=this.handleGrapesChange.bind(this);
        this.handleCountryChange=this.handleCountryChange.bind(this);
        this.handleRegionChange=this.handleRegionChange.bind(this);
        this.handlePriceChange=this.handlePriceChange.bind(this);
        this.handleDescChange=this.handleDescChange.bind(this);
        this.handleImgURLChange=this.handleImgURLChange(this);
        this.handleSubmitForm=this.handleSubmitForm.bind(this);
        this.handleDeleteButtonClick=this.handleDeleteButtonClick.bind(this);
    }

    
    handleImgURLChange(event) {
        if (event.target != undefined) {

            this.setState({newImgURL: event.target.value}); //update the state when the field is changed
        }
    }

    handleGrapesChange(event) {
        if (event.target != undefined) {
            
            this.setState({newGrapes: event.target.value}); //update the state when the field is changed
        }
    }

    handleCountryChange(event) {
        if (event.target != undefined) {
            
            this.setState({newCountry: event.target.value}); //update the state when the field is changed
        }
    }

    handleDescChange(event) {
        if (event.target != undefined) {
            
            this.setState({newDesc: event.target.value}); //update the state when the field is changed
        }
    }

    /**********************************************************/

    handleNameChange(event) {
        if (event.target != undefined) {

            this.setState({newName: event.target.value}); //update the state when the field is changed
        }
    }
    
    handleYearChange(event) {
        if (event.target != undefined) {

            this.setState({newYear: event.target.value}); 
        }
    }

    handlePriceChange(event) {
        if (event.target != undefined) {

            this.setState({newPrice: event.target.value}); //update the value state when the field is changed
        }
    }

    handleRegionChange(event) {
        if (event.target != undefined) {

            this.setState({newRegion: event.target.value}); //update the value state when the field is changed
        }
    }


    handleSubmitForm(event) {

        if (event.target.elements == undefined) {
            return;
        }

        let wineObj={};
        for (let i=0; i<event.target.elements.length; i++) {
            let elem=event.target.elements[i];
            if (elem.type != "text") {
                continue;
            }

            let keyValue={ [elem.name]: elem.value  }
            //merge key:value pair to wineObj
            Object.assign(wineObj, keyValue);

        }

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
                    <img className="largeWineImg" src={wineObj.picture} /> 
                </div>
                <div className="wineFormBox">
                    <h2 className="wineFormTitle"> Wine Info </h2><br />

                    <form className="inputContainer"  onSubmit={this.handleSubmitForm}>

                        <label className="nameInputBox">
                            Name<br />
                            <input className="textInput" type="text" name="name" defaultValue={wineObj.name} placeholder="wine name" onChange={this.handleNameChange} />
                        </label>

                        <label className="yearInputBox">
                            Year<br />
                            <input className="textInput" type="text" name="year" defaultValue={wineObj.year}          placeholder="year" onChange={this.handleYearChange} />
                        </label>

                        <label className="grapesInputBox">
                            Grapes<br />
                            <input className="textInput" type="text" name="grapes" defaultValue={wineObj.grapes} placeholder="grapes" onChange={this.handleGrapesChange} />
                        </label>
                        
                        <label className="countryInputBox">
                            Country<br />
                            <input className="textInput" type="text" name="country" defaultValue={wineObj.country} placeholder="country" onChange={this.handleCountryChange} />
                        </label>
                        
                        <label className="regionInputBox">
                            Region<br />
                            <input className="textInput" type="text" name="region" defaultValue={wineObj.region} placeholder="region" onChange={this.handleRegionChange} />
                        </label>
                        
                        <label className="priceInputBox">
                            Price<br />
                            <input className="textInput" type="text" name="price" defaultValue={wineObj.price} placeholder="price (USD)" onChange={this.handlePriceChange} />
                        </label>

                        
                        <label className="descInputBox">
                            Description<br />
                            <textarea className="textAreaInput" name="desc" rows="3" cols="60" defaultValue={wineObj.description} placeholder="description" onChange={this.handleDescChange} />
                        </label>

                        <label className="imgPathInputBox">
                            Picture URL<br />
                            <textarea className="imgURLInput" name="imgURL" rows="1" cols="60" defaultValue={wineObj.picture} placeholder="picture URL" onChange={this.handleImgURLChange} />
                        </label>


                        <div className="updateButtonRow">
                            <button type="submit" name="create" className="createButton">Create</button>
                            <button type="submit" name="delete" className="deleteButton" onClick={this.handleDeleteButtonClick} >Delete</button>
                        </div>
                    </form>
                
                </div>
            </div>
        )
    }

}
