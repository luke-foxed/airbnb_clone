import { useEffect, useState } from 'react'
import { ButtonBase, Grid, styled, Typography } from '@mui/material'
import Image from 'next/image'

const DropdownContainer = styled('div')(({ width, left }) => ({
  background: '#FFF',
  position: 'absolute',
  top: '155px',
  marginLeft: `-${left}`,
  height: '400px',
  borderRadius: '30px',
  boxShadow: '0px 0px 20px 3px rgba(0,0,0,0.2)',
  padding: '45px',
  width,
}))

const ImageButton = styled(ButtonBase)({
  borderRadius: '15px',
  border: '1px solid #e5e6e5',
  transition: 'all 0.4s ease',
  img: {
    borderRadius: '15px',
  },
  ':hover': {
    borderColor: '#000',
  },
})

export const DateDropdown = () => {
  return (
    <DropdownContainer width="850px" left="300px">
      Nice
    </DropdownContainer>
  )
}

export const LocationDropdown = ({ selected, handleSelect }) => {
  return (
    <DropdownContainer width="490px" left="20px">
      <Typography style={{ fontSize: '13px', fontWeight: 700 }}>Search by region</Typography>
      <Grid container justifyContent="space-between">
        <Grid item xs={4} textAlign="center">
          <ImageButton>
            <Image width={120} height={120} src="/navbar/world.png" />
          </ImageButton>
          <Typography style={{ fontSize: '13px' }}>I'm flexible</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <ImageButton onClick={() => handleSelect('United States')}>
            <Image width={120} height={120} src="/navbar/usa.png" />
          </ImageButton>
          <Typography style={{ fontSize: '13px' }}>United States</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <ImageButton>
            <Image width={120} height={120} src="/navbar/uk.png" />
          </ImageButton>
          <Typography style={{ fontSize: '13px' }}>United Kingdom</Typography>
        </Grid>

        <Grid item xs={4} textAlign="center">
          <ImageButton>
            <Image width={120} height={120} src="/navbar/middleeast.png" />
          </ImageButton>
          <Typography style={{ fontSize: '13px' }}>Middle East</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <ImageButton>
            <Image width={120} height={120} src="/navbar/spain.png" />
          </ImageButton>
          <Typography style={{ fontSize: '13px' }}>Spain</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <ImageButton>
            <Image width={120} height={120} src="/navbar/southeastasia.png" />
          </ImageButton>
          <Typography style={{ fontSize: '13px' }}>Southeast Asia</Typography>
        </Grid>
      </Grid>
    </DropdownContainer>
  )
}
