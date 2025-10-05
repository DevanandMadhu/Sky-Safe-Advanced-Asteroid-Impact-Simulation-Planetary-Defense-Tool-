import { useState } from 'react';
import { FileText, Download, AlertTriangle, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DecisionSupportProps {
  simulationData: any;
  onNavigate: (view: string) => void;
}

export function DecisionSupport({ simulationData, onNavigate }: DecisionSupportProps) {
  const [reportGenerated, setReportGenerated] = useState(false);

  // Risk assessment data
  const riskData = simulationData ? [
    { category: 'Human Life', value: Math.min((simulationData.casualties.total / 1000000) * 100, 100) },
    { category: 'Infrastructure', value: 85 },
    { category: 'Economic', value: 90 },
    { category: 'Environmental', value: 75 },
    { category: 'Social', value: 70 },
    { category: 'Political', value: 65 },
  ] : [];

  // Response timeline
  const timelineData = [
    { phase: 'Detection', months: 12, status: 'complete' },
    { phase: 'Assessment', months: 3, status: 'complete' },
    { phase: 'Decision', months: 2, status: 'current' },
    { phase: 'Implementation', months: 18, status: 'pending' },
    { phase: 'Verification', months: 6, status: 'pending' },
  ];

  // Budget allocation
  const budgetData = [
    { name: 'Mission Development', value: 35, color: '#3b82f6' },
    { name: 'Launch Operations', value: 25, color: '#8b5cf6' },
    { name: 'Monitoring', value: 15, color: '#10b981' },
    { name: 'Emergency Prep', value: 15, color: '#f59e0b' },
    { name: 'Contingency', value: 10, color: '#ef4444' },
  ];

  // Comparison of response options
  const comparisonData = [
    { option: 'Kinetic Impactor', cost: 500, time: 24, success: 75, risk: 30 },
    { option: 'Nuclear Deflection', cost: 8000, time: 12, success: 85, risk: 60 },
    { option: 'Gravity Tractor', cost: 2500, time: 72, success: 70, risk: 20 },
    { option: 'Evacuation Only', cost: 35000, time: 6, success: 60, risk: 90 },
  ];

  const generateReport = () => {
    setReportGenerated(true);
    // In a real application, this would generate a PDF
  };

  const getRiskLevel = () => {
    if (!simulationData) return { level: 'Unknown', color: 'bg-slate-500', description: 'No simulation data available' };
    
    const casualties = simulationData.casualties.total;
    const energy = parseFloat(simulationData.energyMegatons);
    
    if (casualties > 1000000 || energy > 100000) {
      return {
        level: 'Catastrophic',
        color: 'bg-red-600',
        description: 'Existential threat requiring immediate global response',
        priority: 'P1 - Maximum Priority',
      };
    } else if (casualties > 100000 || energy > 1000) {
      return {
        level: 'Severe',
        color: 'bg-orange-600',
        description: 'Major threat requiring urgent international coordination',
        priority: 'P2 - High Priority',
      };
    } else if (casualties > 10000 || energy > 100) {
      return {
        level: 'Moderate',
        color: 'bg-amber-600',
        description: 'Significant threat requiring coordinated response',
        priority: 'P3 - Medium Priority',
      };
    } else {
      return {
        level: 'Low',
        color: 'bg-yellow-600',
        description: 'Minor threat, monitoring and preparation advised',
        priority: 'P4 - Standard Priority',
      };
    }
  };

  const risk = getRiskLevel();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <Button variant="outline" onClick={() => onNavigate('dashboard')} className="mb-2">
            ← Back to Dashboard
          </Button>
          <h1 className="text-xl md:text-3xl">Decision Support Dashboard</h1>
          <p className="text-slate-400 text-sm md:text-base">Comprehensive risk assessment and policy recommendations</p>
        </div>
        <Button 
          onClick={generateReport}
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Risk Level Banner */}
      <Card className={`${risk.color} border-0 p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-12 h-12" />
            <div>
              <h2>Risk Level: {risk.level}</h2>
              <p className="text-white/90">{risk.description}</p>
              <Badge className="mt-2 bg-white/20">{risk.priority}</Badge>
            </div>
          </div>
          {simulationData && (
            <div className="text-right">
              <p className="text-sm text-white/80">Estimated Impact</p>
              <p className="text-3xl">{simulationData.energyMegatons} MT</p>
            </div>
          )}
        </div>
      </Card>

      {simulationData ? (
        <>
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-red-400" />
                <h4>Casualties</h4>
              </div>
              <p className="text-3xl text-red-400">{simulationData.casualties.total.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mt-1">Estimated affected population</p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-amber-400" />
                <h4>Economic Impact</h4>
              </div>
              <p className="text-3xl text-amber-400">$500B+</p>
              <p className="text-sm text-slate-400 mt-1">Direct and indirect costs</p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <h4>Blast Radius</h4>
              </div>
              <p className="text-3xl text-blue-400">{simulationData.blastRadii.severe} km</p>
              <p className="text-sm text-slate-400 mt-1">Severe damage zone</p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-green-400" />
                <h4>Response Time</h4>
              </div>
              <p className="text-3xl text-green-400">12-24 mo</p>
              <p className="text-sm text-slate-400 mt-1">Available preparation window</p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Risk Assessment Radar */}
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="mb-4">Multi-Dimensional Risk Assessment</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={riskData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis dataKey="category" stroke="#94a3b8" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
                  <Radar name="Risk Level" dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Budget Allocation */}
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="mb-4">Recommended Budget Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Response Options Comparison */}
          <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
            <h3 className="mb-4">Response Options Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="option" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Bar dataKey="success" fill="#10b981" name="Success Rate (%)" />
                <Bar dataKey="time" fill="#3b82f6" name="Time Required (months)" />
                <Bar dataKey="risk" fill="#ef4444" name="Risk Level" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Policy Recommendations */}
          <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
            <h3 className="mb-4">Policy Recommendations</h3>
            <div className="space-y-4">
              <div className="bg-blue-900/30 border-l-4 border-blue-500 p-4">
                <h4 className="mb-2">Immediate Actions (0-3 months)</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Establish international coordination committee</li>
                  <li>• Initiate mission planning for kinetic impactor</li>
                  <li>• Begin evacuation planning for high-risk zones</li>
                  <li>• Allocate emergency funding ($500M initial)</li>
                </ul>
              </div>

              <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4">
                <h4 className="mb-2">Short-term Actions (3-12 months)</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Launch deflection mission</li>
                  <li>• Implement enhanced monitoring systems</li>
                  <li>• Coordinate with international space agencies</li>
                  <li>• Develop backup mitigation strategies</li>
                </ul>
              </div>

              <div className="bg-green-900/30 border-l-4 border-green-500 p-4">
                <h4 className="mb-2">Long-term Actions (12+ months)</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Verify trajectory modification success</li>
                  <li>• Maintain continuous monitoring</li>
                  <li>• Review and update planetary defense protocols</li>
                  <li>• Invest in next-generation detection systems</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
            <h3 className="mb-4">Response Timeline</h3>
            <div className="space-y-4">
              {timelineData.map((phase, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      phase.status === 'complete' ? 'bg-green-600' :
                      phase.status === 'current' ? 'bg-blue-600' :
                      'bg-slate-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4>{phase.phase}</h4>
                        <Badge className={
                          phase.status === 'complete' ? 'bg-green-600' :
                          phase.status === 'current' ? 'bg-blue-600' :
                          'bg-slate-700'
                        }>
                          {phase.status === 'complete' ? 'Complete' :
                           phase.status === 'current' ? 'In Progress' :
                           'Pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">Duration: {phase.months} months</p>
                    </div>
                  </div>
                  {index < timelineData.length - 1 && (
                    <div className="ml-6 h-8 w-0.5 bg-slate-700" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Report Generation */}
          {reportGenerated && (
            <Card className="bg-green-900/30 border-green-700 p-6">
              <div className="flex items-center gap-4">
                <FileText className="w-12 h-12 text-green-400" />
                <div className="flex-1">
                  <h3 className="text-green-400 mb-1">Report Generated Successfully</h3>
                  <p className="text-slate-300">
                    Comprehensive impact assessment and policy recommendations have been compiled.
                    In a production environment, this would generate a detailed PDF report for distribution to decision-makers.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card className="bg-slate-900 border-slate-800 p-12 text-center">
          <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h3 className="mb-2">No Simulation Data Available</h3>
          <p className="text-slate-400 mb-6">
            Please run an impact simulation first to generate decision support data.
          </p>
          <Button onClick={() => onNavigate('dashboard')} className="bg-blue-600 hover:bg-blue-700">
            Go to Dashboard
          </Button>
        </Card>
      )}
    </div>
  );
}