"use client";

interface PipelineStage {
  name: string;
  count: number;
  value: string;
  colour: string;
  width: string;
}

const pipeline: PipelineStage[] = [
  {
    name: "Draft",
    count: 6,
    value: "$8,450",
    colour: "bg-slate-500",
    width: "w-2/5",
  },
  {
    name: "Sent",
    count: 4,
    value: "$12,980",
    colour: "bg-blue-500",
    width: "w-3/5",
  },
  {
    name: "Accepted",
    count: 12,
    value: "$28,760",
    colour: "bg-emerald-500",
    width: "w-full",
  },
  {
    name: "Declined",
    count: 2,
    value: "$3,120",
    colour: "bg-red-500",
    width: "w-1/5",
  },
];

export default function PipelineCard() {
  const totalQuotes = pipeline.reduce(
    (sum, stage) => sum + stage.count,
    0
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Quote Pipeline
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current quote status
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          📈
        </div>

      </div>

      {/* Summary */}

      <div className="mb-8 rounded-xl bg-slate-50 p-5">

        <p className="text-sm text-slate-500">
          Active Quotes
        </p>

        <h1 className="mt-2 text-5xl font-bold text-slate-800">
          {totalQuotes}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Across all pipeline stages
        </p>

      </div>

      {/* Pipeline */}

      <div className="space-y-6">

        {pipeline.map((stage) => (

          <div key={stage.name}>

            <div className="mb-2 flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-800">
                  {stage.name}
                </p>

                <p className="text-sm text-slate-500">
                  {stage.value}
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                {stage.count}
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-200">

              <div
                className={`h-3 rounded-full ${stage.colour} ${stage.width}`}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <button
        className="mt-8 w-full rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        View All Quotes
      </button>

    </div>
  );
}