export async function getFreightValue(packageData: any) {
  const authToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzQ4Nzc1ZGI3ODMzZGUzM2JmOWUzMTNlM2Y1ZTZkZmRhZGEwODQwMDhkMTA0NzIyMTA5N2ZiYWFhNzY4Y2JjNjBhZDIxOTRkMDQyNzMwZGUiLCJpYXQiOjE3MjE4NjQzMzQuNTg2Nzc2LCJuYmYiOjE3MjE4NjQzMzQuNTg2Nzc3LCJleHAiOjE3NTM0MDAzMzQuNTc1NTM1LCJzdWIiOiJjYWQzN2RhZi1kZWUyLTQ3NjUtOWU3Mi05NjQ4NzFiZDgyZmQiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.uqQu2LEGoJWo_0kRp4iB1OaDVFOlRUsU86SyTE5BKz8qfJOIf92AyTZS2sG50T5niZ8RIeWAVoIsQ0T_-sQSG0sImDZX-jNTH-oaVbpl_t3QvGhFYviJ4lJMCbxW94rMM8qo6xV99hRo0JnTG4AgAqqKgoUy9tzsRD0CXRD8FW_3-V3jrSGqZaqa-fWaFWncVsJe6hfmzHXSTAqTjRSXBHGVUsdyyiwS0xTg388WiMBNbfyMsiqIdpChRHZJSkapTmv9oukPD2ME1QY8kXhKbDiz39cs_7NTDNrLhbvea0S8IuiejNFJ8QaPgMq0S5jgn0nT4q2_8FdtAo6I5SnVhGLFzaBQGvLZwqlyEu9wIfaBZ7uAPP3oc5CxQjz7XtnC8wxb4JaR8yxHlg5FzhxiG3V3ixkU1SDnHjP1pXMP8O__ficuxr7MCkO_NXCJ1Y0NVCITRrMywwJ03KwaqTxblaBOxH-5TeEztllhLOy1m1AwPNiCcGnOsP706jZbCvUVUSNpuCSK6o4Plkg7Sv6vpVPFLlWi1VPNdps_AGBhE_ZsJ-aIJYGw05gl6MQyV1Rd_-mGAs9veAVgmfM0tcZ1wjqjEkOH-ffOb8KfUWnsBnPRtyOKiLO1tlQJVzMuWGJtcUJddrvXz1b2nHt6o2k932pRx0v71hW1UcJe8sK4XqU';
  const url = new URL(
    'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
  );
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

  try {
    const response = await fetch(`${corsProxyUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'Aplicação jadilsonigor@gmail.com',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...packageData }),
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching freight value: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Freight Service Error:', error.message);
    } else {
      console.error('Freight Service Error:', error);
    }
  }
}
