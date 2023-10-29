import HeadingPage from '../../components/heading-page';
import { LuBarChart2 } from 'react-icons/lu';

export default function ComparisonPage() {
  return (
    <div>
      <HeadingPage params={{ text: 'Comparison' }}>
        <LuBarChart2 />
      </HeadingPage>
    </div>
  )
}
