
const productosRouter = require('./productos.router')
const pedidosRouter = require('./pedidos.router')
const usersRouter = require('./users.router')
const ventasRouter = require('./ventas.router')
const authRouter = require('./auth.router')
const rolesRouter = require('./roles.router')

function routerApi (app){
  app.use('/auth',authRouter)
  app.use('/productos',productosRouter)
  app.use('/pedidos',pedidosRouter)
  app.use('/users',usersRouter)
  app.use('/roles',rolesRouter)
  app.use('/ventas',ventasRouter)
}

module.exports = routerApi;
