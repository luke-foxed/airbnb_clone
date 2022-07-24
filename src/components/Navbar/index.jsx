import { AppBar, Grid, styled } from '@mui/material'
import { useState } from 'react'
import ExpandedTopFilter from './expanded_top_filter'
import FilterTabs from './filter_tabs'
import MinimalTopFilters from './minimal_top_filter'

const StyledTopBar = styled(AppBar)({
  height: '80px',
  background: 'white',
  color: 'black',
  boxShadow: 'none',
  borderBottom: '1px solid #e1e3e1',
})

const Navbar = () => {
  const [activeFilter, setActiveFilter] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledTopBar position="sticky" style={{ height: activeFilter ? 160 : 80 }}>
      <Grid
        style={{ width: '70%', margin: 'auto' }}
        container
        alignItems="center"
        justifyContent="space-between"
        xs={12}
      >
        <img src="/logo.svg" alt="me" width="100" />
        <div>
          {activeFilter ? (
            <FilterTabs currentTab={activeTab} onChangeTab={(tab) => setActiveTab(tab)} />
          ) : (
            <MinimalTopFilters onFilterClick={(val) => setActiveFilter(val)} />
          )}
        </div>
        <div>account</div>
      </Grid>
      {activeFilter && (
        <div style={{ paddingBottom: '20px' }}>
          <ExpandedTopFilter currentTab={activeTab} />
        </div>
      )}
    </StyledTopBar>
  )
}

export default Navbar
