import React, { Component } from "react";
import MeetupList from "./MeetupList";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SearchContainer from "./SearchContainer";
import AllThree from "./AllThree";

class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      meetups: [],
      searchWord: "",

    };
  }

  componentDidMount() {
    const API = "http://localhost:3000/meetups";
    fetch(API)
      .then((response) => response.json())
      .then((meetups) => {
        this.setState({ meetups });
      });
  }

  handleChange = (event) => {
    console.log("Event Target Value is", event.target.value);
    this.setState({
      searchWord: event.target.value,
    });
  };

  render() {
    const filteredMeetups = this.state.meetups.filter((meeting) => meeting.title.includes(
      this.state.searchWord.charAt(0).toUpperCase() +
                  this.state.searchWord.slice(1) || //capitalizes first letter of searchWord
                  this.state.searchWord  // accepts exactly what was entered
    ))
    return (
      <div>
        THIS THE MAIN PAGE
        <NavBar />
        <SearchContainer
          searchWord={this.state.searchWord}
          handleChange={this.handleChange}
        />
        <AllThree meetups={this.state.meetups} filteredMeetups={filteredMeetups}/>
        <Footer />
      </div>
    );
  }
}

export default MainPage;
