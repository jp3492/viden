import React, { Component } from 'react';
import { connect } from 'react-redux';

class Admin extends Component{
  componentWillMount(){
    if (this.props.auth._id !== "5a7957d9ba3149140cb25621") { this.props.history.push("/") }
  }
  renderUser(user){
    return (
      <div className="collection-item">
        {user.lastName}, {user.firstName}
      </div>
    )
  }
  render(){
    const { admin } = this.props;
    return(
      <div className="row">
        <div className="col s4">
          <div className="row">
           <div className="col s12">
             <div className="card blue-grey darken-1 infoCard">
               <div className="card-content white-text">
                 <span className="card-title">Name</span>
                 <p>Id</p>
                 <p>Number of Projects</p>
               </div>
               <div className="card-action infoCardFoot">
                 <button className="btn">Kick</button>
               </div>
             </div>
           </div>
         </div>
        </div>
        <div className="col s8">
          <ul className="collection">
            {admin.map( user => this.renderUser(user) )}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, admin }) => {
  return { auth, admin }
}

export default connect(mapStateToProps)(Admin);
