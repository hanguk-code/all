const middleware = {}

middleware['addUrlSlash'] = require('../frontend/middleware/addUrlSlash.js')
middleware['addUrlSlash'] = middleware['addUrlSlash'].default || middleware['addUrlSlash']

middleware['auth'] = require('../frontend/middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['check-auth'] = require('../frontend/middleware/check-auth.js')
middleware['check-auth'] = middleware['check-auth'].default || middleware['check-auth']

middleware['guest'] = require('../frontend/middleware/guest.js')
middleware['guest'] = middleware['guest'].default || middleware['guest']

middleware['locale'] = require('../frontend/middleware/locale.js')
middleware['locale'] = middleware['locale'].default || middleware['locale']

export default middleware
