import { styled } from '@mui/material'

// dumping ground for any reusable styles
// eslint-disable-next-line import/prefer-default-export
export const DropdownContainer = styled('div')(({ width, left, height }) => ({
  background: '#FFF',
  position: 'absolute',
  cursor: 'default',
  top: '155px',
  marginLeft: `-${left}`,
  borderRadius: '30px',
  boxShadow: '0px 0px 20px 3px rgba(0,0,0,0.2)',
  padding: '45px',
  width,
  height,
}))
