import { useState } from "react";
import { motion } from "motion/react";
import { FormationTimeline } from "./components/FormationTimeline";
import { UtilizationCalculator } from "./components/UtilizationCalculator";
import { DepletionPredictor } from "./components/DepletionPredictor";
import { Clock, Zap, TrendingDown } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("formation");

  const tabs = [
    { id: "formation", label: "Formation", icon: Clock },
    { id: "utilization", label: "Utilization", icon: Zap },
    { id: "depletion", label: "Depletion", icon: TrendingDown }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Fossil Fuel Intelligence Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Interactive analysis of formation, consumption, and depletion
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 shadow-2xl"
        >
          {activeTab === "formation" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="w-7 h-7 text-emerald-400" />
                Formation Timeline
                <span className="text-sm text-slate-500 font-normal ml-2">
                  (Millions of years in the making)
                </span>
              </h2>
              <FormationTimeline />
            </div>
          )}

          {activeTab === "utilization" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Zap className="w-7 h-7 text-amber-400" />
                Energy Utilization Calculator
              </h2>
              <UtilizationCalculator />
            </div>
          )}

          {activeTab === "depletion" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingDown className="w-7 h-7 text-red-400" />
                Depletion Prediction System
              </h2>
              <DepletionPredictor />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-slate-500 text-sm"
        >
          <p>
            Data calculated using simplified models for educational purposes •
            All predictions are simulated estimates
          </p>
        </motion.div>
      </div>
    </div>
  );
}