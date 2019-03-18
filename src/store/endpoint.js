/** 
 * For some reason (not sure why, yet), adding parameters when making the http request via Axios
 * doesn't work, but manually adding them to each endpoint link works.
*/
var endpoint = {}

endpoint.query = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=500&search='
endpoint.links = 'https://en.wikipedia.org/w/api.php?action=parse&prop=links|externallinks&format=json&origin=*&page='
endpoint.trends = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/'

export default endpoint