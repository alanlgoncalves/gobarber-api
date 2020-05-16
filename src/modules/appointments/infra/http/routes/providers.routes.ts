import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '@modules/appointments/infra/http/controllers/ProviderController';

const providersRouter = Router();
const providerController = new ProviderController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.show);

export default providersRouter;
