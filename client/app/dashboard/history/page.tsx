import HeadingPage from '../../components/heading-page';
import { LuHistory } from 'react-icons/lu';

export default function HistoryPage() {
  return (
    <div>
      <HeadingPage params={{ text: 'History' }}>
        <LuHistory />
      </HeadingPage>
    </div>
  )
}
