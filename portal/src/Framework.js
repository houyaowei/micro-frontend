import React from "react";
// import style from "./index.less";

export default function Framework(props) {
  const { content, loading } = props;

  function goto(title, href) {
    window.history.pushState({}, title, href);
  }

  return (
    <div>
      <header>
        <nav>
          <ol>
            <li>
              <a href="javascript: void 0" onClick={() => goto("react app", "/react")}>
                react16 + antd3
              </a>
            </li>
            <li>
              <a href="javascript: void 0" onClick={() => goto("react15 app", "/15react15")}>
                react15 + antd2
              </a>
            </li>
            <li>
              <a href="javascript: void 0" onClick={() => goto("vue app", "/vue")}>
                vue2 + element2
              </a>
            </li>
          </ol>
        </nav>
      </header>
      {loading ? <div>loading...</div> : null}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
