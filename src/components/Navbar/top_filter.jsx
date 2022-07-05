import { Search } from '@mui/icons-material'
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  styled,
  Typography,
} from '@mui/material'
import theme from '../../lib/theme'

const FiltersContainer = styled(Paper)({
  background: '#FFF',
  cursor: 'pointer',
  width: '380px',
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
  gridTemplateColumns: '1fr 5px 1fr 5px 1fr auto',
  width: '100%',
  textAlign: 'center',
  alignItems: 'center',
})

const TopFilter = () => (
  <FiltersContainer>
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      style={{ height: '100% ' }}
    >
      <GridLayout>
        <Typography>Anywhere</Typography>

        <Divider orientation="vertical" flexItem />

        <Typography>Any Week</Typography>

        <Divider orientation="vertical" flexItem />

        <Typography>Add Guests</Typography>
        <IconButton style={{ background: theme.palette.primary.main, color: '#FFF' }}>
          <Search fontSize="4px" />
        </IconButton>
      </GridLayout>
    </Grid>
  </FiltersContainer>
)

export default TopFilter
