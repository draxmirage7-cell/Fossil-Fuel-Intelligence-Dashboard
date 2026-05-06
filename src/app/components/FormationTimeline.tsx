import { motion } from "motion/react";
import { Leaf, Droplet, Mountain } from "lucide-react";

export function FormationTimeline() {
  const stages = [
    {
      year: "300M",
      label: "Organic Matter",
      icon: Leaf,
      color: "from-green-600 to-green-800",
      description: "Plants & organisms die"
    },
    {
      year: "100M",
      label: "Burial & Pressure",
      icon: Mountain,
      color: "from-amber-600 to-amber-800",
      description: "Sediment layers build"
    },
    {
      year: "50M",
      label: "Heat & Transformation",
      icon: Droplet,
      color: "from-orange-600 to-orange-800",
      description: "Chemical changes occur"
    },
    {
      year: "Today",
      label: "Fossil Fuels",
      icon: Droplet,
      color: "from-slate-700 to-slate-900",
      description: "Coal, oil, gas formed"
    }
  ];

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-amber-500 to-slate-600"></div>

      <div className="space-y-12">
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className="relative flex items-start gap-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.3 + 0.2, type: "spring" }}
              className={`z-10 w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg`}
            >
              <stage.icon className="w-8 h-8 text-white" />
            </motion.div>

            <div className="flex-1 pt-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 0.4 }}
              >
                <div className="text-emerald-400 font-mono text-sm mb-1">
                  {stage.year} years ago
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {stage.label}
                </h3>
                <p className="text-slate-400 text-sm">
                  {stage.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
