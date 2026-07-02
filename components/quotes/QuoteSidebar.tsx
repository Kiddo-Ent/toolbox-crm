const menu = [
  "Dashboard",
  "Customers",
  "Quotes",
  "Jobs",
  "Invoices",
  "Expenses",
  "Materials",
  "Reports",
  "Settings",
];

export default function QuoteSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-8">
        ToolBox
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <button
            key={item}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              item === "Quotes"
                ? "bg-orange-500"
                : "hover:bg-slate-800"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}