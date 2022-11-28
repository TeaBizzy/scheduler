import React from "react";

import "components/Button.scss";
import classNames from "classnames";
import { action } from "@storybook/addon-actions";
import { act } from "@testing-library/react";

export default function Button(props) {
   const { confirm, danger, disabled, onClick } = props
   let buttonClass = classNames('button', {'button--confirm': confirm, 'button--danger': danger});

   return (
      <button 
         className={buttonClass}
         onClick={onClick}
         disabled={disabled}
         >
            {props.children}
         </button>
   );
}
