import DashBoardContainer from '@/components/DashBoardContainer';
import { getUserMeLoader } from '@/data/services/get-user-me-loader';

export default async function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const userData = await getUserMeLoader();

  return (
    <div style={{ display: 'flex' }}>
      <DashBoardContainer data={userData} />
      <main>{children}</main>
    </div>
  );
}
