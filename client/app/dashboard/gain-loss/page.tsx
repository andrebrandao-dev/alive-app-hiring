import HeadingPage from '../../components/heading-page';
import { LuWalletCards } from 'react-icons/lu';

export default function GainLossPage() {
  return (
    <div>
      <HeadingPage params={{ text: 'Gain/Loss' }}>
        <LuWalletCards />
      </HeadingPage>
    </div>
  )
}
