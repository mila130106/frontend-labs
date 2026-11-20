const SHEET_NAME = "TRAFFIC_LIGHTS";
const PROPERTY_SPREADSHEET_ID = "DB_SPREADSHEET_ID";
const ALLOWED_SIGNALS = ["red", "yellow", "green"];

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonOk_(data) {
  return json_({
    ok: true,
    data,
    error: null,
  });
}

function jsonError_(code, message) {
  return json_({
    ok: false,
    data: null,
    error: { code, message },
  });
}

function getTrafficLightsSheet_() {
  const spreadsheetId = PropertiesService
    .getScriptProperties()
    .getProperty(PROPERTY_SPREADSHEET_ID);

  if (!spreadsheetId) {
    throw new Error("Missing DB_SPREADSHEET_ID script property");
  }

  const sheet = SpreadsheetApp
    .openById(spreadsheetId)
    .getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" was not found`);
  }

  return sheet;
}

function listTrafficLights_() {
  const sheet = getTrafficLightsSheet_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, 2).getValues();

  return rows
    .map((row) => ({
      id: String(row[0] || "").trim(),
      currentSignal: String(row[1] || "").trim(),
    }))
    .filter((item) => item.id !== "");
}

function updateTrafficLightState_(id, currentSignal) {
  if (!id || typeof id !== "string") {
    return {
      ok: false,
      code: "invalid_id",
      message: "Traffic light id is required",
    };
  }

  if (!ALLOWED_SIGNALS.includes(currentSignal)) {
    return {
      ok: false,
      code: "invalid_signal",
      message: "Unsupported traffic-light signal",
    };
  }

  const sheet = getTrafficLightsSheet_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return {
      ok: false,
      code: "not_found",
      message: `Traffic light "${id}" not found`,
    };
  }

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (let index = 0; index < ids.length; index++) {
    const rowId = String(ids[index][0] || "").trim();
    if (rowId === id.trim()) {
      const targetRow = index + 2;
      sheet.getRange(targetRow, 2).setValue(currentSignal);
      SpreadsheetApp.flush();

      return {
        ok: true,
        record: {
          id: rowId,
          currentSignal,
        },
      };
    }
  }

  return {
    ok: false,
    code: "not_found",
    message: `Traffic light "${id}" not found`,
  };
}

function doGet(e) {
  try {
    const action = e?.parameter?.action;

    if (action !== "list") {
      return jsonError_("unknown_action", "Unsupported action");
    }

    return jsonOk_({
      trafficLights: listTrafficLights_(),
    });
  } catch (error) {
    return jsonError_("storage_error", error.message);
  }
}

function doPost(e) {
  try {
    const rawBody = e?.postData?.contents;
    if (!rawBody) {
      return jsonError_("bad_request", "Request body is required");
    }

    const command = JSON.parse(rawBody);

    if (command.action !== "updateState") {
      return jsonError_("unknown_action", "Unsupported action");
    }

    const result = updateTrafficLightState_(command.id, command.currentSignal);
    if (!result.ok) {
      return jsonError_(result.code, result.message);
    }

    return jsonOk_({
      trafficLight: result.record,
    });
  } catch (error) {
    return jsonError_("bad_request", error.message);
  }
}