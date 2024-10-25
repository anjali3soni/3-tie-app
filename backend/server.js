const express = require('express');
const { trace } = require('@opentelemetry/api');
require('./tracing');  // Import the tracing setup

const app = express();
const PORT = process.env.PORT || 3000;

const tracer = trace.getTracer('my-app-tracer');

app.get('/', (req, res) => {
  const span = tracer.startSpan('get-root');
  res.send('Hello World');
  span.end();
});

app.get('/hello', (req, res) => {
  const span = tracer.startSpan('get-hello');
  res.send('Hello from the /hello endpoint!');
  span.end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
