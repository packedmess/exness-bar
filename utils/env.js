import isInBrowser from 'is-in-browser';

export const isServer = !isInBrowser;
export const isClient = isInBrowser;
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
