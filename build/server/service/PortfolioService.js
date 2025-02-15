import "core-js/modules/esnext.async-iterator.map.js";
import "core-js/modules/esnext.iterator.map.js";
class PortfolioService {
  async getModelDetails(portfolioId) {
    //NOTE: query data from database via orm and return data but for now i am hardcoding the data.
    return {
      'riskLevel': 69,
      'type': 'Tax-Advantaged',
      'created': '2023-9-13'
    };
  }
  async getHistoricalPerformance(portfolioId, timeSpan) {
    //NOTE: query data from database via orm and return data but for now i am hardcoding the data.
    return {
      'twr': 15.75 * timeSpan
    };
  }
  async getPortfolioBreakdown(portfolioId) {
    //NOTE: get data from partner service and transform the data to server it to the UI but now I am mocking the data.
    const partnerResponse = {
      'Other': {
        'category': 'CASH',
        'securities': {
          'CASH': {
            'description': 'US Dollars',
            'allocation': 400
          }
        }
      },
      'US Small Cap Equity': {
        'category': 'Equity',
        'securities': {
          'IJR': {
            'description': 'iShares Core S&P Small-Cap ETF',
            'allocation': 400
          },
          'IYW': {
            'description': 'iShares U.S. Technology ETF',
            'allocation': 267
          }
        }
      },
      'US Mid Cap Equity': {
        'category': 'Equity',
        'securities': {
          'SPMD': {
            'description': 'SPDR® Portfolio S&P 400 Mid Cap ETF',
            'allocation': 510
          }
        }
      },
      'US Bonds': {
        'category': 'Fixed Income',
        'securities': {
          'AGG': {
            'description': 'iShares Core U.S. Aggregate Bond ETF',
            'allocation': 350
          },
          'BND': {
            'description': 'Vanguard Total Bond Market ETF',
            'allocation': 300
          }
        }
      },
      'International Equity': {
        'category': 'Equity',
        'securities': {
          'VEU': {
            'description': 'Vanguard FTSE All-World ex-US ETF',
            'allocation': 450
          },
          'IXUS': {
            'description': 'iShares Core MSCI Total International Stock ETF',
            'allocation': 320
          }
        }
      },
      'Real Estate': {
        'category': 'Alternative Investments',
        'securities': {
          'VNQ': {
            'description': 'Vanguard Real Estate ETF',
            'allocation': 200
          },
          'SCHH': {
            'description': 'Schwab U.S. REIT ETF',
            'allocation': 180
          }
        }
      },
      'Emerging Markets Equity': {
        'category': 'Equity',
        'securities': {
          'VWO': {
            'description': 'Vanguard FTSE Emerging Markets ETF',
            'allocation': 300
          },
          'EEM': {
            'description': 'iShares MSCI Emerging Markets ETF',
            'allocation': 250
          }
        }
      },
      'Corporate Bonds': {
        'category': 'Fixed Income',
        'securities': {
          'LQD': {
            'description': 'iShares iBoxx $ Investment Grade Corporate Bond ETF',
            'allocation': 220
          },
          'VCIT': {
            'description': 'Vanguard Intermediate-Term Corporate Bond ETF',
            'allocation': 190
          }
        }
      }
    };
    return Object.keys(partnerResponse).map(categoryName => ({
      categoryName: categoryName ?? '',
      category: {
        //@ts-ignore
        category: partnerResponse[categoryName].category,
        //@ts-ignore
        securities: Object.keys(partnerResponse[categoryName].securities).map(securityKey => ({
          //@ts-ignore
          description: partnerResponse[categoryName].securities[securityKey].description,
          //@ts-ignore
          allocation: partnerResponse[categoryName].securities[securityKey].allocation
        }))
      }
    }));
  }
}
export default PortfolioService;