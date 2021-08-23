import RoofBarApi from '@/services/RoofBarApi';

/**
 * RoofBarApi instance
 * @type {RoofBarApi}
 */
export const roofBarApi = new RoofBarApi(process.env.NEXT_PUBLIC_API_BASE_URL, {
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
