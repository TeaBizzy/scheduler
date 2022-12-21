import React from "react";

import "components/Button.scss";
import classNames from "classnames";

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
