type Security = {
    description: string;
    allocation: number;
  };
  
    type CategoryData = {
    categoryName: string;
    category: {
        category: string;
        securities: Security[];
    };
    };
  
export type PartnerResponse = CategoryData[];