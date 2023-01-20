import React, {useState} from "react";
import { Button } from "@mui/material";
import XMLParser from 'react-xml-parser';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/payments.scss';

const Payments = ({ data }) => {
  const payments = data.split("<row>").map(e => {
    return "<row>" + e;
  });
  const limit = payments.length - 2;
  const parse = new XMLParser();
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(101);
  
  const forward = () => {
    if(end + 100 <= limit){
      setStart(start + 100);
      setEnd(end + 100);
    } else {
      setStart(limit - 100);
      setEnd(limit);
    }
  }

  const backward = () => {
    if(start >= 101){
      setStart(start - 100);
      setEnd(end - 100);
    } else {
      setStart(1);
      setEnd(101);
    }
  }
  return (
    <div className='payments'>
      <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell align="right">Account From</TableCell>
              <TableCell align="right">Account To</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              payments.length ?
              payments.slice(start, end).map((row,i) => {
                const xml = parse.parseFromString(row);
                return ( <TableRow
                    key={`${xml.children[3].value}_${i}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {`${xml.children[0].children[2].value} ${xml.children[0].children[3].value}`}
                    </TableCell>
                    <TableCell align="right">{xml.children[1].children[2].value}</TableCell>
                    <TableCell align="right">{xml.children[2].children[1].value}</TableCell>
                    <TableCell align="right">{xml.children[3].value}</TableCell>
                  </TableRow> 
                )
              }) : <></>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className="buttons">
        <Button onClick={backward} variant="contained">
          Previous
        </Button>
        <Button onClick={forward} variant="contained">
          Next
        </Button>
      </div>
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