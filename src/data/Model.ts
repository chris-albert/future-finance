import * as t from 'io-ts'
import _ from 'lodash'

export const Transaction = t.type({
  account: t.string,
  category: t.string,
  group: t.string,
  date: t.string,
  payee: t.string,
  amountInCents: t.number
})

export type Transaction = t.TypeOf<typeof Transaction>

export const transactionByMonth = (transactions: Array<Transaction>) => {
  return _.groupBy(transactions, t => t.date.slice(0, 7))
}

export const transactionByDay = (transactions: Array<Transaction>) => {
  return _.groupBy(transactions, t => t.date.slice(0, 10))
}

export type TransactionOverviewItem = {
  date: string,
  count: number,
  total: number,
  totalInput: number,
  totalOutput: number
}

export const transactionsByMonth = (transactions: Array<Transaction>): Array<TransactionOverviewItem> => {
  return transactionOverview(transactions, transactionByMonth)
}

export const transactionsByDay = (transactions: Array<Transaction>): Array<TransactionOverviewItem> => {
  return transactionOverview(transactions, transactionByDay)
}

export const transactionOverview = (
  transactions: Array<Transaction>,
  groupFunc: (ts: Array<Transaction>) => _.Dictionary<Array<Transaction>>
): Array<TransactionOverviewItem> => {
  const byDates = groupFunc(transactions)
  const results =  _.map(byDates, (txns, date) => {
    return {
      date,
      count: _.size(txns),
      total: _.sumBy(txns, t => t.amountInCents),
      totalInput: _.sumBy(_.filter(txns, t => t.amountInCents > 0), 'amountInCents'),
      totalOutput: _.sumBy(_.filter(txns, t => t.amountInCents < 0), 'amountInCents'),
    }
  })
  return _.sortBy(results, 'date')
}

export type TransactionAccumulated = {
  date: string
  value: number
  overviewItem: TransactionOverviewItem
}

export const transactionsAccumulated = (
  transactionOverviews: Array<TransactionOverviewItem>
): Array<TransactionAccumulated> => {

  const result: Array<TransactionAccumulated> = []
  let runningTotal = 0
  _.forEach(transactionOverviews, txnOverview => {
    runningTotal = runningTotal + txnOverview.total
    result.push({
      date: txnOverview.date,
      value: runningTotal,
      overviewItem: txnOverview
    })
  })


  return result
}

export const StackedTransaction = t.intersection([t.type({
  date: t.string,
  total: t.number
}), t.record(t.string, t.number)])

export type StackedTransaction = t.TypeOf<typeof StackedTransaction>

export const buildStackedTransactions = (
  transactions: Array<Transaction>,
  stackFunc: (t: Transaction) => string
): Array<StackedTransaction> => {
  const transactionsByMonth = _.groupBy(transactions, t => t.date.slice(0, 7))

  const results =  _.map(transactionsByMonth, (txns, date) => {
    const groups = _.groupBy(txns, stackFunc)

    const stack = _.fromPairs(_.map(groups, (g, groupName) => {
      const t = _.sumBy(g, t => t.amountInCents)
      return [groupName, t]
    }))

    const total = _.sum(_.values(stack))

    return {date, total, ...stack} as StackedTransaction
  })

  return _.sortBy(results, 'date')
}