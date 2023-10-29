import HeadingPage from '../components/heading-page';
import { LuHome } from 'react-icons/lu';

export default function Home() {
  return (
    <div>
      <HeadingPage params={{ text: 'Home Dashboard' }}>
        <LuHome />
      </HeadingPage>
    </div>
  )
}
