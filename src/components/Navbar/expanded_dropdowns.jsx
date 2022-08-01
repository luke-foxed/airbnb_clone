import { useEffect, useState } from 'react'
import { ButtonBase, Grid, styled, Typography } from '@mui/material'
import Image from 'next/image'

const REGIONS = [
  { name: "I'm flexible", image: '/navbar/world.png' },
  { name: 'United States', image: '/navbar/usa.png' },
  { name: 'United Kingdom', image: '/navbar/uk.png' },
  { name: 'Middle East', image: '/navbar/middleeast.png' },
  { name: 'Spain', image: '/navbar/spain.png' },
  { name: 'Southeast Asia', image: '/navbar/southeastasia.png' },
]

const DropdownContainer = styled('div')(({ width, left }) => ({
  background: '#FFF',
  position: 'absolute',
  top: '155px',
  marginLeft: `-${left}`,
  height: '470px',
  borderRadius: '30px',
  boxShadow: '0px 0px 20px 3px rgba(0,0,0,0.2)',
  padding: '45px',
  width,
}))

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

export const DateDropdown = () => {
  return (
    <DropdownContainer width="850px" left="300px">
      Nice
    </DropdownContainer>
  )
}

export const LocationDropdown = ({ selected, onLocationSelect }) => {
  return (
    <DropdownContainer width="490px" left="20px">
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
}
