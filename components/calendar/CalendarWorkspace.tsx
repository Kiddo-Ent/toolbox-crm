"use client";

import { useMemo, useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import type { CalendarApi } from "@fullcalendar/core";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarEvent {
  id: string;

  title: string;

  start: string;

  end?: string;

  type:
    | "job"
    | "quote"
    | "appointment"
    | "leave"
    | "personal";
}

export default function CalendarWorkspace() {

  const calendarRef = useRef<FullCalendar>(null);

  const [view, setView] = useState<
    "dayGridMonth" |
    "timeGridWeek" |
    "timeGridDay"
  >("dayGridMonth");

  const events = useMemo<CalendarEvent[]>(
    () => [

      {
        id: "1",
        title: "Smith Fence Repair",
        start: "2026-07-21T08:00:00",
        end: "2026-07-21T10:00:00",
        type: "job",
      },

      {
        id: "2",
        title: "Jones Quote",
        start: "2026-07-22T11:00:00",
        end: "2026-07-22T12:00:00",
        type: "quote",
      },

      {
        id: "3",
        title: "Holiday",
        start: "2026-07-24",
        type: "leave",
      },

    ],
    []
  );

  const getCalendar = (): CalendarApi | null =>
    calendarRef.current?.getApi() ?? null;

  function today() {
    getCalendar()?.today();
  }

  function previous() {
    getCalendar()?.prev();
  }

  function next() {
    getCalendar()?.next();
  }

  function changeView(
    newView:
      | "dayGridMonth"
      | "timeGridWeek"
      | "timeGridDay"
  ) {

    setView(newView);

    getCalendar()?.changeView(newView);

  }

  return (

    <div className="flex-1 overflow-y-auto bg-slate-50">

      <div className="mx-auto max-w-7xl p-6 space-y-6">

        {/* ====================================== */}
        {/* Header */}
        {/* ====================================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Calendar
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Schedule
              </h1>

            </div>

            <button
              className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              + New Event
            </button>

          </div>

        </div>

        {/* ====================================== */}
        {/* Layout */}
        {/* ====================================== */}

        <div className="grid gap-6 lg:grid-cols-12">

          {/* ====================================== */}
          {/* Sidebar */}
          {/* ====================================== */}

          <div className="space-y-6 lg:col-span-3">

            <div className="rounded-xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Today
              </h2>

              <p className="mt-3 text-slate-600">
                Monday 20 July
              </p>

            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Upcoming
              </h2>

              <div className="mt-5 space-y-4">

                <div>

                  <p className="font-semibold">
                    8:00 AM
                  </p>

                  <p className="text-sm text-slate-500">
                    Smith Fence Repair
                  </p>

                </div>

                <div>

                  <p className="font-semibold">
                    11:00 AM
                  </p>

                  <p className="text-sm text-slate-500">
                    Jones Quote
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Filters
              </h2>

              <div className="mt-5 space-y-3">

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    defaultChecked
                  />

                  Jobs

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    defaultChecked
                  />

                  Quotes

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    defaultChecked
                  />

                  Appointments

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    defaultChecked
                  />

                  Leave

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    defaultChecked
                  />

                  Personal

                </label>

              </div>

            </div>

          </div>

          {/* ====================================== */}
          {/* Calendar */}
          {/* ====================================== */}

          <div className="lg:col-span-9">

            <div className="rounded-xl border border-slate-200 bg-white p-6">

              {/* Toolbar */}

              <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                <div className="flex flex-wrap items-center gap-3">

                  <button
                    onClick={today}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                  >
                    Today
                  </button>

                  <button
                    onClick={previous}
                    className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50"
                  >
                    ◀
                  </button>

                  <button
                    onClick={next}
                    className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50"
                  >
                    ▶
                  </button>

                </div>

                <div className="flex flex-wrap gap-3">
                                  <button
                    onClick={() => changeView("dayGridMonth")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      view === "dayGridMonth"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Month
                  </button>

                  <button
                    onClick={() => changeView("timeGridWeek")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      view === "timeGridWeek"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Week
                  </button>

                  <button
                    onClick={() => changeView("timeGridDay")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      view === "timeGridDay"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Day
                  </button>

                </div>

              </div>

              <FullCalendar
                ref={calendarRef}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                ]}
                initialView="dayGridMonth"
                headerToolbar={false}
                height="auto"
                editable
                selectable
                weekends
                events={events}
                dayMaxEvents={3}
                eventDisplay="block"
                nowIndicator
                eventClick={(info) => {

                  console.log(
                    "Clicked event",
                    info.event.id
                  );

                }}
                dateClick={(info) => {

                  console.log(
                    "Create event",
                    info.dateStr
                  );

                }}
                eventClassNames={(arg) => {

                  switch (arg.event.extendedProps.type) {

                    case "job":
                      return [
                        "bg-slate-700",
                        "border-slate-700",
                        "text-white",
                      ];

                    case "quote":
                      return [
                        "bg-blue-600",
                        "border-blue-600",
                        "text-white",
                      ];

                    case "appointment":
                      return [
                        "bg-emerald-600",
                        "border-emerald-600",
                        "text-white",
                      ];

                    case "leave":
                      return [
                        "bg-orange-500",
                        "border-orange-500",
                        "text-white",
                      ];

                    case "personal":
                      return [
                        "bg-purple-600",
                        "border-purple-600",
                        "text-white",
                      ];

                    default:
                      return [
                        "bg-slate-600",
                        "border-slate-600",
                        "text-white",
                      ];

                  }

                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}