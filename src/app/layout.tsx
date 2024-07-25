import Header from '@/components/Header';
import StyledComponentsRegistry from './lib/registry';
import { Providers } from './providers';
import { getUserMeLoader } from '@/data/services/get-user-me-loader';
import Toast from '@/components/Toast';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserMeLoader();

  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <Toast />
          <Header data={userData} />
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
