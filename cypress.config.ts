import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation:false,
    baseUrl: "http://localhost:4200",
    video: false,
    env: {
      apiUrl: "http://localhost:3000/api/"
    }
    ,
    viewportWidth: 1920,   // Ancho del viewport
    viewportHeight: 1080,   // Altura del viewport
  },
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});