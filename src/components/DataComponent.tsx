import React from 'react'
import {Box, Button} from "@mui/material";

export type DataComponentProps = {}

export const DataComponent: React.FC<DataComponentProps> = () => {


  const onDataUpload = () => {

  }

  return (
    <Box>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="text/csv" multiple type="file" />
      </Button>
    </Box>
  )
}