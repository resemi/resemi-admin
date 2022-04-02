/**
 *
 * @author anguer
 * @date Create by 2022-04-02
 */
import dayjs from 'dayjs';

export default function Date({ dateString }) {
  const date = dayjs(dateString).format('YYYY-MM-DD')
  return <time dateTime={dateString}>{date}</time>
}
