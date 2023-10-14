import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse(
        JSON.stringify({
          message: "Please Login first",
        }),
        {
          status: 401,
        }
      );
    }

    const posts = await prisma.post.findMany({
      where: {
        userEmail: session.user.email,
      },
    });

    return new NextResponse(JSON.stringify(posts), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
};
