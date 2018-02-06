import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';

import { searchProject, selectHighlights } from '../actions';

const styles = theme => ({
  root: {
    marginTop: 0,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    left: false,
  };

  componentWillReceiveProps(nextProps){
    console.log(nextProps.search);
  }
  toggleDrawer(open){
    this.setState({
      left: open,
    });
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };
  renderSearch(){
    if (this.props.search !== null) {
      return (
        <ul className="collection" id="searchResult">
          <li className="collection-item">
            <a onClick={ () => this.props.selectHighlights( false, this.props.search, this.props.history.push("/editor")) }>{this.props.search.title}</a>
          </li>
        </ul>
      )
    }
  }
  renderLogin(open, anchorEl, classes){
    console.log("new render");
    if (this.props.auth !== null && this.props.auth !== false) {
      if (this.props.auth.approved === true) {
        return (
          <Toolbar>
            <IconButton onClick={() => this.toggleDrawer(true)} className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>

            </Typography>
          </Toolbar>
        );
      } else {
        return(
          <div>
            <h4>Waiting for Admins Approval! --
              <a href="/api/logout">Logout</a>
            </h4>
            <input id="search" onChange={ e => this.props.searchProject(e.target.value)} type="text" placeholder="Insert Project ID" />
            {this.renderSearch()}
          </div>
        )
      }
    } else {
      return (
        <Toolbar>
          <Button href="/auth/google" color="contrast">Login</Button>
        </Toolbar>
      );
    }

  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.props);
    return (
      <div className={classes.root}>
        <AppBar position="static">
            {this.renderLogin(open, anchorEl, classes)}
        </AppBar>
        <Drawer open={this.state.left} onRequestClose={() => this.toggleDrawer(false)}>
          <div className="collection">
            <div
              className="collection-item"
              tabIndex={0}
              role="button"
              onClick={() => { this.toggleDrawer(false); this.props.history.push("/new"); }}
              onKeyDown={() => this.toggleDrawer(false)}
            >
            New Hihglight
            </div>
            <div
              className="collection-item"
              tabIndex={1}
              role="button"
              onClick={() => { this.toggleDrawer(false); this.props.history.push("/list"); }}
              onKeyDown={() => this.toggleDrawer(false)}
            >
            My Hihglights
            </div>
            <div
              className="collection-item"
              tabIndex={1}
              role="button"
              onClick={() => { this.toggleDrawer(false); this.props.history.push("/settings"); }}
              onKeyDown={() => this.toggleDrawer(false)}
            >
            Settings
            </div>
            <div
              className="collection-item"
              tabIndex={1}
              role="button"
              onKeyDown={() => this.toggleDrawer(false)}
            >
            <a href="/api/logout">Logout</a>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, search }) => {
  return{
    search,
    auth
  }
}

export default withStyles(styles)(connect(mapStateToProps, { searchProject, selectHighlights })(Header));
