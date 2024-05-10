import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const pageURL = 'https://lappilappland.github.io/shop-paska/';