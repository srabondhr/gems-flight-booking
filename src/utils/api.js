const BASE_URL = "https://gemstask.yp.ieeer10.org/api";

export async function getAirports() {
  const res = await fetch(`${BASE_URL}/locations`);
  if (!res.ok) throw new Error("Failed to fetch airports");
  return await res.json();
}

export async function searchFlights(data) {
  const res = await fetch(`${BASE_URL}/flights/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Flight search failed");
  return await res.json();
}
