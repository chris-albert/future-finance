import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SxProps, Theme
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export type MultiSelectComponentProps = {
  label: string
  items: Array<string>
  selected: Array<string>
  onChange: (s: Array<string>) => void
  sx?: SxProps<Theme>
}

export const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({
  label,
  items,
  selected,
  onChange,
  sx
}) => {

  const handleChange = (event: SelectChangeEvent<Array<string>>) => {
    const { target: { value } } = event
    onChange(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <FormControl sx={sx} size='small'>
      <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={selected}
        onChange={handleChange}
        label={label}
        // input={<OutlinedInput label={label} />}
        // MenuProps={MenuProps}
      >
        {items.map((item) => (
          <MenuItem
            key={item}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
