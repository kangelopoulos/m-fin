import React from "react";
import { Button } from "@mui/material";

const PaymentsPage = () => {
  
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

export default PaymentsPage;