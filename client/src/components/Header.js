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
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';

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
  componentDidMount(){
    if (!this.props.auth) {
      this.props.history.push('/');
    }
  }

  state = {
    anchorEl: null,
    left: false,
  };

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

  renderLogin(open, anchorEl, classes){
    if (this.props.auth) {
      return (
        <Toolbar>
          <IconButton onClick={() => this.toggleDrawer(true)} className={classes.menuButton} color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            My App
          </Typography>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="contrast"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bot',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bot',
                horizontal: 'right',
              }}
              open={open}
              onRequestClose={this.handleRequestClose}
            >
              <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
              <MenuItem>
                <Button href="/api/logout/" color="primary">Logout</Button>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      );
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
    const { auth } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
            {this.renderLogin(open, anchorEl, classes)}
        </AppBar>
        <Drawer open={this.state.left} onRequestClose={() => this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer(false)}
            onKeyDown={() => this.toggleDrawer(false)}
          >
          </div>
          <div>Your Menu Here</div>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return{
    auth
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Header));
