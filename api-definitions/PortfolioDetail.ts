const RiskLevel = {
    69: 'Aggressive',
    68: 'Passive'
} as const;

type PortfolioDetail = { 
    riskLevel: keyof typeof RiskLevel, 
    type: string, 
    created: string 
};

export { RiskLevel };
export type { PortfolioDetail };