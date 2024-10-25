const { NodeSDK } = require('@opentelemetry/sdk-node');
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');

const sdk = new NodeSDK({
  traceExporter: new CollectorTraceExporter({
    url: 'http://18.216.231.120:3100/api/traces', // URL to send traces to Tempo
  }),
  autoDetectResources: true,
});

sdk.start().then(() => {
  console.log('Tracing initialized');
}).catch((error) => {
  console.error('Error initializing tracing', error);
});

