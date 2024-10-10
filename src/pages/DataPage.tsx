import React from 'react'
import FileUpload from 'react-material-file-upload'
import {parseTransactions} from "../services/TransactionParser";
import {transactionsAtom} from "../model/atoms";
import {useAtom} from "jotai";
import {Box} from "@mui/material";
import {TransactionsTableComponent} from "../components/TransactionsTableComponent";

export type DataPageProps = {}

export const DataPage: React.FC<DataPageProps> = () => {

  const [files, setFiles] = React.useState<File[]>([]);
  const [transactions, setTransactions] = useAtom(transactionsAtom)

  React.useEffect(() => {
    files.map(file => {
      parseTransactions(file)
        .then(t => setTransactions(t.slice()))
        .catch(console.error)
    })
  }, [files])

  return (
    <Box>
      <FileUpload value={files} onChange={setFiles} />
      <Box>
        <TransactionsTableComponent transactions={transactions} />
       </Box>
    </Box>
  )

}