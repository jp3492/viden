import React, { Component } from 'react'
import { connect } from 'react-redux'

class PlayerInitiate extends Component{
  renderInitiate(i){
    const { initiated } = this.props;
    return <li key={i} className="collection-item"><div>{`Video-${i}`}<a href="#!" className="secondary-content">{initiated[i].toString()}</a></div></li>
  }
  render(){
    const { initiated } = this.props;
    const mapOver = (typeof initiated === "object") ? Object.keys(initiated): [];
    return(
      <div id="playerInitiate">
        <ul className="collection with-header">
          <li className="collection-header"><h4>Initiating Player...</h4></li>
          {mapOver.map( i => this.renderInitiate(i))}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ player: { initiated }, main: { selectedProject, selectedProjects, projects } }) => {
  return { initiated, selectedProject, selectedProjects, projects }
}
export default connect(mapStateToProps)(PlayerInitiate);
