type Category = {
    name: string;
    id: string;
    allocation: number;
    subcategories: string[];
};

type Subcategory = {
    name: string;
    id: string;
    allocation: number;
    securities: string[];
};

type Security = {
    allocation: number;
    description: string;
};

type PortfolioBreakdown = {
    categories: Record<string, Category>;
    subcategories: Record<string, Subcategory>;
    securities: Record<string, Security>;
}

export type { PortfolioBreakdown, Category, Subcategory, Security };