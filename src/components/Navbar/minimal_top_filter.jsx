import { Search } from '@mui/icons-material'
import { Button, Divider, Grid, IconButton, Paper, styled } from '@mui/material'
import { useContext } from 'react'
import theme from '../../lib/theme'
import { NavbarContext } from './constants'

const FiltersContainer = styled(Paper)({
  background: '#FFF',
  cursor: 'pointer',
  width: '350px',
  height: '48px',
  borderRadius: '30px',
  margin: 'auto',
  boxShadow: '0px 1px 7px -1px rgba(0,0,0,0.3)',
  ':hover': {
    boxShadow: '0px 1px 7px -1px rgba(0,0,0,0.5)',
  },
})

const GridLayout = styled('div')({
  display: 'grid',
  gridTemplateColumns: '100px 2px 100px 2px 1fr',
  width: '100%',
  textAlign: 'center',
  alignItems: 'center',
  button: {
    textTransform: 'none',
    fontWeight: '600',
    fontSize: '13px',
  },
})

const MinimalTopFilters = () => {
  const { onChangeFilter } = useContext(NavbarContext)
  return (
    <FiltersContainer>
      <Grid container justifyContent="space-evenly" alignItems="center" style={{ height: '100%' }}>
        <GridLayout>
          <Button style={{ color: '#333' }} onClick={() => onChangeFilter('where')}>
            Anywhere
          </Button>

          <Divider orientation="vertical" flexItem />

          <Button style={{ color: '#333' }} onClick={() => onChangeFilter('checkin')}>
            Any Week
          </Button>

          <Divider orientation="vertical" flexItem />

          <div>
            <Button style={{ color: '#555', fontWeight: '400' }} onClick={() => onChangeFilter('who')}>
              Add Guests
            </Button>
            <IconButton style={{ background: theme.palette.primary.main, color: '#FFF' }}>
              <Search fontSize="small" />
            </IconButton>
          </div>
        </GridLayout>
      </Grid>
    </FiltersContainer>
  )
}

export default MinimalTopFilters
