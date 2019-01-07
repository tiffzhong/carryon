import React, { Component } from "react";

import routes from "./routes";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
