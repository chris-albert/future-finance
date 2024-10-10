import React from 'react'
import {useAtomValue} from "jotai";
import {filteredTransactionsAtom} from "../model/atoms";
import {buildStackedTransactions, StackedTransaction} from "../data/Model";
import _ from "lodash";
import {
  Box, Card, CardContent, CardHeader,
  Grid
} from "@mui/material";
import {DetailStackedBarComponent} from "../components/DetailStackedBarComponent";
import {TransactionsPage} from "./TransactionsPage";

export type GroupsPageProps = {}

export const GroupsPage: React.FC<GroupsPageProps> = ({}) => {

  const filteredTransactions = useAtomValue(filteredTransactionsAtom)
  const [groups, setGroups] = React.useState<string[]>([])

  const [stacked, setStacked] = React.useState<Array<StackedTransaction>>([])

  React.useEffect(() => {
    setGroups(_.keys(_.groupBy(filteredTransactions, t => t.group)))
    setStacked(buildStackedTransactions(filteredTransactions, t => t.group))
  }, [filteredTransactions])
  return (
    <Box>
      <Box sx={{mb: 2}}>
        <Card>
          <CardHeader
            title='Burndown'
          />
          <CardContent>
            <TransactionsPage />
          </CardContent>
        </Card>
      </Box>
      <Box sx={{mb: 2}}>
        <Card>
          <CardHeader
            title='Total Spent'
          />
          <CardContent>
            <DetailStackedBarComponent
              height={500}
              transactions={stacked}
            />
          </CardContent>
        </Card>
      </Box>
      <Grid container spacing={2}>
        {groups.map(group => (
          <Grid item xs={4} key={`group-${group}`}>
            <Card>
              <CardHeader
                title={group}
              />
              <CardContent>
                <DetailStackedBarComponent
                  transactions={buildStackedTransactions(filteredTransactions.filter(f => f.group === group), t => t.category)}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
