import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const opportunityId = body.opportunityId;

    if (!opportunityId) {
      return NextResponse.json(
        {
          success: false,
          message: "Opportunity ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    //
    // --------------------------------------------------
    // Load Opportunity
    // --------------------------------------------------
    //

    const {
      data: opportunity,
      error: opportunityError,
    } = await supabaseAdmin
      .from("opportunities")
      .select("*")
      .eq("id", opportunityId)
      .single();

    if (opportunityError || !opportunity) {
      console.error(opportunityError);

      return NextResponse.json(
        {
          success: false,
          message: "Opportunity not found.",
        },
        {
          status: 404,
        }
      );
    }

    //
    // --------------------------------------------------
    // Next Quote Number
    // --------------------------------------------------
    //

    const { data: lastQuote } =
      await supabaseAdmin
        .from("quotes")
        .select("quote_number")
        .order("quote_number", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

    const nextQuoteNumber =
      (lastQuote?.quote_number ?? 0) + 1;

    //
    // --------------------------------------------------
    // Dates
    // --------------------------------------------------
    //

    const today = new Date();

    const issueDate =
      today.toISOString().split("T")[0];

    const expiry = new Date(today);

    expiry.setDate(expiry.getDate() + 30);

    const expiryDate =
      expiry.toISOString().split("T")[0];

    //
    // --------------------------------------------------
    // Create Quote
    // --------------------------------------------------
    //

    const {
      data: quote,
      error: quoteError,
    } = await supabaseAdmin
      .from("quotes")
      .insert({
        quote_number: nextQuoteNumber,

        version: 1,

        customer_id:
          opportunity.customer_id,

        property_id:
          opportunity.property_id,

        opportunity_id:
          opportunity.id,

        quote_status: "Draft",

        issue_date: issueDate,

        expiry_date: expiryDate,

        materials_total: 0,

        labour_total: 0,

        subtotal: 0,

        gst: 0,

        total: 0,

        customer_notes:
          opportunity.description ?? "",

        internal_notes:
          opportunity.notes ?? "",

        is_deleted: false,
      })
      .select()
      .single();

    if (quoteError) {
      console.error(quoteError);

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to create quote.",
        },
        {
          status: 500,
        }
      );
    }

    //
    // --------------------------------------------------
    // Success
    // --------------------------------------------------
    //

    return NextResponse.json({
      success: true,

      quoteId: quote.id,

      quoteNumber:
        quote.quote_number,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unexpected server error.",
      },
      {
        status: 500,
      }
    );
  }
}