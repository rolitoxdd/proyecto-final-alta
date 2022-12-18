module.exports = {
  // Override the service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: "front",

  // Use if APM Server requires a secret token
  secretToken: "FYjWLv5XySJg1EEvzE",

  // Set the custom APM Server URL (default: http://localhost:8200)
  serverUrl:
    "https://820e9ae737464cf08d96c7ab3ba6f957.apm.us-central1.gcp.cloud.es.io:443",

  // Set the service environment
  environment: "production",
};
