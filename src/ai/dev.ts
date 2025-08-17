import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-recipe-tags.ts';
import '@/ai/flows/generate-recipe-description.ts';
import '@/ai/flows/generate-blog-post-introduction.ts';