const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2Gs-UBT8s9uzTbjMa88mC42291YyekiwJwyA0SWxyz7ZJyAVT_3PVAWZph7k3VbnR/exec";

exports.handler = async function(event) {
  const params = event.queryStringParameters || {};
  const qs = new URLSearchParams(params).toString();
  
  try {
    const response = await fetch(APPS_SCRIPT_URL + "?" + qs, {
      redirect: "follow",
      headers: { "Content-Type": "application/json" }
    });
    const text = await response.text();
    
    // JSON boshlanishini topish
    const i = text.indexOf("{");
    const json = i > 0 ? text.substring(i) : text;
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: json
    };
  } catch(e) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ ok: false, msg: "Server xatosi: " + e.message })
    };
  }
};
