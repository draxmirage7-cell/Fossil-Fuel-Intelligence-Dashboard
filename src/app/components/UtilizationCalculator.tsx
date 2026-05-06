import { useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calculator } from "lucide-react";

export function UtilizationCalculator() {
  const [fuelType, setFuelType] = useState("oil");
  const [dailyUsage, setDailyUsage] = useState(50);

  const fuelData = {
    oil: { energy: 10.7, co2: 2.3, unit: "litres" },
    coal: { energy: 24.0, co2: 2.8, unit: "kg" },
    gas: { energy: 38.3, co2: 2.0, unit: "m³" }
  };

  const current = fuelData[fuelType as keyof typeof fuelData];
  const totalEnergy = (dailyUsage * current.energy).toFixed(1);
  const totalCO2 = (dailyUsage * current.co2).toFixed(1);
  const yearlyEnergy = (parseFloat(totalEnergy) * 365).toFixed(0);
  const yearlyCO2 = (parseFloat(totalCO2) * 365).toFixed(0);

  const barData = [
    { name: "Daily", Energy: parseFloat(totalEnergy), CO2: parseFloat(totalCO2) },
    { name: "Monthly", Energy: parseFloat(totalEnergy) * 30, CO2: parseFloat(totalCO2) * 30 },
    { name: "Yearly", Energy: parseFloat(yearlyEnergy), CO2: parseFloat(yearlyCO2) }
  ];

  const pieData = [
    { name: "Oil", value: fuelType === "oil" ? dailyUsage : 0, color: "#f59e0b" },
    { name: "Coal", value: fuelType === "coal" ? dailyUsage : 0, color: "#64748b" },
    { name: "Gas", value: fuelType === "gas" ? dailyUsage : 0, color: "#3b82f6" }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Fuel Type</label>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors"
          >
            <option value="oil">Oil (Petroleum)</option>
            <option value="coal">Coal</option>
            <option value="gas">Natural Gas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Daily Usage ({current.unit})
          </label>
          <input
            type="number"
            value={dailyUsage}
            onChange={(e) => setDailyUsage(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors"
            min="1"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 p-4 rounded-lg border border-emerald-700/30">
          <div className="text-emerald-400 text-sm mb-1">Daily Energy</div>
          <div className="text-2xl font-bold text-white">{totalEnergy} <span className="text-sm text-slate-400">kWh</span></div>
        </div>
        <div className="bg-gradient-to-br from-orange-900/50 to-orange-950/50 p-4 rounded-lg border border-orange-700/30">
          <div className="text-orange-400 text-sm mb-1">Daily CO₂</div>
          <div className="text-2xl font-bold text-white">{totalCO2} <span className="text-sm text-slate-400">kg</span></div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 p-4 rounded-lg border border-blue-700/30">
          <div className="text-blue-400 text-sm mb-1">Yearly CO₂</div>
          <div className="text-2xl font-bold text-white">{yearlyCO2} <span className="text-sm text-slate-400">kg</span></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            Energy & Emissions
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="Energy" fill="#10b981" />
              <Bar dataKey="CO2" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h4 className="text-white font-semibold mb-4">Fuel Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
