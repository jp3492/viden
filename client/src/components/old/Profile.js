import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { changeView } from '../actions';

class Profile extends Component {
  componentDidMount(){
    const { view } = this.props;
    let tab = "tab" + view[0].toUpperCase() + view.slice(1);
    this.renderSelect(tab);
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }
  renderSelect(id){
    const tabs = document.getElementsByClassName("tabIcon");
    for(let i = 0; i < tabs.length; i++){
      tabs[i].classList.remove("selectedTab");
    }
    const tab = document.getElementById(id);
    if (tab !== null) {
      tab.classList.add("selectedTab");
    }else {
      document.getElementById("tabDirectory").classList.add("selectedTab");
    }
  }
  render(){
    const { auth, changeView } = this.props;

    if (auth) {
      return (
        <div className="row">
          <div className="col s12">
            <ul className="tabs" id="tabsMenu">
              <li  className="tab col s3 menuTabs" onClick={ () => {
                this.renderSelect("tabProfile");
                changeView('profile')}}>
                <i id="tabProfile" className="material-icons tabIcon">
                  person
                </i>
              </li>
              <li  className="tab col s3 menuTabs" onClick={ () => {
                this.renderSelect("tabContacts");
                changeView('contacts')}}>
                <i id="tabContacts" className="material-icons tabIcon">
                  people
                </i>
              </li>
              <li className="tab col s3 menuTabs" onClick={ () => {
                this.renderSelect("tabDirectory");
                changeView('directory')}}>
                <i id="tabDirectory" className="material-icons tabIcon">
                  folder
                </i>
              </li>
              <li className="tab col s3 menuTabs" onClick={ () => {
                this.renderSelect("tabNotifications");
                changeView('notifications')}}>
                <i id="tabNotifications" className="material-icons tabIcon">
                  notifications
                </i>
              </li>
            </ul>
          </div>
        </div>
      )
      return(
        <span className="card-title">{auth.firstName+" "+auth.lastName}
          <a  onClick={() => {
                changeView("allFriends");}}
              className="secondary-content btn-floating btn-large waves-effect waves-light new">
            <i className="material-icons editProj">
              people
            </i>
          </a>
        </span>
      )
    } else {
      return(
        <div>
          <h1>Viden</h1>
          <p>A social and interactive cross-plattform Video Player</p>
        </div>
      )
    }

  }
}
const mapStateToProps = ({ auth, main: { view } }) => {
  return { auth, view };
}
export default connect(mapStateToProps, {changeView})(Profile);
