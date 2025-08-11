
import {googleAI} from '@genkit-ai/googleai';
import {genkit} from 'genkit';

export default genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
