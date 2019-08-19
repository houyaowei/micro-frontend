import "antd/dist/antd.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

export async function bootstrap() {
  console.log("react15 app bootstraped");
}

export async function mount(props) {
  console.log("props from main framework", props);
  ReactDOM.render(<App />, document.getElementById("react15Root"));
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById("react15Root"));
}
