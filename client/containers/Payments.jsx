import React from "react";
import { Button } from "@mui/material";
import { xml2json } from "xml-js";

const Payments = ({ data }) => {
  return (
    <div className='payments'>
      <div className="buttons">
        <Button variant="contained">
          Accept
        </Button>
        <Button variant="contained">
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default Payments;