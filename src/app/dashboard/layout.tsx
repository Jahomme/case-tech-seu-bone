import DashBoardContainer from '@/components/DashBoardContainer';
import { getUserMeLoader } from '@/data/services/get-user-me-loader';

export default async function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const userData = await getUserMeLoader();

  return (
    <div style={{ paddingLeft: '15vw' }}>
      <DashBoardContainer data={userData} />
      <main
        style={{
          padding: '1rem',
          marginTop: '60px',
        }}
      >
        {children}
      </main>
    </div>
  );
}
