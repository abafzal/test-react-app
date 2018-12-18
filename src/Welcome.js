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
    width: '100%',
    overflowX: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
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
    maxWidth: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    width: `calc( 800px - ${theme.spacing.unit * 11}px )`,
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
        <AppBar position="static" >
          <Toolbar >
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            > Yo this is the title of the page
            </Typography>
            <div className={classes.grow} />
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
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <p style={{ textAlign: 'left', paddingTop: "2%", paddingBottom: "2%" }} >Customers (1000)</p>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>DUNS Number</TableCell>
                  <TableCell>First Contract</TableCell>
                  <TableCell>LCV</TableCell>
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
          <Paper>
            <p style={{ textAlign: 'center', paddingTop: "2%", paddingBottom: "2%" }} > Page 1 </p>
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
