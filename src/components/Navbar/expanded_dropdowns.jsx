import { useEffect, useState } from 'react'
import { ButtonBase, Grid, styled, Typography } from '@mui/material'
import Image from 'next/image'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

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
  cursor: 'default',
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

const ACTIVE_DATE_STYLES = {
  zIndex: 2,
  backgroundColor: '#000 !important',
  borderRadius: '200px !important',
  color: '#fff !important',
}

const DatePickerContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& .react-datepicker': {
    border: 'none',
    '&__navigation': {
      padding: 'revert',
    },
    '&__header--custom': {
      backgroundColor: 'transparent',
    },
    '&__header': {
      border: 'none',
    },
    '&__day-names': {
      marginTop: '10px',
    },
    '&__day-name': {
      color: '#777',
      width: '47px',
    },
    '&__week': {
      display: 'flex',
    },
    '&__day--today': {
      backgroundColor: 'transparent',
      color: '#000',
    },
    '&__day': {
      width: '47px',
      height: '47px',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '200px',
      ':hover': {
        backgroundColor: 'transparent',
        border: '1px solid #000',
        borderRadius: '200px',
        color: '#000',
      },
      '&--selected': {
        ...ACTIVE_DATE_STYLES,
      },
    },
    '&__day--in-range, &__day--in-selecting-range': {
      borderRadius: '0 !important',
      color: '#000',
      zIndex: 1,
      '&::before': {
        backgroundColor: '#f6f6f6',
        content: '""',
        position: 'absolute',
        height: 'inherit',
        width: 'inherit',
        transform: 'scaleX(1.8)',
        zIndex: -1,
      },
    },
    '&__day--selecting-range-start': {
      ...ACTIVE_DATE_STYLES,
      '&::before': {
        content: 'none',
      },
    },
    '&__day--range-start, &__day--range-end': {
      ...ACTIVE_DATE_STYLES,
      ':hover': {
        backgroundColor: '#000',
        color: '#fff',
      },
      '&::before': {
        content: 'none',
      },
    },
    '&__day--range-start': {
      zIndex: 2,
    },
    '&__day--keyboard-selected': {
      ...ACTIVE_DATE_STYLES,
    },
    '&__day--outside-month': {
      pointerEvents: 'none',
      cursor: 'default !important',
      color: 'transparent !important',
      backgroundColor: '#fff !important',
      '&::before': {
        content: 'none',
      },
    },
  },
})

export const DateDropdown = ({ selected, dateRange, onDatesSelect }) => {
  const [startDate, endDate] = dateRange

  console.log(dateRange)

  return (
    <DropdownContainer width="850px" left="300px">
      <DatePickerContainer>
        <div>SOME BUTTONS HERE</div>
        <DatePicker
          selectsRange
          inline
          useWeekdaysShort
          monthsShown={2}
          peekNextMonth={false}
          startDate={startDate}
          endDate={endDate}
          onChange={onDatesSelect}
          minDate={new Date()}
          renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
            <div>
              <button
                aria-label="Previous Month"
                className={'react-datepicker__navigation react-datepicker__navigation--previous'}
                style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
                onClick={decreaseMonth}
              >
                <span className={'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'}>
                  {'<'}
                </span>
              </button>
              <span className="react-datepicker__current-month">
                {monthDate.toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                aria-label="Next Month"
                className={'react-datepicker__navigation react-datepicker__navigation--next'}
                style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
                onClick={increaseMonth}
              >
                <span className={'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'}>
                  {'>'}
                </span>
              </button>
            </div>
          )}
        />
      </DatePickerContainer>
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
