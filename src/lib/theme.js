import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF385C',
      light: '#FFF',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Montserrat'],
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ':hover': {
            backgroundColor: 'inherit !important',
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
  },
})

export default theme
