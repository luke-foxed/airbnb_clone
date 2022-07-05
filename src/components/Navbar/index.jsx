import { AppBar, Grid, styled } from '@mui/material'
import TopFilter from './top_filter'

const StyledTopBar = styled(AppBar)({
  height: '80px',
  background: 'white',
  color: 'black',
})

const Navbar = () => (
  <StyledTopBar position="sticky">
    <Grid
      style={{ width: '70%', margin: 'auto' }}
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <img src="/logo.svg" alt="me" width="100" />
      <div>
        <TopFilter />
      </div>
      <div>account</div>
    </Grid>
  </StyledTopBar>
)

export default Navbar
