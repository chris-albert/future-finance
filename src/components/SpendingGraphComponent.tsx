import React from 'react'
import {Transaction, transactionOverview, transactionsByMonth} from "../data/Model";
import {TransactionGraphComponent} from "./TransactionGraphComponent";

export type SpendingGraphComponentProps = {
  transactions: Array<Transaction>
  title: string
  referenceLine?: number
}

export const SpendingGraphComponent: React.FC<SpendingGraphComponentProps> = ({
  transactions,
  title,
  referenceLine
}) => {

  const overview = transactionsByMonth(transactions)

  return (
    <TransactionGraphComponent
      referenceLine={referenceLine}
      xDomain={[0, (dataMax: any) => dataMax + 10000]}
      title={title}
      transactions={
        overview.map(o => ({...o, total: Math.abs(o.total)}))
      }
    />
  )
}