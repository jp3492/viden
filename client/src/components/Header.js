import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';

import { searchProject, selectHighlights, fetchHighlights, setSearch, navAdmin } from '../actions';

const styles = theme => ({
  root:       { marginTop: 0, width: '100%' },
  flex:       { flex: 1 },
  menuButton: { marginLeft: -12, marginRight: 20 }
});

class Header extends React.Component {
  componentWillMount(){
    if (!this.props.auth) {
      this.props.history.push("/");
    }
  }
  state = { anchorEl: null, right: false };

  toggleDrawer(open){                   this.setState({ right: open })                     };
  handleChange = (event, checked) => {  this.setState({ auth: checked })                  };
  handleMenu = event => {               this.setState({ anchorEl: event.currentTarget })  };
  handleRequestClose = () => {          this.setState({ anchorEl: null })                 };


  renderAdmin(){
    const { history, auth, navAdmin } = this.props;
    if (auth !== false) {
      if (auth._id.toString() === "5a8173342071dc046cc91087") {
        return (
          <div
            className="collection-item right-align menuItem"
            tabIndex={1}
            role="button"
            onClick={() => { this.toggleDrawer(false); navAdmin(history); }}
            onKeyDown={() => this.toggleDrawer(false)}
          >
          Admin
          </div>
        )
      }
    }
  }
  renderLog(){
    if (this.state.right) {
      return <button className="btn" id="btnMenu" onClick={ () => this.toggleDrawer(!this.state.right)}><i className="material-icons ctrl">close</i></button>;
    }
    if (this.props.auth) {
      return <button className="btn" id="btnMenu" onClick={ () => this.toggleDrawer(!this.state.right)}><i className="material-icons ctrl">menu</i></button>;
    } else {
      if (this.props.location.pathname === "/editor") {
        return <button className="btn" id="btnMenu" onClick={ () => this.props.history.push("/")}><i className="material-icons ctrl">home</i></button>;
      }
      return <button className="btn" id="btnMenu" onClick={ () => this.toggleDrawer(!this.state.right)}><i className="material-icons ctrl">exit_to_app</i></button>;
    }
  }
  renderMenu(){
    const { history, fetchHighlights, search, auth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if (!auth) {
      return (
        <Drawer id="drawer" anchor="right" open={this.state.right} onClose={() => this.toggleDrawer(false)}>
          <p><b>We are using common authentication services to ensure <br/> a safe process and protection of private information!</b></p>
          <div className="collection">
            <div
              className="collection-item right-align menuItem"
              tabIndex={1}
              role="button"
              onKeyDown={() => this.toggleDrawer(false)}
            >
              <a href="/auth/google">Google OAuth</a>
            </div>
            <div
              className="collection-item right-align menuItem"
              tabIndex={1}
              role="button"
              onKeyDown={() => this.toggleDrawer(false)}
            >
            Facebook (coming soon)
            </div>
            <div
              className="collection-item right-align menuItem"
              tabIndex={1}
              role="button"
              onKeyDown={() => this.toggleDrawer(false)}
            >
            LinkedIn (coming soon)
            </div>
          </div>
        </Drawer>
      )
    }
    if (auth.approved) {
      return (
        <Drawer id="drawer" anchor="right" open={this.state.right} onClose={() => this.toggleDrawer(false)}>
          <div className="collection">
            <div
              className="collection-item right-align menuItem"
              tabIndex={1}
              role="button"
              onClick={() => { this.toggleDrawer(false); fetchHighlights(history.push("/")); }}
              onKeyDown={() => this.toggleDrawer(false)}
            >
            My Hihglights
            </div>
            <div
              className="collection-item right-align menuItem"
              tabIndex={1}
              role="button"
              onKeyDown={() => this.toggleDrawer(false)}
            >
            <a href="/api/logout">Logout</a>
            </div>
            {this.renderAdmin()}
          </div>
        </Drawer>
      )
    } else {
      return (
        <Drawer id="drawer" anchor="right" open={this.state.right} onClose={() => this.toggleDrawer(false)}>
          <div className="collection">
            <div
              className="collection-item right-align menuItem"
              tabIndex={1}
              role="button"
              onKeyDown={() => this.toggleDrawer(false)}
            >
            <a href="/api/logout">Logout</a>
            </div>
          </div>
        </Drawer>
      )
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderLog()}
        {this.renderMenu()}
      </div>
    );
  }
}

Header.propTypes = { classes: PropTypes.object.isRequired };

const mapStateToProps = ({ auth, search }) => { return { search, auth } }

export default withStyles(styles)(connect(mapStateToProps, { searchProject, selectHighlights, fetchHighlights, setSearch, navAdmin })(Header));
