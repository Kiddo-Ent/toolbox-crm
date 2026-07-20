import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const customerId =
      request.nextUrl.searchParams.get("customerId");

    const propertyId =
      request.nextUrl.searchParams.get("propertyId");

    const opportunityId =
      request.nextUrl.searchParams.get("opportunityId");

    const quoteId =
      request.nextUrl.searchParams.get("quoteId");

    //
    // Build Query
    //

    let query = supabaseAdmin
      .from("photos")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", {
        ascending: false,
      });

    if (customerId) {
      query = query.eq(
        "customer_id",
        customerId
      );
    }

    if (propertyId) {
      query = query.eq(
        "property_id",
        propertyId
      );
    }

    if (opportunityId) {
      query = query.eq(
        "opportunity_id",
        opportunityId
      );
    }

    if (quoteId) {
      query = query.eq(
        "quote_id",
        quoteId
      );
    }

    const { data, error } =
      await query;

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    //
    // Build Public URLs
    //

    const photos =
      data.map((photo) => {

        const {
          data: publicUrl,
        } = supabaseAdmin.storage
          .from("toolbox-photos")
          .getPublicUrl(photo.storage_path);

        return {
          ...photo,

          url:
            publicUrl.publicUrl,
        };

      });

    return NextResponse.json(
      photos
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Unable to load photos.",
      },
      {
        status: 500,
      }
    );

  }
}