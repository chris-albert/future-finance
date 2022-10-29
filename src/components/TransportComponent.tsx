import React from 'react'
import {Box, IconButton} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export type TransportComponentProps = {}

export const TransportComponent: React.FC<TransportComponentProps> = () => {
  return (
    <Box>
      <IconButton
        size="small"
        sx={{border: 1}}
        onClick={() => {

        }}
      >
        <PlayArrowIcon fontSize="small"/>
      </IconButton>
    </Box>
  )
}