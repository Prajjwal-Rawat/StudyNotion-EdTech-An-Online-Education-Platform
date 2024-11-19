import React, { useEffect } from 'react'

const ClickOutSide = (ref, handler) => {
   useEffect(() => {
      const handleClickOutside = (event) => {
        if(ref.current && !ref.current.contains(event.target)){
            handler(event);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return() => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
   },[ref,handler])
}

export default ClickOutSide
