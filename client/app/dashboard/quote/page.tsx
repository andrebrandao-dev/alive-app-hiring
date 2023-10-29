import HeadingPage from '../../components/heading-page';
import { LuBadgeDollarSign } from 'react-icons/lu';

export default function QuotePage() {
  return (
    <div>
      <HeadingPage params={{ text: 'Quote' }}>
        <LuBadgeDollarSign />
      </HeadingPage>
    </div>
  )
}
