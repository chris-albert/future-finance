import React from 'react'
import {
  Bar,
  ComposedChart,
  CartesianGrid,
  Label,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis, Line, Legend
} from "recharts";
import {dollarFormatter} from "../util/Formatters";
import _ from "lodash";
import {Box, FormControlLabel, FormGroup, Switch, Typography} from "@mui/material";
import {StackedTransaction} from "../data/Model";

const chartColors = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  'red',
  'pink',
  'blue'
]

export type DetailStackedBarComponentProps = {
  transactions: Array<StackedTransaction>
  height?: number
}

export const DetailStackedBarComponent: React.FC<DetailStackedBarComponentProps> = ({
  transactions,
  height = 300
}) => {

  const [useLine, setUseLine] = React.useState(false)

  const averageTotal = React.useMemo(() =>
    _.mean(_.map(transactions, t => t.total))
  , [transactions])

  const stacks: Array<string> = React.useMemo(() =>
    _.pullAll(_.uniq(_.flatMap(transactions, ss => _.keys(ss))), ['date', 'total'])
  , [transactions])

  const onBarClick = (e: any) => {
    console.log('onBarClick', e)
  }

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'right'}}>
        <FormGroup>
          <FormControlLabel control={<Switch checked={useLine} onChange={e => setUseLine(e.target.checked)}/>} label="Line" />
        </FormGroup>
      </Box>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          height={height}
          data={transactions}
          margin={{
            top: 5,
            right: 5,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
          />
          <YAxis
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => dollarFormatter.format(_.toNumber(value) / 100)}
          />
          <Tooltip
            label='whoa'
            content={(obj) => {
              return (
                <Box sx={{
                  p: 1,
                  backgroundColor: 'white',
                  border: '1px solid black',
                  borderRadius: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <Box>
                    <Typography
                      color='black'
                      sx={{
                        fontSize: '1.2em',
                        fontWeight: 'bold'

                      }}
                    >
                      Date: {obj.label}
                    </Typography>
                    <hr/>
                  </Box>
                  {_.map(obj.payload, item => (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                      key={`${obj.label}-${item.dataKey}`}
                    >
                      <Typography color={item.color}>{item.dataKey}</Typography>
                      <Typography color='black'>
                        {dollarFormatter.format(_.toNumber(item.value) / 100)}
                      </Typography>
                    </Box>
                  ))}

                  <Box>
                    <hr/>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography color='black'>Total</Typography>
                    <Typography color='black'>
                      {dollarFormatter.format(_.toNumber(
                        _.sum(_.map(obj.payload, p => p.value))
                      ) / 100)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography color='red'>Mean</Typography>
                    <Typography color='red'>
                      {dollarFormatter.format(averageTotal / 100)}
                    </Typography>
                  </Box>
                </Box>
              )
            }}
          />
          <Legend verticalAlign="bottom" height={36}/>
          <ReferenceLine
            y={0}
            stroke="yellow"
            isFront={true}
          />
          <ReferenceLine
            y={averageTotal}
            isFront={true}
            stroke="red"
            strokeDasharray="3 3"
          >
            <Label
              value={`Mean: ${dollarFormatter.format(_.toNumber(averageTotal) / 100)}`}
              offset={0}
              position="left"
            />
          </ReferenceLine>
          {_.map(stacks, (stack, index) =>
            useLine ? (
              <Line
                key={stack}
                dataKey={stack}
                stroke={chartColors[index % chartColors.length]}
              />
            ):
            (
            <Bar
              key={stack}
              dataKey={stack}
              stackId="a"
              fill={chartColors[index % chartColors.length]}
              onClick={onBarClick}
            >
              {index === stacks.length - 1 ?
                <LabelList
                  position="top"
                  valueAccessor={(s: any) => {
                    return s.total
                  }}
                  formatter={(value: any) => dollarFormatter.format(_.toNumber(value) / 100)}
                /> : null}
            </Bar>
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}
