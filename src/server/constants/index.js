export const METRIC_KEY_WEIGHT = 'weight';
export const METRIC_KEY_HEIGHT = 'height';
export const METRIC_TYPES = [METRIC_KEY_HEIGHT, METRIC_KEY_WEIGHT];

/**
 * Convert camelCase to underscore_case
 * @param str
 * @returns {*}
 */
export const camelToUnderscore = str =>
    str
        .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
        .replace(/([A-Z])/g, ([letter]) => `_${letter.toLowerCase()}`);
