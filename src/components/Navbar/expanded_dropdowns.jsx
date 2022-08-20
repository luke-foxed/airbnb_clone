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
  zIndex: 10,
  backgroundColor: '#000',
  borderRadius: '200px !important',
  color: '#fff',
}

const DatePickerContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& .react-datepicker': {
    border: 'none',

    '& .react-datepicker__day-name': {
      width: '47px',
    },

    '& .react-datepicker__day--outside-month': {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.4,
    },

    '& .react-datepicker__week': {
      display: 'flex',
    },

    '& .react-datepicker__day--today': {
      backgroundColor: 'transparent',
      color: '#000',
    },

    '& .react-datepicker__day': {
      width: '47px',
      height: '47px',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '200px',
      ':hover': {
        backgroundColor: 'transparent',
        border: '1px solid #000',
        color: '#000',
      },
      '&--selected': {
        ':hover': {
          backgroundColor: '#000 !important',
        },
        ...ACTIVE_DATE_STYLES,
      },
    },

    '& .react-datepicker__day--in-range, .react-datepicker__day--in-selecting-range': {
      borderRadius: '0 !important',
      color: '#000',
      zIndex: 9,
      '&::before': {
        backgroundColor: '#f6f6f6',
        content: '""',
        position: 'absolute',
        height: 'inherit',
        width: 'inherit',
        transform: 'scaleX(1.5)',
        zIndex: -1,
      },
    },

    '& .react-datepicker__day--selecting-range-start': {
      ...ACTIVE_DATE_STYLES,
      '&::before': {
        content: 'none',
      },
    },

    '& .react-datepicker__day--range-start, .react-datepicker__day--range-end': {
      ...ACTIVE_DATE_STYLES,
      ':hover': {
        backgroundColor: '#000',
        color: '#fff',
      },
      '&::before': {
        content: 'none',
      },
    },
    '& .react-datepicker__day--range-start': {
      zIndex: 10,
    },

    '& .react-datepicker__day--keyboard-selected': {
      ...ACTIVE_DATE_STYLES,
    },
  },

  //   .react-datepicker {
  //   font-size: 1em;
  // }
  // .react-datepicker__header {
  //   padding-top: 0.8em;
  // }
  // .react-datepicker__month {
  //   margin: 0.4em 1em;
  // }
  // .react-datepicker__day-name, .react-datepicker__day {
  //   width: 1.9em;
  //   line-height: 1.9em;
  //   margin: 0.166em;
  // }
  // .react-datepicker__current-month {
  //   font-size: 1em;
  // }
  // .react-datepicker__navigation {
  //   top: 1em;
  //   line-height: 1.7em;
  //   border: 0.45em solid transparent;
  // }
  // .react-datepicker__navigation--previous {
  //   border-right-color: #ccc;
  //   left: 1em;
  // }
  // .react-datepicker__navigation--next {
  //   border-left-color: #ccc;
  //   right: 1em;
  // }
})

export const DateDropdown = ({ selected, onDatesSelect }) => {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  return (
    <DropdownContainer width="850px" left="300px">
      <DatePickerContainer>
        <div>SOME BUTTONS HERE</div>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update)
          }}
          minDate={new Date()}
          inline
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
          monthsShown={2}
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
