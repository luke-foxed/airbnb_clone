import { useEffect } from 'react'

// https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661
const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    // react-datepicker is closing early so whitelisting its class name
    if (ref.current && !ref.current.contains(e.target) && !e.target.className.includes('react-datepicker')) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useOutsideClick
