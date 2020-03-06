import React from "react";
import superagent from "superagent";
import { connect } from "react-redux";

class App extends React.Component {
  state = {
    text: ""
  };

  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      //event.data  is a json string
      //we need a real object to use the data
      //to convert use jason parsed
      console.log("eventdata", event.data);
      const parsed = JSON.parse(event.data);
      this.props.dispatch(parsed);
      console.log("parsed", parsed);
    };
  }

  onSubimit = async event => {
    event.preventDefault();
    try {
      const response = await superagent
        .post("http://localhost:4000/message")
        .send({ text: this.state.text });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  reset = () => {
    this.setState({ text: "" });
  };
  onChange = event => {
    this.setState({
      text: event.target.value
    });
  };
  render() {
    const displayMessages = this.props.messages.map(message => (
      <p> {message} </p>
    ));
    return (
      <main>
        <form onSubmit={this.onSubimit}>
          <input value={this.state.text} type="text" onChange={this.onChange} />
          <button type="subimit">Send</button>
          <button onClick={this.reset}>Reset</button>
        </form>
        <div>{displayMessages}</div>
      </main>
    );
  }
}
function mapStateToProps(reduxState) {
  return { messages: reduxState.messages };
}
export default connect(mapStateToProps)(App);
