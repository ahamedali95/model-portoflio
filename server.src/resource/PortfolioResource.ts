import { Request, Response, Router } from 'express';

import { PortfolioService } from '../service';

class PortfolioResource {
    private portfolioService: PortfolioService;

    constructor(portfolioService: PortfolioService) {
        this.portfolioService = portfolioService;
        this.getProfileInfo = this.getProfileInfo.bind(this);
        this.getHistoricalPerformance = this.getHistoricalPerformance.bind(this);
        this.getPortfolioBreakdown = this.getPortfolioBreakdown.bind(this);
    }

    async getProfileInfo(request: Request, response: Response) {
        try {
            const result = await this.portfolioService.getModelDetails('');
            // response.status(200)
            //     .json({ data: result });
            return result;
        } catch (error: any) {
            response.status(500)
                .json();
        }
    }

    async getHistoricalPerformance(request: Request<{ timeSpan: string }>, response: Response) {
        try {
            const result = await this.portfolioService.getHistoricalPerformance('', Number(request.body?.variables?.timeSpan));
            // response.status(200)
            //     .json(result);
            return result;
        } catch (error: any) {
            response.status(500)
                .json();
        }
    }

    async getPortfolioBreakdown(request: Request<{ portfolioId: string }>, response: Response) {
        try {
            const result = await this.portfolioService.getPortfolioBreakdown(request.params.portfolioId);
            // response.status(200)
            //     .json(result);
            console.log((result));

            return result;
        } catch (error: any) {
            response.status(500)
                .json();
        }
    }
}

const portfolioResource = new PortfolioResource(new PortfolioService());
const portfolioRouter = Router();

//graphql resolvers
const portfolioResourceResolvers = {
    Query: {
        portfolio: async (_: any, __: any, context: any) => {
            return await portfolioResource.getProfileInfo(context.req, context.res);
        },
        historicalPerformance: async (_: any, __: any, context: any) => {
            return await portfolioResource.getHistoricalPerformance(context.req, context.res);
        },
        marketBreakdown: async (_: any, __: any, context: any) => {
            return await portfolioResource.getPortfolioBreakdown(context.req, context.res);
        }
    }
};

//rest api endpoints
// portfolioRouter.get('/:portfolioId/breakdown', portfolioResource.getPortfolioBreakdown);
// portfolioRouter.get('/:portfolioId/performance/:timeSpan', portfolioResource.getHistoricalPerformance);
// portfolioRouter.get('/:portfolioId', portfolioResource.getProfileInfo);

export default portfolioResourceResolvers;