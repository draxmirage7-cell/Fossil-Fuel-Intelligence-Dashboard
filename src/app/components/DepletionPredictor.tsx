import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingDown, AlertTriangle } from "lucide-react";

export function DepletionPredictor() {
  const [consumptionRate, setConsumptionRate] = useState(100);
  const [yearsAhead, setYearsAhead] = useState(50);

  const currentReserves = 1000;
  const depletionYear = Math.floor(currentReserves / consumptionRate);

  const chartData = [];
  for (let year = 0; year <= Math.min(yearsAhead, depletionYear + 10); year += 5) {
    const remaining = Math.max(0, currentReserves - (consumptionRate * year));
    chartData.push({
      year: new Date().getFullYear() + year,
      reserves: parseFloat(remaining.toFixed(1)),
      percentage: parseFloat(((remaining / currentReserves) * 100).toFixed(1))
    });
  }

  const currentRemaining = Math.max(0, currentReserves - (consumptionRate * yearsAhead));
  const percentageRemaining = (currentRemaining / currentReserves) * 100;

  const aiPrediction = {
    optimistic: depletionYear + 15,
    realistic: depletionYear,
    pessimistic: Math.max(1, depletionYear - 10)
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Annual Consumption Rate (billion barrels/year)
          </label>
          <input
            type="number"
            value={consumptionRate}
            onChange={(e) => setConsumptionRate(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Prediction Years Ahead
          </label>
          <input
            type="number"
            value={yearsAhead}
            onChange={(e) => setYearsAhead(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors"
            min="1"
            max="100"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-red-900/50 to-red-950/50 p-4 rounded-lg border border-red-700/30">
          <div className="flex items-center gap-2 text-red-400 text-sm mb-1">
            <AlertTriangle className="w-4 h-4" />
            Estimated Depletion Year
          </div>
          <div className="text-3xl font-bold text-white">
            {new Date().getFullYear() + depletionYear}
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-900/50 to-amber-950/50 p-4 rounded-lg border border-amber-700/30">
          <div className="text-amber-400 text-sm mb-1">Years Until Depletion</div>
          <div className="text-3xl font-bold text-white">
            {depletionYear} <span className="text-sm text-slate-400">years</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-red-400" />
          Reserve Depletion Forecast
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Line type="monotone" dataKey="reserves" stroke="#ef4444" strokeWidth={3} name="Reserves (billion barrels)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Remaining in {yearsAhead} years</span>
          <span className="text-white font-semibold">{percentageRemaining.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-500 flex items-center justify-end px-3"
            style={{ width: `${Math.max(0, Math.min(100, percentageRemaining))}%` }}
          >
            <span className="text-xs font-bold text-white drop-shadow-lg">
              {percentageRemaining.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 p-6 rounded-lg border border-purple-700/30">
        <h4 className="text-purple-300 font-semibold mb-4 flex items-center gap-2">
          <span className="text-lg">🤖</span>
          AI-Based Prediction (Simulated)
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-emerald-400 text-sm mb-1">Optimistic</div>
            <div className="text-2xl font-bold text-white">
              {new Date().getFullYear() + aiPrediction.optimistic}
            </div>
            <div className="text-xs text-slate-400 mt-1">with efficiency gains</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 text-sm mb-1">Realistic</div>
            <div className="text-2xl font-bold text-white">
              {new Date().getFullYear() + aiPrediction.realistic}
            </div>
            <div className="text-xs text-slate-400 mt-1">current trajectory</div>
          </div>
          <div className="text-center">
            <div className="text-red-400 text-sm mb-1">Pessimistic</div>
            <div className="text-2xl font-bold text-white">
              {new Date().getFullYear() + aiPrediction.pessimistic}
            </div>
            <div className="text-xs text-slate-400 mt-1">increased demand</div>
          </div>
        </div>
      </div>
    </div>
  );
}
