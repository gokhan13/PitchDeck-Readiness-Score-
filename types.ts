export enum Step {
    Landing,
    BasicInfo,
    ProblemSolution,
    MarketBusinessModel,
    TractionMetrics,
    TeamAndFunding,
    Report,
}

export enum Sector {
    Fintech = 'Fintech',
    Healthtech = 'Sağlık Teknolojileri',
    SaaS = 'SaaS (Hizmet olarak Yazılım)',
    Ecommerce = 'E-ticaret / Pazar Yeri',
    DeepTech = 'Derin Teknoloji / Yapay Zeka',
    Consumer = 'Tüketici Teknolojileri',
    Other = 'Diğer'
}

export enum Stage {
    PreSeed = 'Ön-Tohum',
    Seed = 'Tohum',
    SeriesA = 'Seri A',
    SeriesBPlus = 'Seri B+',
    Bootstrapped = 'Bootstrapped (Öz Sermaye)'
}

export enum BusinessModel {
    B2BSaaS = 'B2B SaaS',
    B2CSubscription = 'B2C Abonelik',
    Marketplace = 'Pazar Yeri',
    Ecommerce = 'E-ticaret',
    API = 'API Bazlı',
    Other = 'Diğer'
}

export enum PricingStrategy {
    Freemium = 'Freemium',
    Subscription = 'Abonelik Bazlı',
    Transactional = 'İşlem Bazlı',
    UsageBased = 'Kullanım Bazlı',
    OneTime = 'Tek Seferlik Satış',
    Other = 'Diğer'
}

export interface FormData {
    startupName: string;
    sector: Sector;
    stage: Stage;
    foundingDate: string;
    problem: string;
    solution: string;
    uvp: string;
    competitors: string;
    tam: number;
    sam: number;
    businessModel: BusinessModel;
    pricingStrategy: PricingStrategy;
    mrr: number | null;
    customerCount: number;
    growthRate: number;
    cac: number | null;
    ltv: number | null;
    founderCount: number;
    fullTimeEmployees: number;
    hasPriorFunding: boolean;
    fundingAsk: number;
    email: string;
}

export interface ScoreDetail {
    score: number;
    maxScore: number;
    title: string;
    rationale: string;
}

export interface CategoryScores {
    problemSolutionFit: ScoreDetail[];
    marketOpportunity: ScoreDetail[];
    businessModel: ScoreDetail[];
    traction: ScoreDetail[];
    team: ScoreDetail[];
    fundability: ScoreDetail[];
}

export interface AnalysisResult {
    overallScore: number;
    level: string;
    levelDescription: string;
    categoryScores: {
        problemSolutionFit: number;
        marketOpportunity: number;
        businessModel: number;
        traction: number;
        team: number;
        fundability: number;
    };
    strengths: { title: string; description: string }[];
    improvements: { title: string; why: string; how: string[]; resource?: { text: string; url: string } }[];
    benchmark: {
        averageScore: number;
        percentile: number;
    };
}