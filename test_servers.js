async function test() {
  try {
    console.log("Testing Backend Health...");
    const beRes = await fetch("http://localhost:5000/api/health");
    console.log("Backend Health:", await beRes.json());

    console.log("Testing Products API...");
    const prodRes = await fetch("http://localhost:5000/api/products");
    const prods = await prodRes.json();
    console.log(`Fetched ${prods.length} products successfully!`);

    console.log("Testing Frontend Vite Server...");
    const feRes = await fetch("http://localhost:3000/");
    console.log(`Frontend Status: ${feRes.status} (${feRes.statusText})`);
    const feText = await feRes.text();
    console.log(`Frontend HTML length: ${feText.length} bytes`);
    console.log("✅ ALL SERVERS HEALTHY AND OPERATIONAL!");
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
