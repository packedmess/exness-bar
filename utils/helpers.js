/**
 * Creates proper HOC name
 * @param childComponent {React.Component|React.PureComponent}
 * @param name {string} - HOC name
 * @returns {string}
 */
export const createHocName = (childComponent, name) => {
  const childName = childComponent.displayName || childComponent.name || 'Component';
  return `${name}(${childName})`;
};

/**
 * Checks if given object has no properties
 * @param obj {Object}
 * @return {boolean}
 */
export const isObjectEmpty = obj => {
  if (typeof obj === 'object' && obj !== null) {
    return Object.getOwnPropertyNames(obj).length === 0;
  }
  return true;
};
