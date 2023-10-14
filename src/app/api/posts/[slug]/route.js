import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(post), {
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
