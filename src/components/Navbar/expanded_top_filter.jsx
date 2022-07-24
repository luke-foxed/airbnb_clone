import PropTypes from 'prop-types'
import { Search } from '@mui/icons-material'
import { Button, Divider, Grid, IconButton, Paper, styled, TextField } from '@mui/material'
import theme from '../../lib/theme'
import { Fragment } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useOutsideClick from '../../lib/hooks/use_outside_click'

const FiltersContainer = styled(Paper)({
  background: '#FFF',
  cursor: 'pointer',
  width: '850px',
  height: '64px',
  borderRadius: '30px',
  margin: 'auto',
  border: '1px solid #e1e3e1',
  boxShadow: 'none',
})

const GridLayout = styled('div')({
  display: 'grid',
  width: '100%',
  button: {
    textTransform: 'none',
    paddingLeft: '25px',
    fontWeight: '600',
    fontSize: '13px',
    justifyContent: 'start',
  },
})

const Filter = styled(Grid)(({ active }) => ({
  height: '63px',
  padding: '15px',
  borderRadius: '30px',
  ':hover': {
    backgroundColor: !active && '#e1e3e1',
  },

  boxShadow: active && '0px 0px 20px 3px rgba(0,0,0,0.2)',
}))

const StyledFilterInput = styled(TextField)({
  height: '64px',
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

const ExpandedTopFilter = ({ currentTab, currentFilter }) => {
  const [activeFilter, setActiveFilter] = useState(currentFilter)
  const selectedFilterRef = useRef(null)

  useOutsideClick(selectedFilterRef, () => {
    setActiveFilter(null)
  })

  return (
    <FiltersContainer>
      <Grid container justifyContent="space-evenly" alignItems="center" style={{ height: '100%' }}>
        <GridLayout
          style={{
            gridTemplateColumns: currentTab === 0 ? '1.5fr 2px 1fr 2px 1fr 2px 1fr' : '1fr 2px 1fr 2px 1fr',
          }}
        >
          <Filter
            role="button"
            onClick={() => setActiveFilter('where')}
            active={activeFilter === 'where'}
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
          </Filter>

          <Divider orientation="vertical" flexItem style={{ height: '35%', margin: 'auto', borderColor: '#e1e3e1' }} />

          <Filter
            onClick={() => setActiveFilter('checkin')}
            active={activeFilter === 'checkin'}
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
          </Filter>

          <Divider orientation="vertical" flexItem style={{ height: '35%', margin: 'auto', borderColor: '#e1e3e1' }} />

          {currentTab === 0 && (
            <Fragment>
              <Filter
                onClick={() => setActiveFilter('checkout')}
                active={activeFilter === 'checkout'}
                ref={activeFilter === 'checkout' ? selectedFilterRef : null}
              >
                <StyledFilterInput
                  variant="standard"
                  label="Check Out"
                  placeholder="Add dates"
                  focused
                  size="small"
                  inputRef={(input) => activeFilter === 'checkout' && input && input.focus()}
                />
              </Filter>

              <Divider
                orientation="vertical"
                flexItem
                style={{ height: '35%', margin: 'auto', borderColor: '#e1e3e1' }}
              />
            </Fragment>
          )}

          <div>
            <Button style={{ color: '#555', fontWeight: '400' }}>Who</Button>
            <IconButton style={{ background: theme.palette.primary.main, color: '#FFF' }}>
              <Search fontSize="small" />
            </IconButton>
          </div>
        </GridLayout>
      </Grid>
    </FiltersContainer>
  )
}

ExpandedTopFilter.propTypes = {
  onFilterClick: PropTypes.func.isRequired,
}

export default ExpandedTopFilter
