import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// get post comments
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postSlug,
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

    return new NextResponse(
      JSON.stringify(comments, {
        status: 200,
      })
    );
  } catch (err) {
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

// Post Comment
export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "Login to post Comment",
      }),
      {
        status: 401,
      }
    );
  }

  try {
    const body = await req.json();

    const comment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
    });

    return new NextResponse(JSON.stringify("Posted Successfully!"), {
      status: 200,
    });
  } catch (err) {
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
