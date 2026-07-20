"use client";

interface DescriptionPanelProps {
  title?: string;
  description?: string | null;
}

export default function DescriptionPanel({
  title = "Job Description",
  description,
}: DescriptionPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 px-6 py-4">

        <h2 className="text-xl font-bold text-slate-800">
          📝 {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Original customer request imported from the Opportunity.
        </p>

      </div>

      <div className="p-6">

        {description ? (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 whitespace-pre-wrap leading-7 text-slate-700">
            {description}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-10 text-center text-slate-500">
            No description has been provided.
          </div>
        )}

      </div>

    </div>
  );
}