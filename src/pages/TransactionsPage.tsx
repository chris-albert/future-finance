import React from 'react'
import {filteredTransactionsAtom, transactionsAtom} from "../model/atoms";
import {useAtom, useAtomValue} from "jotai";
import {Box} from "@mui/material";
import {transactionsAccumulated, transactionsByDay} from "../data/Model";
import _ from 'lodash'
import {
  CartesianGrid,
  ComposedChart, Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {dollarFormatter} from "../util/Formatters";

export type TransactionsPageProps = {}

export const TransactionsPage: React.FC<TransactionsPageProps> = () => {

  const filteredTransactions = useAtomValue(filteredTransactionsAtom)

  const txnsOverview = transactionsAccumulated(transactionsByDay(filteredTransactions))

  return (
    <Box>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={txnsOverview}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date"/>

          <YAxis
            dataKey='value'
            type="number"
            tickFormatter={(value) => dollarFormatter.format(_.toNumber(value) / 100)}
          />
          <Tooltip
            formatter={(value) => dollarFormatter.format(_.toNumber(value) / 100)}
          />
          <Line type="monotone" dataKey="value" fill="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}