import PropTypes from 'prop-types'
import { Grid, styled, ToggleButtonGroup, ToggleButton, Typography, capitalize } from '@mui/material'
import Image from 'next/image'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { useState, useContext } from 'react'
import { DATE_LENGTH, MONTHS, NavbarContext } from '../constants'
import { DropdownContainer } from '../../../lib/hooks/styles'

const ACTIVE_DATE_STYLES = {
  zIndex: 2,
  backgroundColor: '#000 !important',
  borderRadius: '200px !important',
  color: '#fff !important',
}

const DateFormatToggleContainer = styled(ToggleButtonGroup)({
  marginBottom: '10px',
  backgroundColor: '#e5e6e5',
  height: '44px',
  display: 'flex',
  width: '308px',
  borderRadius: '200px',
  '& .Mui-selected': {
    backgroundColor: '#fff !important',
  },
})

const DateFormatToggleButton = styled(ToggleButton)({
  margin: 'auto',
  backgroundColor: 'transparent',
  color: '#000',
  height: '36px',
  border: 'none',
  borderRadius: '200px !important',
  width: '150px',
  justifyContent: 'center !important',
  ':hover': {
    backgroundColor: '#fff',
  },
})

const DateToggleContainer = styled(ToggleButtonGroup)({
  '& .Mui-selected': {
    backgroundColor: '#fff !important',
    fontWeight: 500,
    border: '2px solid #000 !important',
  },
})

const DateToggleButton = styled(ToggleButton, { shouldForwardProp: (props) => props !== 'border' })(
  ({ border = 200 }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center !important',
    alignItems: 'center',
    borderRadius: `${border}px !important`,
    margin: '10px',
    border: '1px solid rgba(0,0,0,0.15) !important',
    fontWeight: 500,
    ':hover': {
      backgroundColor: '#fff',
      border: '2px solid #000 !important',
    },
  }),
)

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

const DateDropdown = ({ dateRange, onDatesSelect, dateFormat, onDateFormatSelect }) => {
  const [dateDuration, setDateDuration] = useState(DATE_LENGTH[1])
  const [dateSelection, setDateSelection] = useState([])
  const { onChangeFilter } = useContext(NavbarContext)
  const [startDate, endDate] = dateRange

  const handleChangeDateFormat = (event, format) => {
    onDateFormatSelect(format)
    if (format === 'flexible') {
      onChangeFilter('date')
    } else {
      onChangeFilter('checkin')
    }
  }

  const handleChangeDateDuration = (event, duration) => {
    setDateDuration(duration)
  }

  const handleChangeDateSelection = (event, selection) => {
    setDateSelection(selection)
  }

  const renderHeader = ({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
    <div>
      <button
        type="button"
        aria-label="Previous Month"
        className="react-datepicker__navigation react-datepicker__navigation--previous"
        style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
        onClick={decreaseMonth}
      >
        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">{'<'}</span>
      </button>
      <span className="react-datepicker__current-month">
        {monthDate.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button
        type="button"
        aria-label="Next Month"
        className="react-datepicker__navigation react-datepicker__navigation--next"
        style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
        onClick={increaseMonth}
      >
        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">{'>'}</span>
      </button>
    </div>
  )

  const renderMonthCarousel = () => {
    const cards = []
    const date = new Date()
    let month = date.getMonth() - 1
    let year = date.getFullYear()

    for (let i = 0; i < 12; i += 1) {
      year = month + 1 > 11 ? 2023 : year
      month = month + 1 > 11 ? 0 : (month += 1)
      cards.push({ month: MONTHS[month], year, selected: dateSelection.includes(MONTHS[month]) })
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%', overflow: 'scroll' }}>
        <DateToggleContainer onChange={handleChangeDateSelection} value={dateSelection}>
          {cards.map(({ month: m, year: y, selected }) => (
            <DateToggleButton style={{ width: '136px', padding: '28px', height: '136px' }} border={15} value={m}>
              <Image width={32} height={32} src={`/navbar/calendar${selected ? '_selected' : ''}.jpeg`} />
              <Typography style={{ fontSize: '14px', fontWeight: 500, color: '#000', paddingTop: '8px' }}>
                {m}
              </Typography>
              <Typography style={{ fontSize: '12px', color: '#000' }}>{y}</Typography>
            </DateToggleButton>
          ))}
        </DateToggleContainer>
      </div>
    )
  }

  // prevent propogation so 'checkin' isn't refocused when this dropdown is clicked
  // while 'checkout' is active
  return (
    <DropdownContainer width="850px" left="300px" height="511px" onClick={(e) => e.stopPropagation()}>
      <DatePickerContainer>
        <DateFormatToggleContainer value={dateFormat} exclusive onChange={handleChangeDateFormat}>
          <DateFormatToggleButton value="calendar">Choose Dates</DateFormatToggleButton>
          <DateFormatToggleButton value="flexible">I&apos;m Flexible</DateFormatToggleButton>
        </DateFormatToggleContainer>

        {dateFormat === 'calendar' ? (
          <DatePicker
            selectsRange
            inline
            useWeekdaysShort
            monthsShown={2}
            peekNextMonth={false}
            startDate={startDate}
            endDate={endDate}
            onSelect={onDatesSelect}
            minDate={new Date()}
            renderCustomHeader={renderHeader}
          />
        ) : (
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ width: '100%', marginTop: '20px' }}
            gap="10px"
          >
            <Typography style={{ fontWeight: 600 }}>How long would you like to stay?</Typography>

            <DateToggleContainer value={dateDuration} onChange={handleChangeDateDuration} exclusive>
              {DATE_LENGTH.map((length) => (
                <DateToggleButton style={{ height: '35px' }} value={length}>
                  {capitalize(length)}
                </DateToggleButton>
              ))}
            </DateToggleContainer>

            <Typography style={{ marginTop: '20px', fontWeight: 600 }}>When do you want to go?</Typography>

            {renderMonthCarousel()}
          </Grid>
        )}
      </DatePickerContainer>
    </DropdownContainer>
  )
}

DateDropdown.propTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  dateFormat: PropTypes.string.isRequired,
  onDateFormatSelect: PropTypes.func.isRequired,
  onDatesSelect: PropTypes.func.isRequired,
}

export default DateDropdown
