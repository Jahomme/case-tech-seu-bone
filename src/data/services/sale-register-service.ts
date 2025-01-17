export async function registerSaleService(saleData: any) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = new URL('/api/sales', apiUrl);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...saleData }),
      cache: 'no-cache',
    });

    return await response.json();
  } catch (error) {
    console.error('Sales Registration Service Error:', error);
  }
}
