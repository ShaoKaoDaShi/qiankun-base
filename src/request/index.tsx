import axios from "axios";
axios.get("/api/users");
axios.post("/api/users");

fetch("api/users", { method: "get" }).then((res) => {
  console.log("🚀 ~ file: index.js:4 ~ fetch ~ first:", res);
});

fetch("api/users", { method: "post", body: JSON.stringify({text:'ok'}) }).then((res) => {
  console.log("🚀 ~ file: index.js:4 ~ fetch ~ first:", res);
});
