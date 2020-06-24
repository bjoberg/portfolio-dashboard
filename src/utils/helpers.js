import { SortMappings } from '../constants';

/**
 * Evaluate if a paginated network request is on the last page or not
 *
 * @param {number} total total number of elements in the query
 * @param {number} offset number of elements in each request. Also referred to as "page"
 * @param {number} nextPage page of next pagination request
 */
export const isAtEnd = (total, offset, nextPage) => (total / offset) <= nextPage;

/**
 * Navigate one page back in history
 * @param {string} prevRoute the expected previous route to naviate back to
 */
export const goBack = (prevRoute) => {
  try {
    const url = new URL(document.referrer);
    if (!url || url.pathname !== prevRoute) window.location.href = prevRoute;
    else window.history.back();
  } catch (error) {
    window.location.href = prevRoute;
  }
};

/**
 * Create a query string with the provided dictionary.
 *
 * @param {object} dictionary key value pair of query items
 * @returns {string} query string
 */
export const getQueryString = (dictionary) => {
  // TODO: Update with new query param constructor;

  if (!dictionary) return '';
  if (typeof dictionary !== 'object') return '';
  let queryString = '';
  Object.keys(dictionary).forEach((key, index) => {
    if (index === 0) queryString = `?${key}=${dictionary[key]}`;
    else queryString = `${queryString}&${key}=${dictionary[key]}`;
  });
  return queryString;
};

/**
 * Controller for managing a page's sort query param
 */
export class SortController {
  /**
   * Check to see if the proposed sort query is valid or not.
   *
   * @param {string} sortQuery query string being validate (Ex: capture_date:asc)
   * @param {[{query: string}]} sortOptions list of sort options to validate against
   * @returns {boolean} true if query exists in provided options; otherwise false
   */
  static isValidSortQuery(sortQuery, sortOptions) {
    let isValid = false;
    sortOptions.forEach((option) => {
      if (option.query === sortQuery) isValid = true;
    });
    return isValid;
  }

  /**
   * Get the sort query based on the request.
   *
   * @param {string} requestedSortQuery sort query requested
   * @param {string} defaultSortQuery default sort query to fallback on if something fails
   * @param {[{query: string}]} sortOptions list of sort options to validate against
   * @returns {string} sort query string
   */
  static getSortQuery(requestedSortQuery, defaultSortQuery, sortOptions) {
    let sortQuery = requestedSortQuery;
    if (!sortQuery || !SortController.isValidSortQuery(sortQuery, sortOptions)) sortQuery = defaultSortQuery;
    return sortQuery;
  }

  /**
   * Get sort object based on provided query.
   *
   * @param {string} sortQuery sort query to retrieve id for
   * @returns {string} sort object of the provided sort query; otherwise undefined
   */
  static getSortByQuery(sortQuery) {
    let sort;
    Object.keys(SortMappings).forEach((key) => {
      if (SortMappings[key].query === sortQuery) sort = SortMappings[key];
    });
    return sort;
  }
}
