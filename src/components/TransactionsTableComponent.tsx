import React from 'react'
import {Transaction} from "../data/Model";
import {dollarFormatter} from "../util/Formatters";
import {Box} from "@mui/material";
import {DataGrid, GridColDef} from '@mui/x-data-grid'

const columns: GridColDef<Transaction>[] = [
  {
    field: 'date',
    headerName: 'Date',
    flex: 1
  },
  {
    field: 'group',
    headerName: 'Group',
    flex: 1
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1
  },
  {
    field: 'payee',
    headerName: 'Payee',
    flex: 1
  },
  {
    field: 'inflow',
    headerName: 'Inflow',
    flex: 1,
    renderCell: (obj) =>
      obj.row.amountInCents > 0 ?
      dollarFormatter.format(obj.row.amountInCents / 100): ''

  },
  {
    field: 'outflow',
    headerName: 'Outflow',
    flex: 1,
    renderCell: (obj) =>
      obj.row.amountInCents < 0 ?
        dollarFormatter.format(obj.row.amountInCents / 100): ''
  }
]

export type TransactionsTableComponentProps = {
  transactions: Array<Transaction>
}

export const TransactionsTableComponent: React.FC<TransactionsTableComponentProps> = ({
  transactions
}) => {

  const transactionsWithId = React.useMemo(() =>
    transactions.map((t, id) => ({id, ...t}))
  ,[transactions])

  return (
    <Box sx={{height: 500, width: '100%'}}>
      <DataGrid
        rows={transactionsWithId}
        columns={columns}
      />
    </Box>
  )
}