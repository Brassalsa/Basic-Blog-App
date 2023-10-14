import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const post = await prisma.post.findMany({
      orderBy: [
        {
          views: "desc",
        },
      ],
    });
    if (!post[0]) {
      return new NextResponse(null, {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(post[0]), {
      status: 200,
    });
  } catch (err) {
    if (err.code == "P2025") {
      return new NextResponse(JSON.stringify(null), {
        status: 404,
      });
    }
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        message: "Something went Wrong",
      }),
      {
        status: 500,
      }
    );
  }
};
