import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const client = await db.connect();

  try {
  } catch (err) {
    console.log(err);
    return NextResponse.json({message:"Somthing occured"});
  }

  return NextResponse.json({ message: "You callled this api" });
}
