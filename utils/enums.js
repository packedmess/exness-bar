/**
 * @typedef HttpMethod
 * @type {{DELETE: string, POST: string, GET: string, PUT: string, PATCH: string}}
 */
export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

/**
 * User roles
 * @type {{BUYER: string, BARMAN: string}}
 */
export const Role = {
  BUYER: 'buyer',
  BARMAN: 'barman',
};

/**
 * @type {{NEW: number, IN_PROGRESS: number, COMPLETED: number, DECLINED: number}}
 */
export const OrderStatus = {
  NEW: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  DECLINED: 4,
};

export const OrderItemStatus = {
  NEW: 1,
  DECLINED: 4,
};
