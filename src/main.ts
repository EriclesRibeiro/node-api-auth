import 'dotenv/config'
import Server from './server'

const PORT = process.env.PORT || 8000

new Server(PORT as number)
