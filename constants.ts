import { FormData, Sector, Stage, BusinessModel, PricingStrategy, Step } from './types';

export const INITIAL_FORM_DATA: FormData = {
    startupName: '',
    sector: Sector.SaaS,
    stage: Stage.PreSeed,
    foundingDate: '',
    problem: '',
    solution: '',
    uvp: '',
    competitors: '',
    tam: 1000000000,
    sam: 100000000,
    businessModel: BusinessModel.B2BSaaS,
    pricingStrategy: PricingStrategy.Subscription,
    mrr: null,
    customerCount: 0,
    growthRate: 0,
    cac: null,
    ltv: null,
    founderCount: 1,
    fullTimeEmployees: 1,
    hasPriorFunding: false,
    fundingAsk: 500000,
    email: '',
};

export const STEPS = [
    { id: Step.BasicInfo, title: 'Temel Bilgiler' },
    { id: Step.ProblemSolution, title: 'Problem ve Çözüm' },
    { id: Step.MarketBusinessModel, title: 'Pazar ve İş Modeli' },
    { id: Step.TractionMetrics, title: 'Traction ve Metrikler' },
    { id: Step.TeamAndFunding, title: 'Takım ve Yatırım' },
];

export const SECTORS = Object.values(Sector);
export const STAGES = Object.values(Stage);
export const BUSINESS_MODELS = Object.values(BusinessModel);
export const PRICING_STRATEGIES = Object.values(PricingStrategy);

export const SCORING_WEIGHTS = {
    problemSolutionFit: 20,
    marketOpportunity: 20,
    businessModel: 15,
    traction: 20,
    team: 15,
    fundability: 10,
};