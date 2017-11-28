import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadFile, fetchUser, changeName, processFile } from '../actions';

class AddGame extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  onSubmit(){
    this.props.processFile(this.props.file, this.props.name, this.props.history);
  }
  onNameChange(name){
    this.props.changeName(name);
  }
  onChange(event, callback){
    let string;
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsText(file);
      reader.onloadend = function () {
        string = reader.result;
        callback(string);
      };
    }
  }
  render(){
    return(
      <div className="row">
        <h5>Upload a new Game to your Library</h5>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input onChange={event => this.onChange(event, (string) => { this.props.uploadFile(string)})} accept=".dvw" type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" placeholder="Upload DataVolley File - dvw!" type="text" />
          </div>
        </div>
        <input onChange={(event) => this.onNameChange(event.target.value)} placeholder="Save Game as..." />
        <button onClick={() => this.onSubmit()} className="btn">Upload</button>
      </div>
    );
  }
}
function mapStateToProps({file, auth, name}){
  return{
    file,
    auth,
    name
  }
}
export default connect(mapStateToProps, {uploadFile, fetchUser, changeName, processFile})(AddGame);
