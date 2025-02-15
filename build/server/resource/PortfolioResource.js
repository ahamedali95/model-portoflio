import { Router } from 'express';
import { PortfolioService } from '../service';
class PortfolioResource {
  constructor(portfolioService) {
    this.portfolioService = portfolioService;
    this.getProfileInfo = this.getProfileInfo.bind(this);
    this.getHistoricalPerformance = this.getHistoricalPerformance.bind(this);
    this.getPortfolioBreakdown = this.getPortfolioBreakdown.bind(this);
  }
  async getProfileInfo(request, response) {
    try {
      const result = await this.portfolioService.getModelDetails('');
      // response.status(200)
      //     .json({ data: result });
      return result;
    } catch (error) {
      response.status(500).json();
    }
  }
  async getHistoricalPerformance(request, response) {
    try {
      const result = await this.portfolioService.getHistoricalPerformance('', Number(request.body?.variables?.timeSpan));
      // response.status(200)
      //     .json(result);
      return result;
    } catch (error) {
      response.status(500).json();
    }
  }
  async getPortfolioBreakdown(request, response) {
    try {
      const result = await this.portfolioService.getPortfolioBreakdown(request.params.portfolioId);
      // response.status(200)
      //     .json(result);
      console.log(result);
      return result;
    } catch (error) {
      response.status(500).json();
    }
  }
}
const portfolioResource = new PortfolioResource(new PortfolioService());
const portfolioRouter = Router();

//graphql resolvers
const portfolioResourceResolvers = {
  Query: {
    portfolio: async (_, __, context) => {
      return await portfolioResource.getProfileInfo(context.req, context.res);
    },
    historicalPerformance: async (_, __, context) => {
      return await portfolioResource.getHistoricalPerformance(context.req, context.res);
    },
    marketBreakdown: async (_, __, context) => {
      return await portfolioResource.getPortfolioBreakdown(context.req, context.res);
    }
  }
};

//rest api endpoints
// portfolioRouter.get('/:portfolioId/breakdown', portfolioResource.getPortfolioBreakdown);
// portfolioRouter.get('/:portfolioId/performance/:timeSpan', portfolioResource.getHistoricalPerformance);
// portfolioRouter.get('/:portfolioId', portfolioResource.getProfileInfo);

export default portfolioResourceResolvers;