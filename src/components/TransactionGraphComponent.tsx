import React from 'react'
import {TransactionOverviewItem} from "../data/Model";
import {Box, Card, CardContent, CardHeader} from "@mui/material";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  Bar,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";
import _ from 'lodash'
import {dollarFormatter} from "../util/Formatters";
import {AxisDomain} from "recharts/types/util/types";

export type TransactionGraphComponentProps = {
  title: string
  transactions: Array<TransactionOverviewItem>
  referenceLine?: number
  xDomain?: AxisDomain
}

export const TransactionGraphComponent: React.FC<TransactionGraphComponentProps> = ({
  title,
  transactions,
  referenceLine,
  xDomain = ['dataMin', 'dataMax']
}) => {

  return (
    <Card>
      <CardHeader
        title={title}
      />
      <CardContent>
        <Box>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={transactions}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {referenceLine !== undefined ?
                (<ReferenceLine y={referenceLine} stroke="red" strokeDasharray="3 3" />):
                null
              }
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickCount={10}/>
              <YAxis
                type="number"
                domain={xDomain}
                tickFormatter={(value) => dollarFormatter.format(_.toNumber(value) / 100)}
              />
              <Tooltip
                formatter={(value) => dollarFormatter.format(_.toNumber(value) / 100)}
              />
              <Bar type="monotone" dataKey="total" fill="#82ca9d" />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>

  )
}