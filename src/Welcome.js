import React from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    elevation: '2',
    width: 'absolute',
    overflowX: 'auto',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  search: {
    position: 'relative',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',

  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',

  },
  table: {
      width: 'absolute',
      overflowX: 'auto',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    width: '100%',
   transition: theme.transitions.create("width"),
   [theme.breakpoints.up("md")]: {
       width: 200
   }
  },
});

class Welcome extends React.Component {
  state = { data: {}, search: '' };

  updateSearch = (e) => {
    this.setState({ search: e.target.value.toLowerCase() })
  }

  render() {
    const { data, search } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.root} >
          <Toolbar className={classes.root}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                value={search}
                onChange={this.updateSearch}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <p style={{ textAlign: 'left', paddingTop: "10%"}} >Business Customers (50) </p>
          <Paper className={classes.table}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>DUNS Number</TableCell>
                  <TableCell>First Contract</TableCell>
                  <TableCell>Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(data).filter(name => name.toLowerCase().includes(search)).map(name => {
                  return (
                    <TableRow key={name}>
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        12345
                      </TableCell>
                      <TableCell component="th" scope="row">
                        67890
                      </TableCell>
                      <TableCell component="th" scope="row">
                        01-01-2018
                      </TableCell>
                      <TableCell component="th" scope="row">
                        $5.18M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div >


    );
  }

  componentDidMount() {
    fetch("https://harsh-stuff.firebaseio.com/oralSurgeons/BC/names.json", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json });
      });
  }
}

export default withStyles(styles)(Welcome)
