import { AppBar, Grid, styled } from '@mui/material'
import { useState } from 'react'
import ExpandedTopFilters from './expanded_top_filter'
import MinimalTopFilters from './minimal_top_filter'

const StyledTopBar = styled(AppBar)({
  height: '80px',
  background: 'white',
  color: 'black',
})

const Navbar = () => {
  const [activeFilterTab, setActiveFilterTab] = useState(null)

  return (
    <StyledTopBar position="sticky">
      <Grid
        style={{ width: '70%', margin: 'auto' }}
        container
        alignItems="center"
        justifyContent="space-between"
        xs={12}
      >
        <img src="/logo.svg" alt="me" width="100" />
        <div>
          {activeFilterTab !== null ? (
            <ExpandedTopFilters currentTab={activeFilterTab} />
          ) : (
            <MinimalTopFilters onFilterClick={(val) => setActiveFilterTab(val)} />
          )}
        </div>
        <div>account</div>
      </Grid>
    </StyledTopBar>
  )
}

export default Navbar
