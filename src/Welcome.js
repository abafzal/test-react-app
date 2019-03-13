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
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import classnames from "classnames";
import CssBaseline from '@material-ui/core/CssBaseline';


const styles = theme => ({
  padding: {
    padding: "0 10%"
  },
  body: {
    backgroundColor: "#8080802e",
    minHeight: "calc(100vh - 16px)",
    paddingBottom: "32px"
  },
  search: {
    position: 'relative',
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.10),
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
    color: theme.palette.common.black
  },
  inputRoot: {
    color: theme.palette.common.black,
    width: '100%',

  },
  table: {
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
        <CssBaseline />
        <AppBar className={classes.padding} color="default">
          <Toolbar disableGutters>
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
        <div className={classnames(classes.padding, classes.body)}>
          <p style={{ textAlign: 'left', paddingTop: "10%", fontSize: '20px'}} >Business Customers (50) </p>
          <Paper className={classnames(classes.table)}>
            <Table>
              <TableHead>
                <TableRow>
                  {data && data.columns && data.columns.map(name => <TableCell>{name}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.recordPage && data.recordPage.filter(obj => Object.values(obj).reduce((memo, val) => {return memo || val.toString().toLowerCase().includes(search)}, false )).map((obj, i) => {
                  return (
                    <TableRow key={i}>
                      {Object.values(obj).map(x => <TableCell component="td" scope="row">
                        {x}
                      </TableCell>)}
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
    fetch("/preview.json", {
      method: "GET",
        }
      )
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json });
      });
  }
}



export default withStyles(styles)(Welcome)
