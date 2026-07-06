import { supabase } from "@/lib/supabase/client";
import { Job } from "@/types/job";

/**
 * Convert NULL database values into UI-friendly values.
 */
function normaliseJob(job: Job): Job {
  return {
    ...job,

    customer_id: job.customer_id ?? "",
    property_id: job.property_id ?? "",
    opportunity_id: job.opportunity_id ?? "",
    quote_id: job.quote_id ?? "",

    title: job.title ?? "",
    description: job.description ?? "",

    status: job.status ?? "New",
    priority: job.priority ?? "Normal",

    scheduled_date: job.scheduled_date ?? "",
    completed_date: job.completed_date ?? "",

    assigned_to: job.assigned_to ?? "",

    estimated_hours: job.estimated_hours ?? 0,
    actual_hours: job.actual_hours ?? 0,

    labour_cost: job.labour_cost ?? 0,
    materials_cost: job.materials_cost ?? 0,
    total_cost: job.total_cost ?? 0,

    notes: job.notes ?? "",
  };
}

/**
 * Get all active jobs
 */
export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_deleted", false)
    .order("job_number", {
      ascending: false,
    });

  if (error) {
    console.error("getJobs:", error);
    return [];
  }

  return (data as Job[]).map(normaliseJob);
}

/**
 * Get a single job
 */
export async function getJob(
  id: string
): Promise<Job | null> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getJob:", error);
    return null;
  }

  return normaliseJob(data as Job);
}

/**
 * Create a job
 */
export async function createJob(
  job: Omit<Job, "id" | "created_at" | "updated_at">
): Promise<Job> {
  const { data, error } = await supabase
    .from("jobs")
    .insert(job)
    .select()
    .single();

  if (error) {
    console.error("createJob:", error);
    throw error;
  }

  return normaliseJob(data as Job);
}

/**
 * Update a job
 */
export async function updateJob(
  job: Job
): Promise<Job> {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      job_number: job.job_number,

      customer_id: job.customer_id || null,
      property_id: job.property_id || null,
      opportunity_id: job.opportunity_id || null,
      quote_id: job.quote_id || null,

      title: job.title,
      description: job.description || null,

      status: job.status,
      priority: job.priority,

      scheduled_date: job.scheduled_date || null,
      completed_date: job.completed_date || null,

      assigned_to: job.assigned_to || null,

      estimated_hours: job.estimated_hours,
      actual_hours: job.actual_hours,

      labour_cost: job.labour_cost,
      materials_cost: job.materials_cost,
      total_cost: job.total_cost,

      notes: job.notes || null,
    })
    .eq("id", job.id)
    .select()
    .single();

  if (error) {
    console.error("updateJob:", error);
    throw error;
  }

  return normaliseJob(data as Job);
}

/**
 * Soft delete
 */
export async function deleteJob(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("jobs")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("deleteJob:", error);
    throw error;
  }
}