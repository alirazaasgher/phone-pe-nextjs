import { Trophy, TrendingUp } from "lucide-react";
export default function OverallScores({ scores }) {
  const maxScore = 100;

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="text-orange-500" size={20} />
        <h2 className="text-lg font-bold text-gray-900">Overall Scores</h2>
      </div>

      {/* Scores */}
      <div className="space-y-2">
        {scores.map((phone, index) => (
          <div
            key={phone.name}
            className="bg-white rounded-lg px-4 py-2.5 border border-gray-200 hover:border-gray-300 transition"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {/* Rank */}
                <span className="w-6 text-xs font-semibold text-gray-500">
                  #{index + 1}
                </span>

                {/* Name */}
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {phone.name}
                </h3>
              </div>

              {/* Score */}
              <span
                className="text-lg font-bold flex-shrink-0"
                style={{ color: phone.color }}
              >
                {phone.score.toFixed(1)}
                <span className="text-xs text-gray-400 font-medium ml-0.5">
                  /{maxScore}
                </span>
              </span>
            </div>

            {/* Progress */}
            <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(phone.score / maxScore) * 100}%`,
                  backgroundColor: phone.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
        <TrendingUp size={14} />
        <p>Weighted score based on performance, camera, battery & build</p>
      </div>
    </div>
  );
}
