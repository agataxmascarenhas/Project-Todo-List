import type {Plugin} from '@hapi/hapi'
import routes from './routes'


/**
 * `hello@1.0.0`
 * Recommended route prefix 'api/todolist'
 */
export default Object.freeze<Plugin<void>>({
  name: 'todolist',
  version: '1.0.0',
//register: (server: Server, options: T) => void | Promise<void>;
  register: server => server.route(routes), //faz referencia ao ficheiro routes.ts
 
})
