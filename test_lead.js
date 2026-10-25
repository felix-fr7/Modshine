async function testInquiry() {
  const newLead = {
    name: "Murugan Selvam",
    phone: "+91 94441 55667",
    email: "murugan@example.com",
    city: "Kovilpatti",
    service: "Modular Kitchen",
    budget: "₹2,50,000 - ₹3,50,000",
    message: "Need quote for L-shaped kitchen in Kovilpatti Pasuvandhanai Road area."
  };

  const res = await fetch("http://localhost:5000/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLead)
  });
  console.log("Inquiry submit response:", await res.json());

  const overviewRes = await fetch("http://localhost:5000/api/overview");
  console.log("Admin Overview Stats:", await overviewRes.json());
}

testInquiry();
