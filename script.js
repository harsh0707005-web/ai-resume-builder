async function generateResume() {
  let name = document.getElementById("name").value;
  let skills = document.getElementById("skills").value;
  let experience = document.getElementById("experience").value;

  document.getElementById("output").innerHTML = "⏳ Generating...";

  let response = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, skills, experience }),
  });

  let data = await response.text();

  document.getElementById("output").innerHTML = data;
}