import React from 'react'
import {Box} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {dollarFormatter} from "../util/Formatters";
import {TransactionOverviewItem} from "../data/Model";

export type TransactionOverviewComponentProps = {
  transactions: Array<TransactionOverviewItem>
}

export const TransactionOverviewComponent: React.FC<TransactionOverviewComponentProps> = ({
  transactions
}) => {

  return (
    <Box sx={{height: 200, width: '100%'}}>
      Total Transactions: {transactions.length}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Input</TableCell>
              <TableCell align="right">Output</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{dollarFormatter.format(row.total / 100)}</TableCell>
                <TableCell align="right">{dollarFormatter.format(row.totalInput / 100)}</TableCell>
                <TableCell align="right">{dollarFormatter.format(row.totalOutput / 100)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
