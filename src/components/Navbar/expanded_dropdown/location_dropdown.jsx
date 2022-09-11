import { ButtonBase, Grid, styled, Typography } from '@mui/material'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { DropdownContainer } from '../../../lib/hooks/styles'
import { REGIONS } from '../constants'

const ImageButton = styled(ButtonBase, { shouldForwardProp: (props) => props !== 'active' })(({ active }) => ({
  margin: '5px',
  borderRadius: '15px',
  border: active ? '2px solid #000' : '1px solid #e5e6e5',
  transition: 'border-color 0.4s ease',
  img: {
    borderRadius: '15px',
  },
  ':hover': {
    borderColor: '#000',
  },
}))

const LocationDropdown = ({ selected, onLocationSelect }) => (
  <DropdownContainer width="490px" left="20px" height="470px">
    <Typography style={{ fontSize: '13px', fontWeight: 700 }}>Search by region</Typography>
    <Grid container justifyContent="space-between" rowGap={4} style={{ marginTop: '20px' }}>
      {REGIONS.map(({ name, image }) => (
        <Grid item xs={4} textAlign="start">
          <ImageButton
            onClick={(e) => {
              e.stopPropagation()
              onLocationSelect(name)
            }}
            active={selected === name}
          >
            <Image width={120} height={120} src={image} />
          </ImageButton>
          <Typography style={{ fontSize: '13px', marginLeft: '5px' }}>{name}</Typography>
        </Grid>
      ))}
    </Grid>
  </DropdownContainer>
)

LocationDropdown.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default LocationDropdown
