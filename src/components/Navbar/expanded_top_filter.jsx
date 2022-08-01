import PropTypes from 'prop-types'
import { Close, Search } from '@mui/icons-material'
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Popover,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import theme from '../../lib/theme'
import { Fragment } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useOutsideClick from '../../lib/hooks/use_outside_click'
import { DateDropdown, LocationDropdown } from './expanded_dropdowns'

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

const FilterButton = styled('div', { shouldForwardProp: (props) => props !== 'active' })(({ active }) => ({
  height: '63px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px 0 20px',
  justifyContent: 'space-between',
  borderRadius: '30px',
  background: active && '#fff', // if clicking dropdown below button, persist appearance of being focused
  boxShadow: active && '0px 0px 20px 3px rgba(0,0,0,0.2)',
  ':hover': {
    backgroundColor: !active && '#e5e6e5',
  },
}))

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
      fontWeight: '400',
    },
    fontWeight: '600',
    fontSize: '12px',
  },
})

const SearchButton = styled(IconButton, { shouldForwardProp: (props) => props !== 'expanded' })(
  ({ theme, expanded }) => ({
    background: expanded ? SEARCH_BUTTON_GRADIENT : theme.palette.primary.main,
    color: '#FFF',
    width: expanded ? '112px' : '50px',
    borderRadius: expanded ? '25px' : 'inherit',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    ':hover': {
      background: SEARCH_BUTTON_GRADIENT,
    },
  })
)

const ClearButton = styled(IconButton, { shouldForwardProp: (props) => props !== 'expanded' })({
  backgroundColor: '#f2f3f2',
  svg: {
    color: '#000',
  },
})

const ExpandedTopFilter = ({ currentTab, currentFilter }) => {
  const [activeFilter, setActiveFilter] = useState(currentFilter)
  const [location, setLocation] = useState('')
  const [dates, setDates] = useState(null)
  const [guests, setGuests] = useState(null)
  const [selectedRef, setSelectedRef] = useState(null)

  const getGridLayout = () => {
    let gridTemplateColumns = ''
    if (currentTab === 0) {
      gridTemplateColumns = `2fr 2px 1fr 2px 1fr 2px ${activeFilter ? '2fr' : '1.5fr'}`
    } else {
      gridTemplateColumns = `2fr 2px 1.5fr 2px ${activeFilter ? '2fr' : '1.5fr'}`
    }
    return gridTemplateColumns
  }

  useOutsideClick({ current: selectedRef }, (e) => {
    setActiveFilter(null)
  })

  // focus input if the button surrounding the input us clicked also
  useEffect(() => {
    if (selectedRef) {
      const input = selectedRef.querySelector('input')
      input?.focus()
    }
  }, [selectedRef])

  const handleLocationSelect = (val) => {
    setActiveFilter('checkin')
    setLocation(val)
  }

  console.log('active filetr', activeFilter)

  return (
    <FiltersContainer>
      <Grid container justifyContent="space-evenly" alignItems="center" style={{ height: '100%' }}>
        <GridLayout style={{ background: !!activeFilter && '#f2f3f2', gridTemplateColumns: getGridLayout() }}>
          <FilterButton
            active={activeFilter === 'where'}
            onClick={() => setActiveFilter('where')}
            ref={(el) => (activeFilter === 'where' ? setSelectedRef(el) : null)}
          >
            <StyledFilterInput
              variant="standard"
              label="Where"
              placeholder="Search destinations"
              focused
              size="small"
              value={location}
            />

            {activeFilter === 'where' && (
              <React.Fragment>
                {location !== '' && (
                  <ClearButton size="small" onClick={() => setLocation('')}>
                    <Close fontSize="small" />
                  </ClearButton>
                )}
                <LocationDropdown selected={location} onLocationSelect={handleLocationSelect} />
              </React.Fragment>
            )}
          </FilterButton>

          <Divider orientation="vertical" flexItem style={{ height: '35%', margin: 'auto', borderColor: '#e5e6e5' }} />

          <FilterButton
            active={activeFilter === 'checkin'}
            onClick={() => setActiveFilter('checkin')}
            ref={(el) => (activeFilter === 'checkin' ? setSelectedRef(el) : null)}
          >
            <StyledFilterInput
              variant="standard"
              label="Check In"
              placeholder="Add dates"
              focused
              size="small"
              inputRef={(input) => activeFilter === 'checkin' && input && input.focus()}
            />

            {activeFilter === 'checkin' && <DateDropdown />}
          </FilterButton>

          <Divider orientation="vertical" flexItem style={{ height: '35%', margin: 'auto', borderColor: '#e5e6e5' }} />

          {currentTab === 0 && (
            <Fragment>
              <FilterButton
                onClick={() => setActiveFilter('who')}
                ref={(el) => (activeFilter === 'who' ? setSelectedRef(el) : null)}
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
            ref={(el) => (activeFilter === 'checkout' ? setSelectedRef(el) : null)}
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
