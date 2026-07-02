"use client";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  colour?: "blue" | "emerald" | "amber" | "green" | "red" | "purple";
  onClick?: () => void;
}

const colourClasses = {
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  emerald: {
    border: "border-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  amber: {
    border: "border-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  green: {
    border: "border-green-500",
    bg: "bg-green-50",
    text: "text-green-600",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-50",
    text: "text-red-600",
  },
  purple: {
    border: "border-purple-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  colour = "blue",
  onClick,
}: KPICardProps) {
  const styles = colourClasses[colour];

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        bg-white
        border-t-4
        ${styles.border}
        p-6
        text-left
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        active:scale-[0.98]
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            ${styles.bg}
            text-3xl
          `}
        >
          {icon}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <span
          className={`
            text-sm
            font-semibold
            ${styles.text}
          `}
        >
          {subtitle}
        </span>

        <span className="text-slate-400 text-xl">
          →
        </span>

      </div>

    </button>
  );
}