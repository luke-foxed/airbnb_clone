import { Box, Tab, Tabs, styled } from '@mui/material'
import { useContext } from 'react'
import { NavbarContext } from './constants'

const StyledTabContainer = styled(Tabs)({
  '& .MuiTabs-indicator': {
    background: '#000',
    width: '10px',
  },
})

const StyledTab = styled(Tab)({
  opacity: '1',
  fontSize: '16px',
  textTransform: 'none',
  fontWeight: '400',
  '& .Mui-selected': {
    color: '#000',
  },
  ':hover': {
    color: '#444',
  },
})

const FilterTabs = () => {
  const { onChangeTab, activeTab } = useContext(NavbarContext)
  return (
    <Box>
      <StyledTabContainer onChange={(_, val) => onChangeTab(val)} value={activeTab} textColor="inherit">
        <StyledTab label="Stays" />
        <StyledTab label="Experiences" />
        <StyledTab label="Online Experiences" />
      </StyledTabContainer>
    </Box>
  )
}

export default FilterTabs
