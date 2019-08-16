import "antd/dist/antd.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

export async function bootstrap() {
  console.log("react16 app bootstraped");
}

export async function mount(props) {
  console.log("props from main framework", props);
  ReactDOM.render(<App />, document.getElementById("reactRoot"));
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById("reactRoot"));
}
