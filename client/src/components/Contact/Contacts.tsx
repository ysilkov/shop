import React from "react";
import style from "./Contacts.module.css"

const Contacts = () =>{
   return(
      <div className={style.contacts_block}>
      <h3>Our contacts</h3>
      <ul>
        <li><strong>Address:</strong> Ukraine,Poltava</li>
        <li><strong>Phone:</strong> +38 (050) 753-03-70</li>
        <li><strong>Email:</strong> ysilkov@ukr.net</li>
      </ul>
    </div>
   )
}

export default Contacts;