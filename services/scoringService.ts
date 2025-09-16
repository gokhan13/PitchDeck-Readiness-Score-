import { FormData, AnalysisResult, ScoreDetail } from '../types';
import { SCORING_WEIGHTS } from '../constants';

function getScore(points: number, maxPoints: number, weight: number): number {
    return (points / maxPoints) * weight;
}

function calculateProblemSolutionScore(data: FormData): { score: number, details: ScoreDetail[] } {
    const details: ScoreDetail[] = [];
    let points = 0;
    const maxPoints = 20;

    const problemPoints = data.problem.length > 50 ? 5 : (data.problem.length > 20 ? 3 : 1);
    points += problemPoints;
    details.push({ score: problemPoints, maxScore: 5, title: "Problem Tanımı", rationale: `Problem netliği: ${problemPoints}/5` });

    const solutionPoints = data.solution.length > 50 ? 5 : (data.solution.length > 20 ? 3 : 1);
    points += solutionPoints;
    details.push({ score: solutionPoints, maxScore: 5, title: "Çözümün Etkinliği", rationale: `Çözümün netliği: ${solutionPoints}/5` });

    const uvpPoints = data.uvp.length > 10 ? 5 : 2;
    points += uvpPoints;
    details.push({ score: uvpPoints, maxScore: 5, title: "Benzersiz Değer Teklifi", rationale: `UVP netliği: ${uvpPoints}/5` });

    const competitorPoints = data.competitors.split(',').length >= 1 && data.competitors.trim() !== '' ? 5 : 2;
    points += competitorPoints;
    details.push({ score: competitorPoints, maxScore: 5, title: "Rekabet Farklılaşması", rationale: `Rakip farkındalığı: ${competitorPoints}/5` });

    return { score: getScore(points, maxPoints, SCORING_WEIGHTS.problemSolutionFit), details };
}

function calculateMarketOpportunityScore(data: FormData): { score: number, details: ScoreDetail[] } {
    const details: ScoreDetail[] = [];
    let points = 0;
    const maxPoints = 20;

    const tamPoints = data.tam >= 1000000000 ? 5 : (data.tam >= 500000000 ? 3 : 1);
    points += tamPoints;
    details.push({ score: tamPoints, maxScore: 5, title: "TAM Büyüklüğü", rationale: `TAM yeterince büyük: ${tamPoints}/5` });

    const samRatio = data.sam / data.tam;
    const samPoints = samRatio > 0 && samRatio <= 0.1 ? 5 : (samRatio <= 0.3 ? 3 : 1);
    points += samPoints;
    details.push({ score: samPoints, maxScore: 5, title: "TAM/SAM Oranı", rationale: `SAM gerçekçi: ${samPoints}/5` });

    // Dummy scores for market timing and growth potential
    points += 4;
    details.push({ score: 4, maxScore: 5, title: "Pazar Zamanlaması", rationale: "İyi zamanlama varsayıldı: 4/5" });
    points += 4;
    details.push({ score: 4, maxScore: 5, title: "Büyüme Potansiyeli", rationale: "Yüksek büyüme potansiyeli varsayıldı: 4/5" });

    return { score: getScore(points, maxPoints, SCORING_WEIGHTS.marketOpportunity), details };
}


function calculateBusinessModelScore(data: FormData): { score: number, details: ScoreDetail[] } {
    const details: ScoreDetail[] = [];
    let points = 0;
    const maxPoints = 15;

    points += 4; // Scalability
    details.push({ score: 4, maxScore: 5, title: "Ölçeklenebilirlik", rationale: "Modelin ölçeklenebilir olduğu varsayıldı: 4/5" });

    const ltv = data.ltv ?? 0;
    const cac = data.cac ?? 1;
    const ltvCacRatio = ltv / (cac > 0 ? cac : 1);
    const unitEconomicsPoints = ltv > 0 && cac > 0 ? (ltvCacRatio >= 3 ? 5 : (ltvCacRatio >= 1 ? 3 : 1)) : 2;
    points += unitEconomicsPoints;
    details.push({ score: unitEconomicsPoints, maxScore: 5, title: "Birim Ekonomisi (LTV:CAC)", rationale: `LTV:CAC oranı sağlıklı: ${unitEconomicsPoints}/5` });

    points += 4; // Revenue model clarity
    details.push({ score: 4, maxScore: 5, title: "Gelir Modeli Netliği", rationale: "Gelir modeli net: 4/5" });

    return { score: getScore(points, maxPoints, SCORING_WEIGHTS.businessModel), details };
}


function calculateTractionScore(data: FormData): { score: number, details: ScoreDetail[] } {
    const details: ScoreDetail[] = [];
    let points = 0;
    const maxPoints = 20;

    const growthPoints = data.growthRate >= 20 ? 5 : (data.growthRate >= 10 ? 4 : (data.growthRate > 0 ? 2 : 0));
    points += growthPoints;
    details.push({ score: growthPoints, maxScore: 5, title: "Gelir Büyüme Oranı", rationale: `Aylık büyüme >%20: ${growthPoints}/5` });

    const customerPoints = data.customerCount >= 100 ? 5 : (data.customerCount >= 10 ? 3 : (data.customerCount > 0 ? 1 : 0));
    points += customerPoints;
    details.push({ score: customerPoints, maxScore: 5, title: "Müşteri Büyümesi", rationale: `Önemli müşteri tabanı: ${customerPoints}/5` });

    points += 3; // PMF signals
    details.push({ score: 3, maxScore: 5, title: "Ürün-Pazar Uyumu Sinyalleri", rationale: "Bazı PMF sinyalleri varsayıldı: 3/5" });
    points += 3; // Momentum
    details.push({ score: 3, maxScore: 5, title: "Momentum", rationale: "Bir miktar momentum varsayıldı: 3/5" });

    return { score: getScore(points, maxPoints, SCORING_WEIGHTS.traction), details };
}

function calculateTeamScore(data: FormData): { score: number, details: ScoreDetail[] } {
    const details: ScoreDetail[] = [];
    let points = 0;
    const maxPoints = 15;

    points += 4; // Founder-market fit
    details.push({ score: 4, maxScore: 5, title: "Kurucu-Pazar Uyumu", rationale: "Güçlü kurucu-pazar uyumu varsayıldı: 4/5" });
    
    const completenessPoints = data.founderCount > 1 && data.fullTimeEmployees > 1 ? 5 : 2;
    points += completenessPoints;
    details.push({ score: completenessPoints, maxScore: 5, title: "Takım Bütünlüğü", rationale: `Teknoloji ve iş kollarını kapsıyor: ${completenessPoints}/5` });

    points += 3; // Previous experience
    details.push({ score: 3, maxScore: 5, title: "Önceki Deneyim", rationale: "İlgili deneyim varsayıldı: 3/5" });

    return { score: getScore(points, maxPoints, SCORING_WEIGHTS.team), details };
}

function calculateFundabilityScore(data: FormData): { score: number, details: ScoreDetail[] } {
    const details: ScoreDetail[] = [];
    let points = 0;
    const maxPoints = 10;
    
    points += 4; // Stage-appropriate metrics
    details.push({ score: 4, maxScore: 5, title: "Aşamaya Uygun Metrikler", rationale: "Metrikler aşama ile uyumlu: 4/5" });
    points += 4; // Reasonable valuation expectations
    details.push({ score: 4, maxScore: 5, title: "Makul Değerleme", rationale: "Yatırım talebi makul: 4/5" });

    return { score: getScore(points, maxPoints, SCORING_WEIGHTS.fundability), details };
}

function getLevel(score: number): { level: string, levelDescription: string } {
    if (score > 80) return { level: "Olağanüstü", levelDescription: "Yatırım Almaya Hazır" };
    if (score > 60) return { level: "Yatırıma Hazır", levelDescription: "Küçük İyileştirmeler Gerekli" };
    if (score > 40) return { level: "Gelişmekte", levelDescription: "Önemli Eksikler Var" };
    return { level: "Hazır Değil", levelDescription: "Büyük Değişiklikler Gerekiyor" };
}

export const calculateScore = (data: FormData): AnalysisResult => {
    const psf = calculateProblemSolutionScore(data).score;
    const mo = calculateMarketOpportunityScore(data).score;
    const bm = calculateBusinessModelScore(data).score;
    const t = calculateTractionScore(data).score;
    const team = calculateTeamScore(data).score;
    const f = calculateFundabilityScore(data).score;

    const overallScore = Math.round(psf + mo + bm + t + team + f);
    const { level, levelDescription } = getLevel(overallScore);
    
    const strengths = [
        { title: "Güçlü Kurucu-Pazar Uyumu", description: "Ekibiniz bu özel problemi çözmek için ideal görünüyor." },
        { title: "Sağlıklı Birim Ekonomisi", description: `${((data.ltv ?? 0) / (data.cac ?? 1)).toFixed(1)} LTV:CAC oranı, sürdürülebilir bir iş modelinin harika bir göstergesi.` },
        { title: "Etkileyici Büyüme", description: `Aylık %${data.growthRate} büyüme oranı güçlü bir pazar momentumu gösteriyor.` },
    ].slice(0,3);

    const improvements = [
        { 
            title: "Problem Tanımını Netleştirin", 
            why: "Yatırımcılar, çözdüğünüz problemin acısını ilk 30 saniyede hissetmeli. Belirsiz bir problem tanımı, aciliyet hissi yaratamaz.",
            how: ["İlişkilendirilebilir bir hikaye veya güçlü bir istatistikle başlayın.", "Problemi kimin yaşadığını ve neden 'saçı tutuşmuş' bir sorun olduğunu açıkça belirtin.", "Jargondan kaçının ve spesifik olun."]
        },
        { 
            title: "TAM Hesabını Doğrulayın",
            why: "Yukarıdan aşağıya bir TAM (Toplam Adreslenebilir Pazar) gerçekçi görünmeyebilir. Aşağıdan yukarıya bir yaklaşım, ödevinizi yaptığınızı ve pazarınızı gerçekten anladığınızı gösterir.",
            how: ["Potansiyel müşteri sayısını hesaplayın.", "Müşteri başına ortalama geliri tahmin edin.", "Aşağıdan yukarıya TAM'ınızı bulmak için bu iki değeri çarpın."]
        },
        { 
            title: "'Neden Şimdi?' Argümanını Güçlendirin", 
            why: "Yatırımcılar trendleri desteklemek ister. Çözümünüzün neden kaçınılmaz olduğunu ve başarılı olması için neden en doğru zamanın bu an olduğunu göstermeniz gerekir.",
            how: ["Yakın zamandaki teknolojik değişimlere (örneğin, yapay zeka gelişmeleri) işaret edin.", "Tüketici davranışlarındaki veya regülasyonlardaki değişiklikleri vurgulayın.", "Rakiplerin bu sorunu neden şimdi ele alamayacağını veya almayacağını açıklayın."]
        }
    ].slice(0,3);

    return {
        overallScore,
        level,
        levelDescription,
        categoryScores: {
            problemSolutionFit: Math.round(psf),
            marketOpportunity: Math.round(mo),
            businessModel: Math.round(bm),
            traction: Math.round(t),
            team: Math.round(team),
            fundability: Math.round(f),
        },
        strengths,
        improvements,
        benchmark: {
            averageScore: 65,
            percentile: 70, // static for now
        },
    };
};