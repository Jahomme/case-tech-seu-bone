import { getAuthToken } from './get-token';

export async function getSalesData(params?: string) {
  //   const url = new URL(
  //     // `/api/sales?populate=*${params ?? ''}`,
  //     // // process.env.API_URL,
  //   );

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/sales?populate=*${params ?? ''}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    return await response.json();
  } catch (error) {
    console.error('Login Service Error:', error);
    throw error;
  }
}
