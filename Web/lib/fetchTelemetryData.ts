// src/utils/fetchTelemetry.ts

// export async function fetchTelemetryData(ts: number) {
//   const url = `https://app.coreiot.io/api/plugins/telemetry/DEVICE/7bf1c9b0-f27a-11ef-87b5-21bccf7d29d5/values/timeseries?keys=Data_${ts}&useStrictDataTypes=false`;

//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       "X-Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
//     },
//   });

//   if (!res.ok) throw new Error("Failed to fetch telemetry data");

//   const data = await res.json();
//   return data;
// }
