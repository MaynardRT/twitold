/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
const app = particlesJS.load(
  "particles-js",
  "./assets/particles.json",
  function () {
    console.log("callback - particles.js config loaded");
  }
);
