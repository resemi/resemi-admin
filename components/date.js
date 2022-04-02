/**
 *
 * @author anguer
 * @date Create by 2022-04-02
 */
import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'yyyy-MM-dd')}</time>
}
