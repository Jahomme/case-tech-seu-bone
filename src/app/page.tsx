import { getUserMeLoader } from '@/data/services/get-user-me-loader';
import HomePageContainer from '../components/HomePageContainer';
import HomePageLoggedContainer from '../components/HomePageLoggedContainer';

export default async function Home() {
  const userData = await getUserMeLoader();

  return (
    <>{userData.ok ? <HomePageLoggedContainer /> : <HomePageContainer />}</>
  );
}
