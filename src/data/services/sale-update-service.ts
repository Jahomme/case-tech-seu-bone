export async function updateSaleService(saleData: any, id: number) {
  const apiUrl = process.env.API_URL || 'http://localhost:1337';
  const url = new URL(`/api/sales/${id}`, apiUrl);

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...saleData }),
      cache: 'no-cache',
    });

    return await response.json();
  } catch (error) {
    console.error('Sales Update Service Error:', error);
  }
}
