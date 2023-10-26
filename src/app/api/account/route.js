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

    const postCount = await prisma.post.count({
      where: {
        userEmail: session.user.email,
      },
    });

    return new NextResponse(postCount, {
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

// delete account
export const DELETE = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "Login to delete Account",
      }),
      {
        status: 401,
      }
    );
  }

  try {
    const body = await req.json();
    const { email } = await body;
    console.log(session.user.email);
    if (email.toLowerCase() === session.user.email.toLowerCase()) {
      await prisma.user.delete({
        where: {
          email: session.user.email,
        },
      });
    } else {
      return new NextResponse(
        JSON.stringify({
          error: "Wrong Email",
        }),
        {
          status: 403,
        }
      );
    }

    return new NextResponse(JSON.stringify("Deleted Successfully!"), {
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
