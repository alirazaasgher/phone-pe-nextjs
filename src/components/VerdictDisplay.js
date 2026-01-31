import React from "react";
import {
  Monitor,
  Cpu,
  Camera,
  Battery,
  Award,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

const VerdictDisplay = ({ verdict }) => {
  const categoryIcons = {
    display: Monitor,
    performance: Cpu,
    camera: Camera,
    battery: Battery,
    build: Award,
    features: Sparkles,
  };

  const verdictTypeStyles = {
    decisive: "bg-green-50 text-green-700 border-green-300",
    notable: "bg-blue-50 text-blue-700 border-blue-300",
    close: "bg-gray-50 text-gray-700 border-gray-300",
    marginal: "bg-yellow-50 text-yellow-700 border-yellow-300",
  };

  const verdictTypeLabels = {
    decisive: "Decisive",
    notable: "Notable",
    close: "Close",
    marginal: "Marginal",
  };

  const { category_winners, category_verdicts, overall_recommendation } =
    verdict;

  return (
    <div className="space-y-5 mb-5">
      {/* ================= OVERALL RECOMMENDATION ================= */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
        <div className="flex items-center gap-4">
          {/* Trophy Icon */}
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <Trophy size={20} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold">Best Overall</h2>
            <p className="text-base font-semibold mt-0.5">
              {overall_recommendation.recommended_phone}
            </p>
            <p className="text-xs text-orange-100 mt-1 line-clamp-2">
              {overall_recommendation.message.replace(
                "{phones}",
                overall_recommendation.total_phones
                  ? overall_recommendation.total_phones.join(", ")
                  : "",
              )}
            </p>
          </div>
        </div>

        {/* Key Differentiators */}
        {overall_recommendation.key_differentiators.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {overall_recommendation.key_differentiators.map((diff, idx) => {
              const Icon = categoryIcons[diff.category];
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                >
                  {Icon && <Icon size={18} className="text-white" />}
                  <div className="flex-1">
                    <p className="capitalize font-semibold">{diff.category}</p>
                    <p className="text-xs text-orange-100">
                      +{diff.margin} points advantage
                    </p>
                  </div>
                  <Zap size={16} className="text-yellow-300" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= CATEGORY WINNERS ================= */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Award className="text-orange-500" size={20} />
          Category Breakdown
        </h2>

        <div className="divide-y divide-gray-100">
          {Object.entries(category_winners).map(([category, data]) => {
            const Icon = categoryIcons[category];
            const verdictType = data.verdict_type;
            const isDominant = ["decisive", "notable"].includes(verdictType);

            return (
              <div
                key={category}
                className={`flex items-center gap-3 py-3 ${
                  isDominant ? "bg-orange-50/60" : ""
                }`}
              >
                {/* Icon */}
                {Icon && (
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isDominant
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                )}

                {/* Category + Verdict */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold capitalize text-gray-900 truncate">
                      {data.category_label || category}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500 truncate">
                    {category_verdicts[category].replace(
                      "{phones}",
                      data.phones?.join(", ") || "",
                    )}
                  </p>
                </div>

                {/* Score / Winner */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {data.winner}
                  </p>
                  <p className="text-lg font-bold leading-none">{data.score}</p>
                  {data.difference > 0 && (
                    <p className="text-[10px] text-gray-500">
                      +{data.difference}
                    </p>
                  )}
                </div>

                {/* Verdict badge */}
                <span
                  className={`ml-2 px-2.5 py-1 text-[10px] font-semibold rounded-full border whitespace-nowrap ${
                    verdictTypeStyles[verdictType]
                  }`}
                >
                  {verdictTypeLabels[verdictType]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerdictDisplay;
