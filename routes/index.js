
const actividadesRouter = require('./actividad.router')
const productosRouter = require('./productos.router')
const categoriasRouter = require('./categorias.router')
const pedidosRouter = require('./pedidos.router')
const usersRouter = require('./users.router')
const ventasRouter = require('./ventas.router')
const authRouter = require('./auth.router')
const rolesRouter = require('./roles.router')
const mesasRouter = require('./mesas.router')

function routerApi (app){
  app.use('/auth',authRouter)
  app.use('/actividades',actividadesRouter)
  app.use('/productos',productosRouter)
  app.use('/categorias',categoriasRouter)
  app.use('/pedidos',pedidosRouter)
  app.use('/users',usersRouter)
  app.use('/roles',rolesRouter)
  app.use('/ventas',ventasRouter)
  app.use('/mesas',mesasRouter)
}

module.exports = routerApi;
