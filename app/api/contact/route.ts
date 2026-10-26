import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, purpose, message } = data;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const inquiry = {
      id: Date.now().toString(),
      name,
      email,
      purpose: purpose || "general",
      message: message || "",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to data/inquiries.json so no leads or inquiries are ever lost
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "inquiries.json");
      let list = [];
      if (fs.existsSync(filePath)) {
        try {
          list = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch {
          list = [];
        }
      }
      list.push(inquiry);
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("[API] Failed to store inquiry to local disk:", fsErr);
    }

    // 2. Dispatch to FormSubmit email notification service for aditya.dev.pande@gmail.com
    try {
      await fetch("https://formsubmit.co/ajax/aditya.dev.pande@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://adityapande.dev/",
          Origin: "https://adityapande.dev",
        },
        body: JSON.stringify({
          _subject: `New Portfolio Inquiry [${purpose?.toUpperCase()}]: ${name}`,
          name,
          email,
          purpose,
          message: message || "No extra note provided",
          date: inquiry.createdAt,
        }),
      });
    } catch (notifyErr) {
      console.warn("[API] FormSubmit notification dispatch failed:", notifyErr);
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (err) {
    console.error("[API] Error handling contact submission:", err);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
