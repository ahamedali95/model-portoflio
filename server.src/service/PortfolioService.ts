import { v4 as uuid } from 'uuid';

import type { HistoricalPerformance, PortfolioBreakdown, PortfolioDetail } from '../../api-definitions';

type PartnerResponse = {
    [key: string]: {
        category: string;
        securities: {
            [key: string]: {
                description: string;
                allocation: number;
            };
        };
    };
};

class PortfolioService {
    async getModelDetails(portfolioId: string): Promise<PortfolioDetail> {
        //NOTE: query data from database via orm and return data but for now i am hardcoding the data.
        return {
            'riskLevel': 69,
            'type': 'Tax-Advantaged',
            'created': '2023-9-13'
        };
    }

    async getHistoricalPerformance(portfolioId: string, timeSpan: number): Promise<HistoricalPerformance> {
        //NOTE: query data from database via orm and return data but for now i am hardcoding the data.
        return { 'twr': 15.75 * timeSpan };
    }

    async getPortfolioBreakdown(portfolioId: string): Promise<PortfolioBreakdown> {
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
        

        return this.mapPartnerResponseToDto(partnerResponse);
    }

    private mapPartnerResponseToDto(data: PartnerResponse): PortfolioBreakdown {
        const apiResponse: PortfolioBreakdown = {
            categories: {},
            subcategories: {},
            securities: {}
        };

        for (const key in data) {
            const value = data[key];

            if (!apiResponse.subcategories[key]) {
                const securities = data[key].securities;

                apiResponse.subcategories[key] = {
                    name: key,
                    id: uuid(),
                    allocation: Object.values(securities)
                        .reduce((accumulator, value) => {
                            accumulator += value.allocation;

                            return accumulator;
                        }, 0),
                    securities: Object.keys(securities)
                };
                apiResponse.securities = {
                    ...apiResponse.securities,
                    ...securities
                };
            }

            if (apiResponse.categories[value.category]) {
                const allocation = apiResponse.subcategories[key].allocation;
                apiResponse.categories[value.category].allocation += allocation;
                apiResponse.categories[value.category].subcategories.push(key);
            } else {
                const allocation = apiResponse.subcategories[key].allocation;
                apiResponse.categories[value.category] = {
                    name: value.category,
                    id: uuid(),
                    allocation: allocation,
                    subcategories: [key]
                };
            }
        }

        return apiResponse;
    }
}

export default PortfolioService;