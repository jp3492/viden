import React, { Component } from 'react'
import { connect } from 'react-redux'

class PlayerInitiate extends Component{

  render(){
    return(
      <div id="playerInitiate">
        <ul className="collection with-header">
          <li className="collection-header"><h4>Initiating Player...</h4></li>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ player, main: { selectedProject, selectedProjects, projects } }) => {
  return { player, selectedProject, selectedProjects, projects }
}
export default connect(mapStateToProps)(PlayerInitiate);
