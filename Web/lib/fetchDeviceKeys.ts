// lib/fetchDeviceKeys.ts

// export async function fetchDeviceKeys(): Promise<number[]> {
//   const res = await fetch(
//     "https://app.coreiot.io/api/plugins/telemetry/DEVICE/7bf1c9b0-f27a-11ef-87b5-21bccf7d29d5/keys/timeseries",
//     {
//       headers: {
//         accept: "application/json",
//         "X-Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
//       },
//     }
//   );

//   if (!res.ok) throw new Error("API error");

//   const data: string[] = await res.json();
//   return data
//     .filter((key) => key.startsWith("Data_"))
//     .map((key) => parseInt(key.replace("Data_", "")));
// }
