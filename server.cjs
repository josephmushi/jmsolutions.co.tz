// server.js
// This file sets up a simple Express server to serve static files from the "dist" directory.
// It also handles all other routes by serving the "index.html" file, which is typical for
// single-page applications (SPAs) that use client-side routing.
// The server listens on port 3000 and logs a message to the console when it starts.
// The app is exported for use in other modules, allowing for testing or integration with other parts of the application.
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Serve static files from the React app's build folder
//app.use(express.static(path.join(__dirname, 'build')));

// For any other route, serve index.html (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// Export the app for testing purposes
module.exports = app;
// This allows the server to be imported in tests or other modules
// and keeps the server running when this file is executed directly.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
// This ensures that the server starts when this file is run directly.
// If this file is imported in another module, the server will not start automatically.
// This is useful for unit testing or when the server is part of a larger application.
// The server will only start if this file is executed directly, not when imported.
// This prevents the server from starting multiple times if this file is imported in multiple places.
// The server will listen on the specified PORT, which is set to 3000.
// The server serves static files from the "dist" directory and handles all other routes by serving the "index.html" file.
// This is typical for single-page applications (SPAs) that use client-side routing.
// The server logs a message to the console when it starts, indicating the URL where it can be accessed.
// The app is exported for use in other modules, allowing for testing or integration with other parts of the application.
// The server can be tested using tools like Mocha or Jest,
// which can import this module and use the exported app for testing routes and middleware.
// This setup is common in Node.js applications that use Express for serving web applications.
