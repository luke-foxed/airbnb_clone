import PropTypes from 'prop-types'
import { Search } from '@mui/icons-material'
import { Button, Divider, Grid, IconButton, Paper, styled, TextField, Typography } from '@mui/material'
import theme from '../../lib/theme'
import { Fragment } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useOutsideClick from '../../lib/hooks/use_outside_click'

const SEARCH_BUTTON_GRADIENT =
  'linear-gradient(90deg, rgb(230,30,77) 0%, rgb(227,28,95) 50%, rgb(215,4,102) 67.5%, rgb(209,29,96) 100%)'

const FiltersContainer = styled(Paper)({
  background: '#FFF',
  cursor: 'pointer',
  width: '850px',
  height: '64px',
  borderRadius: '30px',
  margin: 'auto',
  border: '1px solid #e5e6e5',
  boxShadow: 'none',
})

const GridLayout = styled('div')({
  display: 'grid',
  width: '100%',
  borderRadius: '30px',
  button: {
    textTransform: 'none',
    fontWeight: '600',
    fontSize: '13px',
    justifyContent: 'start',
  },
})

const FilterButton = styled('div')({
  height: '63px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px 0 20px',
  justifyContent: 'space-between',
  borderRadius: '30px',
  ':focus-within': {
    background: '#fff !important',
    boxShadow: '0px 0px 20px 3px rgba(0,0,0,0.2)',
  },
  ':hover': {
    backgroundColor: '#e5e6e5',
  },
})

const StyledFilterInput = styled(TextField)({
  marginTop: '8px',
  '& .MuiInputLabel-root': {
    color: '#000 !important',
    fontWeight: '600',
  },
  '& .MuiInput-root': {
    '::before, ::after': {
      border: 'none !important',
    },
  },
  input: {
    '&::placeholder': {
      fontSize: '12px',
      color: '#222222',
      opacity: 1,
    },
    fontSize: '12px',
  },
})

const SearchButton = styled(IconButton)(({ theme, expanded }) => ({
  background: expanded ? SEARCH_BUTTON_GRADIENT : theme.palette.primary.main,
  '-webkit-backface-visibility': 'hidden',

  color: '#FFF',
  width: expanded ? '112px' : '50px',
  borderRadius: expanded ? '25px' : 'inherit',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  ':hover': {
    background: SEARCH_BUTTON_GRADIENT,
  },
}))

const ExpandedTopFilter = ({ currentTab, currentFilter }) => {
  const [activeFilter, setActiveFilter] = useState(currentFilter)
  const selectedFilterRef = useRef(null)

  const getGridLayout = () => {
    let gridTemplateColumns = ''
    if (currentTab === 0) {
      gridTemplateColumns = `2fr 2px 1fr 2px 1fr 2px ${activeFilter ? '2fr' : '1.5fr'}`
    } else {
      gridTemplateColumns = `2fr 2px 1.5fr 2px ${activeFilter ? '2fr' : '1.5fr'}`
    }
    return gridTemplateColumns
  }

  useOutsideClick(selectedFilterRef, () => {
    setActiveFilter(null)
  })

  return (
    <FiltersContainer>
      <Grid container justifyContent="space-evenly" alignItems="center" style={{ height: '100%' }}>
        <GridLayout style={{ background: !!activeFilter && '#f2f3f2', gridTemplateColumns: getGridLayout() }}>
          <FilterButton
            role="button"
            onClick={() => setActiveFilter('where')}
            ref={activeFilter === 'where' ? selectedFilterRef : null}
          >
            <StyledFilterInput
              variant="standard"
              label="Where"
              placeholder="Search destinations"
              focused
              size="small"
              inputRef={(input) => activeFilter === 'where' && input && input.focus()}
            />
          </FilterButton>

          <Divider orientation="vertical" flexItem style={{ height: '35%', margin: 'auto', borderColor: '#e5e6e5' }} />

          <FilterButton
            onClick={() => setActiveFilter('checkin')}
            ref={activeFilter === 'checkin' ? selectedFilterRef : null}
          >
            <StyledFilterInput
              variant="standard"
              label="Check In"
              placeholder="Add dates"
              focused
              size="small"
              inputRef={(input) => activeFilter === 'checkin' && input && input.focus()}
            />
          </FilterButton>

          <Divider orientation="vertical" flexItem style={{ height: '35%', margin: 'auto', borderColor: '#e5e6e5' }} />

          {currentTab === 0 && (
            <Fragment>
              <FilterButton
                onClick={() => setActiveFilter('who')}
                ref={activeFilter === 'who' ? selectedFilterRef : null}
              >
                <StyledFilterInput
                  variant="standard"
                  label="Check Out"
                  placeholder="Add dates"
                  focused
                  size="small"
                  inputRef={(input) => activeFilter === 'who' && input && input.focus()}
                />
              </FilterButton>

              <Divider
                orientation="vertical"
                flexItem
                style={{ height: '35%', margin: 'auto', borderColor: '#e1e3e1' }}
              />
            </Fragment>
          )}

          <FilterButton
            onClick={() => setActiveFilter('checkout')}
            ref={activeFilter === 'checkout' ? selectedFilterRef : null}
          >
            <StyledFilterInput
              variant="standard"
              label="Who"
              placeholder="Add guests"
              focused
              size="small"
              inputRef={(input) => activeFilter === 'checkout' && input && input.focus()}
            />
            <SearchButton size="large" expanded={!!activeFilter}>
              <Search />
              {activeFilter && <div style={{ marginLeft: '4px', fontSize: '16px' }}>Search</div>}
            </SearchButton>
          </FilterButton>
        </GridLayout>
      </Grid>
    </FiltersContainer>
  )
}

ExpandedTopFilter.propTypes = {
  onFilterClick: PropTypes.func.isRequired,
}

export default ExpandedTopFilter
