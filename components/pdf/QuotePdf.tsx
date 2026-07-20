"use client";

import {
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

import { pdfStyles } from "./styles";

import { Quote } from "@/types/quote";
import { QuoteItem } from "@/types/quoteItem";
import { Customer } from "@/types/customer";
import { Property } from "@/types/property";
import { Opportunity } from "@/types/opportunity";

interface QuotePdfProps {
  quote: Quote;
  customer: Customer;
  property: Property;
  opportunity: Opportunity;
  items: QuoteItem[];
}

function money(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(date: string | null | undefined) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-AU");
}

export default function QuotePdf({
  quote,
  customer,
  property,
  opportunity,
  items,
}: QuotePdfProps) {
  return (
    <Document>

      <Page
        size="A4"
        style={pdfStyles.page}
      >

        {/* =======================================================
            HEADER
        ======================================================= */}

        <View style={pdfStyles.header}>

          <View style={pdfStyles.companyBlock}>

            {/* Logo goes here later */}

            <Text style={pdfStyles.companyName}>
              Gary the Handyman
            </Text>

            <Text style={pdfStyles.companyDetails}>
              ABN: 12 345 678 901
            </Text>

            <Text style={pdfStyles.companyDetails}>
              0409 709 234
            </Text>

            <Text style={pdfStyles.companyDetails}>
              garythehandyman26@gmail.com
            </Text>

            <Text style={pdfStyles.companyDetails}>
              www.garythehandyman.com.au
            </Text>

          </View>

          <View style={pdfStyles.documentBlock}>

            <Text style={pdfStyles.documentTitle}>
              QUOTE
            </Text>

            <Text style={pdfStyles.documentNumber}>
              Quote #{quote.quote_number}
            </Text>

            <Text style={pdfStyles.companyDetails}>
              Version {quote.version}
            </Text>

            <Text style={pdfStyles.companyDetails}>
              Date:
              {" "}
              {formatDate(
                quote.issue_date
              )}
            </Text>

            <Text style={pdfStyles.companyDetails}>
              Valid Until:
              {" "}
              {formatDate(
                quote.expiry_date
              )}
            </Text>

            <Text style={pdfStyles.companyDetails}>
              Status:
              {" "}
              {quote.quote_status}
            </Text>

          </View>

        </View>

        {/* =======================================================
    CUSTOMER
======================================================= */}

<View style={pdfStyles.section}>

  <View style={pdfStyles.sectionHeader}>
    <Text style={pdfStyles.sectionTitle}>
      Customer
    </Text>
  </View>

  <View style={pdfStyles.sectionBody}>

    <Text>
      <Text style={pdfStyles.label}>
        Name:
      </Text>{" "}
      {customer.first_name} {customer.last_name}
    </Text>

    {customer.company_name && (
      <Text>
        <Text style={pdfStyles.label}>
          Company:
        </Text>{" "}
        {customer.company_name}
      </Text>
    )}

    {customer.mobile_phone && (
      <Text>
        <Text style={pdfStyles.label}>
          Mobile:
        </Text>{" "}
        {customer.mobile_phone}
      </Text>
    )}

    {customer.email && (
      <Text>
        <Text style={pdfStyles.label}>
          Email:
        </Text>{" "}
        {customer.email}
      </Text>
    )}

  </View>

</View>

{/* =======================================================
    PROPERTY
======================================================= */}

<View style={pdfStyles.section}>

  <View style={pdfStyles.sectionHeader}>
    <Text style={pdfStyles.sectionTitle}>
      Property
    </Text>
  </View>

  <View style={pdfStyles.sectionBody}>

    <Text>
      {property.address_line_1}
    </Text>

    {property.address_line_2 && (
      <Text>
        {property.address_line_2}
      </Text>
    )}

    <Text>
      {property.suburb}, {property.state} {property.postcode}
    </Text>

    {property.property_name && (
      <Text>
        <Text style={pdfStyles.label}>
          Property:
        </Text>{" "}
        {property.property_name}
      </Text>
    )}

  </View>

</View>

{/* =======================================================
    OPPORTUNITY
======================================================= */}

<View style={pdfStyles.section}>

  <View style={pdfStyles.sectionHeader}>
    <Text style={pdfStyles.sectionTitle}>
      Opportunity
    </Text>
  </View>

  <View style={pdfStyles.sectionBody}>

    <Text>
      <Text style={pdfStyles.label}>
        Opportunity #
      </Text>{" "}
      {opportunity.opportunity_number}
    </Text>

    <Text>
      <Text style={pdfStyles.label}>
        Title:
      </Text>{" "}
      {opportunity.title}
    </Text>

    <Text>
      <Text style={pdfStyles.label}>
        Source:
      </Text>{" "}
      {opportunity.source}
    </Text>

    <Text>
      <Text style={pdfStyles.label}>
        Status:
      </Text>{" "}
      {opportunity.opportunity_status}
    </Text>

    <Text>
      <Text style={pdfStyles.label}>
        Probability:
      </Text>{" "}
      {opportunity.probability}%
    </Text>

  </View>

</View>

{/* =======================================================
    CUSTOMER REQUEST
======================================================= */}

<View style={pdfStyles.section}>

  <View style={pdfStyles.sectionHeader}>
    <Text style={pdfStyles.sectionTitle}>
      Customer Request
    </Text>
  </View>

  <View style={pdfStyles.sectionBody}>

    <Text style={pdfStyles.paragraph}>
      {opportunity.description ||
        "No description provided."}
    </Text>

  </View>

</View>

{/* =======================================================
    QUOTE ITEMS
======================================================= */}

<View style={pdfStyles.section}>

  <View style={pdfStyles.sectionHeader}>
    <Text style={pdfStyles.sectionTitle}>
      Quote Items
    </Text>
  </View>

  <View style={pdfStyles.table}>

    {/* Header */}

    <View style={pdfStyles.tableHeader}>

      <Text
        style={[
          pdfStyles.cell,
          pdfStyles.qty,
        ]}
      >
        Qty
      </Text>

      <Text
        style={[
          pdfStyles.cell,
          pdfStyles.description,
        ]}
      >
        Description
      </Text>

      <Text
        style={[
          pdfStyles.cell,
          pdfStyles.unit,
        ]}
      >
        Unit
      </Text>

      <Text
        style={[
          pdfStyles.cell,
          pdfStyles.price,
        ]}
      >
        Rate
      </Text>

      <Text
        style={[
          pdfStyles.cell,
          pdfStyles.gst,
        ]}
      >
        GST
      </Text>

      <Text
        style={[
          pdfStyles.cell,
          pdfStyles.total,
        ]}
      >
        Total
      </Text>

    </View>

    {/* Rows */}

    {items.length === 0 ? (

      <View style={pdfStyles.tableRow}>

        <Text
          style={{
            padding: 12,
            color: "#888",
          }}
        >
          No quote items.
        </Text>

      </View>

    ) : (

      items.map((item) => (

        <View
          key={item.id}
          style={pdfStyles.tableRow}
        >

          <Text
            style={[
              pdfStyles.cell,
              pdfStyles.qty,
            ]}
          >
            {item.quantity}
          </Text>

          <View
            style={[
              pdfStyles.cell,
              pdfStyles.description,
            ]}
          >

            <Text>
              {item.description}
            </Text>

            {item.notes && (
              <Text
                style={{
                  fontSize: 8,
                  color: "#666",
                  marginTop: 2,
                }}
              >
                {item.notes}
              </Text>
            )}

          </View>

          <Text
            style={[
              pdfStyles.cell,
              pdfStyles.unit,
            ]}
          >
            {item.unit}
          </Text>

          <Text
            style={[
              pdfStyles.cell,
              pdfStyles.price,
            ]}
          >
            ${money(item.unit_price)}
          </Text>

          <Text
            style={[
              pdfStyles.cell,
              pdfStyles.gst,
            ]}
          >
            {item.gst_rate}%
          </Text>

          <Text
            style={[
              pdfStyles.cell,
              pdfStyles.total,
            ]}
          >
            ${money(item.line_total)}
          </Text>

        </View>

      ))

    )}

  </View>

</View>

{/* =======================================================
    TOTALS
======================================================= */}

<View style={pdfStyles.totals}>

  <View style={pdfStyles.totalRow}>
    <Text>Materials</Text>
    <Text>${money(quote.materials_total)}</Text>
  </View>

  <View style={pdfStyles.totalRow}>
    <Text>Labour</Text>
    <Text>${money(quote.labour_total)}</Text>
  </View>

  <View style={pdfStyles.totalRow}>
    <Text>Subtotal</Text>
    <Text>${money(quote.subtotal)}</Text>
  </View>

  <View style={pdfStyles.totalRow}>
    <Text>GST</Text>
    <Text>${money(quote.gst)}</Text>
  </View>

  <View style={pdfStyles.grandTotal}>

    <Text>TOTAL</Text>

    <Text>
      ${money(quote.total)}
    </Text>

  </View>

</View>

{/* =======================================================
    CUSTOMER NOTES
======================================================= */}

{quote.customer_notes && (

<View style={pdfStyles.section}>

  <View style={pdfStyles.sectionHeader}>
    <Text style={pdfStyles.sectionTitle}>
      Customer Notes
    </Text>
  </View>

  <View style={pdfStyles.sectionBody}>

    <Text style={pdfStyles.paragraph}>
      {quote.customer_notes}
    </Text>

  </View>

</View>

)}

{/* =======================================================
    TERMS & CONDITIONS
======================================================= */}

<View style={pdfStyles.section}>

  <View style={pdfStyles.sectionHeader}>
    <Text style={pdfStyles.sectionTitle}>
      Terms & Conditions
    </Text>
  </View>

  <View style={pdfStyles.sectionBody}>

    <Text style={pdfStyles.paragraph}>
• This quotation is valid for 30 days from the issue date.
    </Text>

    <Text style={pdfStyles.paragraph}>
• Acceptance of this quotation authorises Gary the Handyman to commence the work described.
    </Text>

    <Text style={pdfStyles.paragraph}>
• Variations requested after acceptance may result in additional charges.
    </Text>

    <Text style={pdfStyles.paragraph}>
• Payment is due within the agreed trading terms unless otherwise stated.
    </Text>

    <Text style={pdfStyles.paragraph}>
• Materials remain the property of Gary the Handyman until paid in full.
    </Text>

  </View>

</View>

{/* =======================================================
    CUSTOMER ACCEPTANCE
======================================================= */}

<View style={pdfStyles.signatureSection}>

  <View style={pdfStyles.signatureBox}>

    <Text style={pdfStyles.label}>
      Customer Acceptance
    </Text>

    <View style={pdfStyles.signatureLine}>
      <Text>
        Signature
      </Text>
    </View>

  </View>

  <View style={pdfStyles.signatureBox}>

    <Text style={pdfStyles.label}>
      Date
    </Text>

    <View style={pdfStyles.signatureLine}>
      <Text>
        /      /
      </Text>
    </View>

  </View>

</View>

{/* =======================================================
    FOOTER
======================================================= */}

<View
  fixed
  style={pdfStyles.footer}
>

  <Text>
    Generated by ToolBox CRM
  </Text>

  <Text>
    Gary the Handyman •
    0409 709 234 •
    www.garythehandyman.com.au
  </Text>

</View>

      </Page>

    </Document>

  );

}