import React from "react";
import superagent from "superagent";

class App extends React.Component {
  state = {
    text: ""
  };

  stream = new EventSource("http://localhost:4000/stream")

  componentDidMount() {
    this.stream.onmessage = function(event) {
      console.log("eventdata", event.data)
    }
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
    return (
      <main>
        <form onSubmit={this.onSubimit}>
          <input value={this.state.text} type="text" onChange={this.onChange} />
          <button type="subimit">Send</button>
          <button onClick={this.reset}>Reset</button>
        </form>
      </main>
    );
  }
}

export default App;
