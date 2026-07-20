import { StyleSheet } from "@react-pdf/renderer";

export const colours = {
  primary: "#0F4C81",
  secondary: "#1E88E5",
  success: "#2E7D32",
  danger: "#C62828",

  dark: "#1F2937",
  grey900: "#374151",
  grey700: "#6B7280",
  grey500: "#9CA3AF",
  grey300: "#D1D5DB",
  grey200: "#E5E7EB",
  grey100: "#F3F4F6",

  white: "#FFFFFF",
};

export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    paddingTop: 35,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: colours.dark,
  },

  //----------------------------------
  // Header
  //----------------------------------

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: colours.primary,
    paddingBottom: 12,
  },

  companyBlock: {
    width: "55%",
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 8,
  },

  companyName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colours.primary,
    marginBottom: 4,
  },

  companyDetails: {
    fontSize: 10,
    lineHeight: 1.5,
    color: colours.grey900,
  },

  documentBlock: {
    width: "40%",
    alignItems: "flex-end",
  },

  documentTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colours.primary,
    marginBottom: 8,
  },

  documentNumber: {
    fontSize: 12,
    fontWeight: "bold",
  },

  //----------------------------------
  // Section Cards
  //----------------------------------

  section: {
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colours.grey200,
    borderRadius: 6,
  },

  sectionHeader: {
    backgroundColor: colours.grey100,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colours.grey200,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colours.primary,
  },

  sectionBody: {
    padding: 10,
  },

  //----------------------------------
  // Text
  //----------------------------------

  label: {
    fontWeight: "bold",
    color: colours.grey900,
  },

  value: {
    color: colours.dark,
  },

  paragraph: {
    lineHeight: 1.6,
    fontSize: 10,
  },

  //----------------------------------
  // Tables
  //----------------------------------

  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: colours.grey300,
    marginBottom: 20,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: colours.primary,
    color: colours.white,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colours.grey200,
    minHeight: 28,
    alignItems: "center",
  },

  cell: {
    padding: 6,
    fontSize: 9,
  },

  qty: {
    width: "8%",
  },

  description: {
    width: "44%",
  },

  unit: {
    width: "10%",
    textAlign: "center",
  },

  price: {
    width: "14%",
    textAlign: "right",
  },

  gst: {
    width: "10%",
    textAlign: "right",
  },

  total: {
    width: "14%",
    textAlign: "right",
    fontWeight: "bold",
  },

  //----------------------------------
  // Totals
  //----------------------------------

  totals: {
    width: 220,
    marginLeft: "auto",
    marginTop: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colours.grey200,
  },

  grandTotal: {
    backgroundColor: colours.success,
    color: colours.white,
    padding: 10,
    marginTop: 6,
    fontSize: 14,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //----------------------------------
  // Footer
  //----------------------------------

  footer: {
    position: "absolute",
    bottom: 18,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: colours.grey700,
    borderTopWidth: 1,
    borderTopColor: colours.grey300,
    paddingTop: 8,
  },

  //----------------------------------
  // Signature
  //----------------------------------

  signatureSection: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  signatureBox: {
    width: "45%",
  },

  signatureLine: {
    marginTop: 35,
    borderTopWidth: 1,
    borderTopColor: colours.dark,
    paddingTop: 5,
    textAlign: "center",
    fontSize: 9,
  },
});