import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = classNames(
    // using Classnames library
    "button",
    { "button--confirm": props.confirm },
    { "button--danger": props.danger }
  );

  // if (props.confirm) {
  //   buttonClass += " button--confirm";
  // }

  // if (props.danger) {
  //   buttonClass += " button--danger";
  // }

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
