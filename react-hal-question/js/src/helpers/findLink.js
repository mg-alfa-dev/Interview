/**
 * @param {import('http-client').HALLink[]} links
 * @param {string} rel
 */
export const findLink = (links, rel) => links.find(l => l.rel === rel);
