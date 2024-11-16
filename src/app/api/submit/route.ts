/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json();

      // Authenticate with Google Sheets API
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || ""),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      // Helper function to flatten nested objects
      const flattenObject = (obj: any, prefix = ""): string[] => {
        return Object.entries(obj).flatMap(([key, value]) => {
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
              return [`${newKey}: ${JSON.stringify(value)}`];
            }
            return flattenObject(value, newKey);
          }
          return [
            `${newKey}: ${value === null || value === "" ? "NA" : value}`,
          ];
        });
      };

      // Prepare the data for Google Sheets
      const values = [flattenObject(body)];

      // Append the data to the Google Sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: "Sheet1", // Update this to match your sheet name
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values,
        },
      });

      return NextResponse.json(
        { message: "Form data submitted successfully" },
        { status: 200 },
      );
    } catch (error) {
      console.error("Error submitting form data:", error);
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return NextResponse.json(
        { error: "Failed to submit form data", details: errorMessage },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
