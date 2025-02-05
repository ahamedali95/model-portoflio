import { Router } from 'express';

import portfolioRouter from './PortfolioResource';

const rootRouter = Router();
rootRouter.use('/api/portfolio', portfolioRouter);

export default rootRouter;