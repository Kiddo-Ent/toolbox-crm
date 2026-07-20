"use client";

import { useState } from "react";

type SettingsSection =
  | "business"
  | "invoice"
  | "calendar"
  | "users"
  | "notifications"
  | "integrations"
  | "security"
  | "system";

export default function SettingsWorkspace() {

  const [section, setSection] =
    useState<SettingsSection>("business");

  return (

    <div className="flex-1 overflow-y-auto bg-slate-50">

      <div className="mx-auto max-w-7xl space-y-6 p-6">

        {/* Header */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Settings
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                System Settings
              </h1>

              <p className="mt-2 text-slate-500">
                Configure every aspect of your Toolbox CRM.
              </p>

            </div>

            <button
              className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Save Changes
            </button>

          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-12">

          {/* Left Menu */}

          <div className="lg:col-span-3">

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <button
                onClick={() => setSection("business")}
                className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
                  section === "business"
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                🏢 Business
              </button>

              <button
                onClick={() => setSection("invoice")}
                className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
                  section === "invoice"
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                📄 Invoice Settings
              </button>

              <button
                onClick={() => setSection("calendar")}
                className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
                  section === "calendar"
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                📅 Calendar
              </button>

              <button
                onClick={() => setSection("users")}
                className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
                  section === "users"
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                👥 Users
              </button>

              <button
                onClick={() => setSection("notifications")}
                className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
                  section === "notifications"
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                🔔 Notifications
              </button>

              <button
                onClick={() => setSection("integrations")}
                className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
                  section === "integrations"
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                🔗 Integrations
              </button>

              <button
                onClick={() => setSection("security")}
                className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
                  section === "security"
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                🔒 Security
              </button>

              <button
                onClick={() => setSection("system")}
                className={`w-full rounded-lg px-4 py-3 text-left transition ${
                  section === "system"
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                ⚙️ System
              </button>

            </div>

          </div>

          {/* Right Panel */}

          <div className="space-y-6 lg:col-span-9">

            {section === "business" && (

              <>

                <div className="rounded-xl border border-slate-200 bg-white p-6">

                  <h2 className="text-xl font-bold text-slate-900">
                    Business Details
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Configure your company information.
                  </p>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Business Name
                      </label>

                      <input
                        defaultValue="Gary the Handyman"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        ABN
                      </label>

                      <input
                        placeholder="51 234 567 890"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Email
                      </label>

                      <input
                        defaultValue="garythehandyman26@gmail.com"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Phone
                      </label>

                      <input
                        defaultValue="0409 709 234"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      />

                    </div>

                  </div>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6">

                  <h2 className="text-xl font-bold text-slate-900">
                    GST Settings
                  </h2>

                  <div className="mt-6 flex items-center gap-3">

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    <span>Business is registered for GST</span>

                  </div>

                  <div className="mt-6">

                    <label className="mb-2 block text-sm font-medium">
                      GST Rate (%)
                    </label>

                    <input
                      defaultValue="10"
                      className="w-40 rounded-lg border border-slate-300 px-4 py-3"
                    />

                  </div>

                </div>
                                <div className="rounded-xl border border-slate-200 bg-white p-6">

                  <h2 className="text-xl font-bold text-slate-900">
                    Invoice Defaults
                  </h2>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Invoice Prefix
                      </label>

                      <input
                        defaultValue="INV-"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Next Invoice Number
                      </label>

                      <input
                        defaultValue="1005"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Default Payment Terms
                      </label>

                      <select
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        defaultValue="7"
                      >
                        <option value="0">Due on Receipt</option>
                        <option value="7">7 Days</option>
                        <option value="14">14 Days</option>
                        <option value="30">30 Days</option>
                      </select>

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Currency
                      </label>

                      <select
                        defaultValue="AUD"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      >
                        <option>AUD</option>
                      </select>

                    </div>

                  </div>

                </div>

              </>

            )}

            {section === "invoice" && (

              <div className="rounded-xl border border-slate-200 bg-white p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  Invoice Settings
                </h2>

                <p className="mt-2 text-slate-500">
                  Configure invoice templates and payment information.
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Bank Name
                    </label>

                    <input
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Account Name
                    </label>

                    <input
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      BSB
                    </label>

                    <input
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Account Number
                    </label>

                    <input
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                  </div>

                </div>

                <div className="mt-8">

                  <label className="mb-2 block text-sm font-medium">
                    Default Invoice Notes
                  </label>

                  <textarea
                    rows={6}
                    defaultValue="Thank you for your business."
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  />

                </div>

              </div>

            )}

            {section === "calendar" && (

              <div className="rounded-xl border border-slate-200 bg-white p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  Calendar Settings
                </h2>

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Work Starts
                    </label>

                    <input
                      type="time"
                      defaultValue="08:00"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Work Finishes
                    </label>

                    <input
                      type="time"
                      defaultValue="17:00"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                  </div>

                </div>

                <div className="mt-8 space-y-4">

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    Show Weekends

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                    />

                    Display Public Holidays

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    Send Appointment Reminders

                  </label>

                </div>

              </div>

            )}
                        {section === "users" && (

              <div className="rounded-xl border border-slate-200 bg-white p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  User Management
                </h2>

                <p className="mt-2 text-slate-500">
                  Manage staff access and permissions.
                </p>

                <div className="mt-8 space-y-4">

                  <div className="rounded-lg border border-slate-200 p-4">

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="font-semibold">
                          Gary Lock
                        </h3>

                        <p className="text-sm text-slate-500">
                          Administrator
                        </p>

                      </div>

                      <button className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">
                        Edit
                      </button>

                    </div>

                  </div>

                  <button className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 transition">
                    + Add User
                  </button>

                </div>

              </div>

            )}

            {section === "notifications" && (

              <div className="rounded-xl border border-slate-200 bg-white p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  Notifications
                </h2>

                <p className="mt-2 text-slate-500">
                  Configure reminders and notifications.
                </p>

                <div className="mt-8 space-y-5">

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    Email customer reminders

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    Notify when quotes are accepted

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    Notify when invoices become overdue

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                    />

                    Daily summary email

                  </label>

                </div>

              </div>

            )}

            {section === "integrations" && (

              <div className="rounded-xl border border-slate-200 bg-white p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  Integrations
                </h2>

                <p className="mt-2 text-slate-500">
                  Connect Toolbox CRM with external services.
                </p>

                <div className="mt-8 grid gap-4">

                  {[
                    "Supabase",
                    "Google Calendar",
                    "Google Maps",
                    "Stripe",
                    "Xero",
                    "MYOB",
                    "Resend Email",
                  ].map((service) => (

                    <div
                      key={service}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                    >

                      <div>

                        <h3 className="font-semibold">
                          {service}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Not Connected
                        </p>

                      </div>

                      <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                        Connect
                      </button>

                    </div>

                  ))}

                </div>

              </div>

            )}

            {section === "security" && (

              <div className="rounded-xl border border-slate-200 bg-white p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  Security
                </h2>

                <div className="mt-8 space-y-5">

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    Require strong passwords

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                    />

                    Enable Multi-Factor Authentication

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                    Automatic database backups

                  </label>

                </div>

              </div>

            )}

            {section === "system" && (

              <div className="rounded-xl border border-slate-200 bg-white p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  System Information
                </h2>

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                  <div>

                    <p className="text-sm text-slate-500">
                      Application
                    </p>

                    <p className="font-semibold">
                      Toolbox CRM
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Version
                    </p>

                    <p className="font-semibold">
                      1.0.0
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Database
                    </p>

                    <p className="font-semibold">
                      Supabase
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Environment
                    </p>

                    <p className="font-semibold">
                      Production
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}