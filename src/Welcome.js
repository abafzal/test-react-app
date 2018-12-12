import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default class Welcome extends React.Component {
  state = { data: {} };

  render() {
    const { data } = this.state;
    // const data2 = this.state.data
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <p>Hey Gideon, which dentist is best? </p>
        <List component="nav">
          {Object.keys(data).map(name => (
            <ListItem button key={name}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </div>
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
