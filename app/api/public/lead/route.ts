import { NextRequest, NextResponse } from "next/server";

import { WebsiteLead } from "@/types/websiteLead";
import { processWebsiteLead } from "@/services/leadService";

/**
 * Public Lead API
 *
 * Receives website quote requests from:
 * https://www.garythehandyman.com.au
 *
 * Protected using an X-API-Key header.
 */
export async function POST(
  request: NextRequest
) {
  try {

    // ==========================================
    // Validate API Key
    // ==========================================

    const apiKey =
      request.headers.get("X-API-Key");

    if (
      !process.env.WEBSITE_API_KEY ||
      apiKey !== process.env.WEBSITE_API_KEY
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // ==========================================
    // Read Request
    // ==========================================

    const body =
      (await request.json()) as WebsiteLead;

    // ==========================================
    // Build Lead
    // ==========================================

    const lead: WebsiteLead = {

      ...body,

      submitted_at:
        body.submitted_at ||
        new Date().toISOString(),

      source:
        body.source ||
        "Website",

      priority:
        body.priority ||
        "Normal",

      marketing_consent:
        body.marketing_consent ?? false,

      photos:
        body.photos ?? [],

      ip_address:
        request.headers.get("x-forwarded-for") ??
        null,

      user_agent:
        request.headers.get("user-agent") ??
        null,

    };

    // ==========================================
    // Process Lead
    // ==========================================

    const result =
      await processWebsiteLead(
        lead
      );

    return NextResponse.json(
      result,
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error("===== LEAD API ERROR =====");
  console.error(error);

  if (error instanceof Error) {
    console.error(error.stack);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Unknown server error.",
    },
    {
      status: 500,
    }
  );

}

/**
 * Reject GET requests
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Method Not Allowed",
    },
    {
      status: 405,
    }
  );
}

/**
 * Reject PUT requests
 */
export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      message: "Method Not Allowed",
    },
    {
      status: 405,
    }
  );
}

/**
 * Reject PATCH requests
 */
export async function PATCH() {
  return NextResponse.json(
    {
      success: false,
      message: "Method Not Allowed",
    },
    {
      status: 405,
    }
  );
}

/**
 * Reject DELETE requests
 */
export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      message: "Method Not Allowed",
    },
    {
      status: 405,
    }
  );
}