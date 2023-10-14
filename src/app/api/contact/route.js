import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log(data);
    return new NextResponse("Ok", {
      status: 200,
    });
  } catch (e) {
    return new NextResponse(
      {
        message: e.toString(),
      },
      {
        status: 500,
      }
    );
  }
};
