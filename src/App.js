import React from "react";
import superagent from "superagent";

class App extends React.Component {
  onSubimit = async event => {
    event.preventDefault();
    try {
      const response = await superagent
        .post("http://localhost:4000/message")
        .send({ text: "hardcoded" });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <main>
        <form onSubmit={this.onSubimit}>
          <input type="text"></input>
          <button>Send</button>
        </form>
      </main>
    );
  }
}

export default App;
