import { Close, Search } from '@mui/icons-material'
import { Divider, Grid, IconButton, Paper, styled, TextField } from '@mui/material'
import { Fragment, useState, useEffect, useContext } from 'react'
import useOutsideClick from '../../lib/hooks/use_outside_click'
import { DateDropdown, LocationDropdown } from './expanded_dropdowns'
import { NavbarContext } from './constants'

// eslint-disable-next-line max-len
const SEARCH_BUTTON_GRADIENT = 'linear-gradient(90deg, rgb(230,30,77) 0%, rgb(227,28,95) 50%, rgb(215,4,102) 67.5%, rgb(209,29,96) 100%)'

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
  width: '100%',
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
  }),
)

const ClearButton = styled(IconButton, { shouldForwardProp: (props) => props !== 'expanded' })({
  backgroundColor: '#f2f3f2',
  svg: {
    color: '#000',
  },
})

const ExpandedTopFilter = () => {
  const { activeTab, activeFilter, onChangeFilter } = useContext(NavbarContext)

  const [location, setLocation] = useState('')
  const [dateRange, setDateRange] = useState([null, null])
  const [selectedRef, setSelectedRef] = useState(null)

  const getShortDateString = (date) => {
    const shortDate = date
      ? `${new Date(date).getDate()} ${new Date(date).toLocaleString('en-us', { weekday: 'short' })}`
      : ''
    return shortDate
  }

  const getGridLayout = () => {
    let gridTemplateColumns = ''
    if (activeTab === 0) {
      gridTemplateColumns = `2fr 2px 1fr 2px 1fr 2px ${activeFilter ? '2fr' : '1.5fr'}`
    } else {
      gridTemplateColumns = `2fr 2px 1.5fr 2px ${activeFilter ? '2fr' : '1.5fr'}`
    }
    return gridTemplateColumns
  }

  useOutsideClick({ current: selectedRef }, () => {
    onChangeFilter('')
  })

  // focus input if the button surrounding the input us clicked also
  useEffect(() => {
    if (selectedRef) {
      const input = selectedRef.querySelector('input')
      input?.focus()
    }
  }, [selectedRef])

  const handleLocationSelect = (val) => {
    onChangeFilter('checkin')
    setLocation(val)
  }

  const handleDatesSelect = (date) => {
    if (activeFilter === 'checkin') {
      setDateRange([date, dateRange[1]])
      if (!dateRange[1]) {
        onChangeFilter('checkout')
      }
    }

    if (activeFilter === 'checkout') {
      setDateRange([dateRange[0], date])
    }
  }

  return (
    <FiltersContainer>
      <Grid container justifyContent="space-evenly" alignItems="center" style={{ height: '100%' }}>
        <GridLayout style={{ background: !!activeFilter && '#f2f3f2', gridTemplateColumns: getGridLayout() }}>
          <FilterButton
            active={activeFilter === 'where'}
            onClick={() => onChangeFilter('where')}
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
              <>
                {location !== '' && (
                  <ClearButton size="small" onClick={() => setLocation('')}>
                    <Close fontSize="small" />
                  </ClearButton>
                )}
                <LocationDropdown selected={location} onLocationSelect={handleLocationSelect} />
              </>
            )}
          </FilterButton>

          <Divider orientation="vertical" flexItem style={{ height: '35%', margin: 'auto', borderColor: '#e5e6e5' }} />

          {activeTab === 0 ? (
            <>
              <FilterButton
                active={activeFilter === 'checkin'}
                onClick={() => onChangeFilter('checkin')}
                ref={(el) => (activeFilter === 'checkin' ? setSelectedRef(el) : null)}
              >
                <StyledFilterInput
                  value={getShortDateString(dateRange[0])}
                  variant="standard"
                  label="Check In"
                  placeholder="Add dates"
                  focused
                  InputProps={{ readOnly: true }}
                  size="small"
                  inputRef={(input) => activeFilter === 'checkin' && input && input.focus()}
                />

                {(activeFilter === 'checkin' || activeFilter === 'checkout') && (
                  <>
                    {dateRange[0] && (
                      <ClearButton size="small" onClick={() => setDateRange([null, dateRange[1]])}>
                        <Close fontSize="small" />
                      </ClearButton>
                    )}
                    <DateDropdown dateRange={dateRange} onDatesSelect={handleDatesSelect} />
                  </>
                )}
              </FilterButton>

              <Divider
                orientation="vertical"
                flexItem
                style={{ height: '35%', margin: 'auto', borderColor: '#e5e6e5' }}
              />

              <FilterButton
                active={activeFilter === 'checkout'}
                onClick={() => onChangeFilter('checkout')}
                ref={(el) => (activeFilter === 'checkout' ? setSelectedRef(el) : null)}
              >
                <StyledFilterInput
                  value={getShortDateString(dateRange[1])}
                  variant="standard"
                  label="Check Out"
                  placeholder="Add dates"
                  focused
                  size="small"
                  inputRef={(input) => activeFilter === 'checkout' && input && input.focus()}
                />
                {activeFilter === 'checkout' && dateRange[1] && (
                  <ClearButton size="small" onClick={() => setDateRange([dateRange[0], null])}>
                    <Close fontSize="small" />
                  </ClearButton>
                )}
              </FilterButton>
            </>
          ) : (
            <FilterButton
              active={activeFilter === 'date'}
              onClick={() => onChangeFilter('date')}
              ref={(el) => (activeFilter === 'date' ? setSelectedRef(el) : null)}
            >
              <StyledFilterInput
                value={getShortDateString(dateRange[1])}
                variant="standard"
                label="Date"
                placeholder="Add when you want to go"
                focused
                size="small"
                inputRef={(input) => activeFilter === 'date' && input && input.focus()}
              />
              {activeFilter === 'date' && dateRange[1] && (
                <ClearButton size="small" onClick={() => setDateRange([dateRange[0], null])}>
                  <Close fontSize="small" />
                </ClearButton>
              )}
            </FilterButton>
          )}

          <Divider orientation="vertical" flexItem style={{ height: '35%', margin: 'auto', borderColor: '#e1e3e1' }} />

          <FilterButton
            onClick={() => onChangeFilter('who')}
            ref={(el) => (activeFilter === 'who' ? setSelectedRef(el) : null)}
          >
            <StyledFilterInput
              variant="standard"
              label="Who"
              placeholder="Add guests"
              focused
              size="small"
              inputRef={(input) => activeFilter === 'who' && input && input.focus()}
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

export default ExpandedTopFilter
