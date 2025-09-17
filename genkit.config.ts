
import {googleAI} from '@genkit-ai/googleai';
import {genkit} from 'genkit';

export default genkit({
  plugins: [
    googleAI(),
  ],
  enableTracingAndMetrics: true,
});
