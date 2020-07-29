import { Router } from 'express';

import agendamentosRouter from './agendamentos.routes';
import usuariosRoutes from './usuarios.routes';
import sessaoRoutes from './sessao.routes';

const routes = Router();

routes.use('/agendamentos',agendamentosRouter);
routes.use('/usuarios', usuariosRoutes);
routes.use('/sessao', sessaoRoutes);

export default routes;