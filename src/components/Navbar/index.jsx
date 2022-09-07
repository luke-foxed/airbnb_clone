import { AppBar, Grid, styled } from '@mui/material'
import { useRef, useState } from 'react'
import { NavbarContext } from './constants'
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
  const contextRef = useRef({})

  const handleChangeFilter = (filter) => setActiveFilter(filter)
  const handleChangeTab = (tab) => setActiveTab(tab)

  // setup context getters and setters
  contextRef.current.activeFilter = activeFilter
  contextRef.current.activeTab = activeTab
  contextRef.current.onChangeFilter = handleChangeFilter
  contextRef.current.onChangeTab = handleChangeTab

  return (
    <NavbarContext.Provider value={contextRef.current}>
      <StyledTopBar position="sticky" style={{ height: activeFilter !== null ? 160 : 80 }}>
        <Grid
          style={{ width: '70%', margin: 'auto' }}
          container
          alignItems="center"
          justifyContent="space-between"
          xs={12}
        >
          <img src="/logo.svg" alt="me" width="100" />
          <div>{activeFilter !== null ? <FilterTabs /> : <MinimalTopFilters />}</div>
          <div>account</div>
        </Grid>
        {activeFilter !== null && (
          <div style={{ paddingBottom: '20px' }}>
            <ExpandedTopFilter />
          </div>
        )}
      </StyledTopBar>
    </NavbarContext.Provider>
  )
}

export default Navbar
