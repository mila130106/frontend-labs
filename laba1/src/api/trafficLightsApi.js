const API_URL = "<YOUR_GAS_WEB_APP_EXEC_URL>";

async function parseEnvelope(response) {
  const payload = await response.json();

  if (!payload || !payload.ok) {
    throw new Error(payload?.error?.message || "GAS request failed");
  }

  return payload.data;
}

export async function listTrafficLights() {
  const response = await fetch(`${API_URL}?action=list`);
  const data = await parseEnvelope(response);

  return Array.isArray(data?.trafficLights) ? data.trafficLights : [];
}

export async function updateTrafficLightState(id, currentSignal) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "updateState",
      id,
      currentSignal,
    }),
  });

  const data = await parseEnvelope(response);
  return data.trafficLight;
}