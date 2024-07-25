import SalesList from '@/components/SalesList';
import { getSalesData } from '@/data/services/get-sales-data';
import { getUserMeLoader } from '@/data/services/get-user-me-loader';

export default async function Dashboard() {
  const salesData = await getSalesData();
  const userData = await getUserMeLoader();
  return <SalesList userData={userData} initialData={salesData} />;
}
