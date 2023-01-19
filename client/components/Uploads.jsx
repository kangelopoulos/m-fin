import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Uploads = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/upload/', {
        params: {
          limit: 10, 
          offset: page
        }
      }); 
      console.log(res.data);
      setData(res.data);
    }
    getData();
    console.log(data);
  }, []);

  useEffect(() => {

  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date Uploaded</TableCell>
            <TableCell align="center">Funds Per Source</TableCell>
            <TableCell align="center">Funds Per Branch</TableCell>
            <TableCell align="center">Payments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row, i) => {
              console.log('row', row);
              return (
                <TableRow key={`${row.date}_${i}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="center">{row.csv1}</TableCell>
                  <TableCell align="center">{row.csv2}</TableCell>
                  <TableCell align="center">{row.csv3}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Uploads;