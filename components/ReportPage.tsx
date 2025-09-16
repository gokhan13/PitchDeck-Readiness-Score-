import React from 'react';
// import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { AnalysisResult } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';

interface ReportPageProps {
  result: AnalysisResult;
  onRestart: () => void;
  error?: string | null;
}

const scoreColor = (score: number) => {
    if (score > 80) return 'text-green-400';
    if (score > 60) return 'text-yellow-400';
    if (score > 40) return 'text-orange-400';
    return 'text-red-500';
};

const ReportPage: React.FC<ReportPageProps> = ({ result, onRestart, error }) => {
    // const chartData = [
    //     { subject: 'Problem/Çözüm', A: result.categoryScores.problemSolutionFit, fullMark: 20 },
    //     { subject: 'Pazar', A: result.categoryScores.marketOpportunity, fullMark: 20 },
    //     { subject: 'İş Modeli', A: result.categoryScores.businessModel, fullMark: 15 },
    //     { subject: 'Traction', A: result.categoryScores.traction, fullMark: 20 },
    //     { subject: 'Takım', A: result.categoryScores.team, fullMark: 15 },
    //     { subject: 'Yatırım Alınabilirlik', A: result.categoryScores.fundability, fullMark: 10 },
    // ];

  return (
    <div className="space-y-8 animate-fade-in">
        {error && (
            <Card className="bg-red-900 border border-brand-red">
                <h3 className="text-xl font-bold text-white">Bir Sorun Oluştu</h3>
                <p className="text-red-200 mt-2">{error}</p>
            </Card>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 flex flex-col items-center justify-center text-center">
                <p className="text-brand-light-gray">Genel Skor</p>
                <p className={`text-7xl font-bold my-2 ${scoreColor(result.overallScore)}`}>{result.overallScore}<span className="text-4xl text-brand-light-gray">/100</span></p>
                <p className={`font-bold text-xl ${scoreColor(result.overallScore)}`}>{result.level}</p>
                <p className="text-brand-light-gray">{result.levelDescription}</p>
            </Card>
            <Card className="md:col-span-2 flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold mb-4 text-white">Kategori Dağılımı</h3>
                <div className="w-full h-[250px] flex items-center justify-center text-brand-light-gray bg-brand-dark/50 rounded-md">
                  <p>Grafik geçici olarak devre dışı bırakıldı.</p>
                </div>
                {/* <ResponsiveContainer width="100%" height={250}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid stroke="#808080" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 20]} tick={{ fill: 'transparent' }} />
                        <Radar name="Sizin Skorunuz" dataKey="A" stroke="#E50914" fill="#E50914" fillOpacity={0.6} />
                        <Tooltip contentStyle={{ backgroundColor: '#141414', border: '1px solid #333' }} />
                    </RadarChart>
                </ResponsiveContainer> */}
            </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <h3 className="text-xl font-bold mb-4 text-white">✅ En Güçlü 3 Yönünüz (Yapay Zeka Analizi)</h3>
                <ul className="space-y-4">
                    {result.strengths.map((item, index) => (
                        <li key={index}>
                            <p className="font-bold text-green-400">{item.title}</p>
                            <p className="text-brand-light-gray">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </Card>
            <Card>
                <h3 className="text-xl font-bold mb-4 text-white">⚠️ Geliştirilmesi Gereken 3 Alan (Yapay Zeka Analizi)</h3>
                <ul className="space-y-4">
                    {result.improvements.map((item, index) => (
                         <li key={index}>
                            <p className="font-bold text-yellow-400">{item.title}</p>
                            <p className="text-brand-light-gray">{item.why}</p>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>

        <Card>
            <h3 className="text-xl font-bold mb-4 text-white">🚀 Eyleme Geçirilebilir Sonraki Adımlar (Yapay Zeka Önerileri)</h3>
             <ol className="list-decimal list-inside space-y-3">
                 {result.improvements.map((item, index) => (
                     <li key={index}><span className="font-bold">{item.title}:</span>
                        <ul className="list-disc list-inside ml-4 text-brand-light-gray">
                            {item.how.map((step, stepIndex) => <li key={stepIndex}>{step}</li>)}
                        </ul>
                     </li>
                 ))}
             </ol>
        </Card>

        <div className="text-center pt-4">
            <Button onClick={onRestart} variant="secondary">
                Yeni Analiz Başlat
            </Button>
        </div>
    </div>
  );
};

export default ReportPage;