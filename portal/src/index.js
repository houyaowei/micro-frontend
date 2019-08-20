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
let props = registerStore("/15react15/store.js", globalEventdistributor);

registerMicroApps(
  [
    {
      name: "react app",
      entry: "//localhost:7100",
      render,
      activeRule: genActiveRule("/react"),
      props: registerStore("/react/store.js", globalEventdistributor)
    },
    {
      name: "react15 app",
      entry: "//localhost:7102",
      render,
      activeRule: genActiveRule("/15react15"),
      props: registerStore("/15react15/store.js", globalEventdistributor)
    },
    {
      name: "vue app",
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
