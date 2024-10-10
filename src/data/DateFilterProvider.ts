import React from 'react'

export const DateFilterProvider = React.createContext('')

export const useDateFilter = () => React.useContext(DateFilterProvider)