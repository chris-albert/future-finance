import React from 'react'
import {
  AppBar,
  Box,
  Toolbar, Grid, Button, InputLabel, Select, MenuItem, FormControl, IconButton, Avatar
} from "@mui/material";
import { Link } from "react-router-dom";
import {useAtom} from "jotai";
import {
  filteredTransactionsAtom,
  excludedCategoriesAtom,
  excludeBeforeDateAtom,
  transactionsAtom, excludeAfterDateAtom,
} from "./model/atoms";
import _ from "lodash";
import {MultiSelectComponent} from "./components/form/MultiSelectComponent";

export type NavProps = {
}

export const Nav: React.FC<NavProps> = () => {

  const [excludeBefore, setExcludeBefore] = useAtom(excludeBeforeDateAtom)
  const [excludeAfter, setExcludeAfter] = useAtom(excludeAfterDateAtom)
  const [transactions] = useAtom(transactionsAtom)
  const [filteredTransactions, setFilteredTransactions] = useAtom(filteredTransactionsAtom)
  const [selectedGroups, setSelectedGroups] = useAtom(excludedCategoriesAtom)

  React.useEffect(() => {
    setFilteredTransactions(_.filter(transactions, t =>
      t.date > excludeBefore && t.date < excludeAfter && (_.indexOf(selectedGroups, t.group) === -1)
    ))
  }, [transactions, excludeBefore, excludeAfter, selectedGroups])

  const dates = React.useMemo(() =>
    _.keys(_.groupBy(transactions, t => t.date.slice(0, 7)))
  , [transactions])

  const origGroups = React.useMemo(() =>
    _.uniq(_.map(transactions, t => t.group))
  , [transactions])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
      >
        <Toolbar>
          <Grid container sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex'
            }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Button
                  sx={{
                    minWidth: 38,
                    height: 38,
                    p: 0,
                    m: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  color="success"
                  variant='outlined'
                  component={Link}
                  to="/"
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <img src='./favicon.ico' />
                  </Box>

                </Button>
              </Box>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Exclude Before Date</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={excludeBefore}
                  label="Exclude Before Date"
                  onChange={e => setExcludeBefore(e.target.value)}
                >
                  {dates.map(date => (
                    <MenuItem key={`date-${date}`} value={date}>{date}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Exclude After Date</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={excludeAfter}
                  label="Exclude After Date"
                  onChange={e => setExcludeAfter(e.target.value)}
                >
                  {dates.map(date => (
                    <MenuItem key={`date-${date}`} value={date}>{date}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <MultiSelectComponent
                label='Exclude Groups'
                items={origGroups}
                selected={selectedGroups}
                onChange={setSelectedGroups}
                sx={{ m: 1, minWidth: 300 }}
              />
            </Grid>
            <Grid item xs={4} container justifyContent="right">
              <Button
                sx={{color: 'white'}}
                component={Link}
                to="/data"
              >
                Data
              </Button>

            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    </Box>
  )
}