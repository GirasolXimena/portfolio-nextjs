import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <div data-dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</div>
}