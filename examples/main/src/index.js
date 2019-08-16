/**
 * @author houyw
 * @since 2019-08-13
 */

require("babel-polyfill");
import React from "react";
import ReactDOM from "react-dom";
import { registerMicroApps, start } from "qiankun";
import Framework from "./Framework";
import { GlobalEventdistributor } from "./globalEventdistributor";
import { registerStore } from "./helper";

function render({ appContent, loading }) {
  const container = document.getElementById("container");
  ReactDOM.render(<Framework loading={loading} content={appContent} />, container);
}

render({ loading: true });
function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}
const globalEventdistributor = new GlobalEventdistributor();
let props = registerStore("/react15App/store.js", globalEventdistributor);

registerMicroApps(
  [
    {
      name: "react16App",
      entry: "//localhost:7100",
      render,
      activeRule: genActiveRule("/react")
    },
    {
      name: "react15App",
      entry: "//localhost:7102",
      render,
      activeRule: genActiveRule("/15react15")
    },
    {
      name: "vueApp",
      entry: "//localhost:7101",
      render,
      activeRule: genActiveRule("/vue")
    }
  ],
  {
    beforeLoad: [
      async app => {
        console.log("main before load", app);
      }
    ],
    beforeMount: [
      async app => {
        console.log("main before mount", app);
      }
    ],
    afterUnmount: [
      async app => {
        console.log("mainafter unload", app);
      }
    ]
  }
);

start({ prefetch: true, jsSandbox: true });
