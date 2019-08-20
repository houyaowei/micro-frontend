import { Button, Modal, version as antdVersion } from "antd";
import React, { version } from "react";
import store from "./store";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      store: this.props.store,
      globalEventDistributor: this.props.globalEventDistributor
    };

    this.setVisible = visible => this.setState({ visible });
    this.showState = this.showState.bind(this);
  }
  showState() {
    alert(this.state.store);
  }
  render() {
    const { visible } = this.state;

    return (
      <div>
        <div style={{ color: "green" }}>Hello React15</div>
        <Button onClick={() => this.setVisible(true)}>open antd modal</Button>
        <Button onClick={() => this.showState()}>显示state</Button>
        <Modal
          visible={visible}
          onCancel={() => this.setVisible(false)}
          onOk={() => this.setVisible(false)}
        >
          Hello React {version} and antd {antdVersion}
        </Modal>
      </div>
    );
  }
}
