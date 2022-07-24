import PropTypes from 'prop-types'
import { Box, Tab, Tabs, styled } from '@mui/material'
import { useState } from 'react'

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

const FilterTabs = ({ currentTab, onChangeTab }) => {
  const handleChangeTab = (event, value) => {
    onChangeTab(value)
  }

  return (
    <Box>
      <StyledTabContainer
        aria-label="basic tabs example"
        onChange={handleChangeTab}
        value={currentTab}
        textColor="inherit"
      >
        <StyledTab label="Stays" />
        <StyledTab label="Experiences" />
        <StyledTab label="Online Experiences" />
      </StyledTabContainer>
    </Box>
  )
}

FilterTabs.propTypes = {
  currentTab: PropTypes.number,
  onChangeTab: PropTypes.func,
}
FilterTabs.defaultProps = {
  currentTab: 0,
}

export default FilterTabs
