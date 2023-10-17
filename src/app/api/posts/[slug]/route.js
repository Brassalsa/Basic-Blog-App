import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

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

// delete post
export const DELETE = async (req, { params }) => {
  try {
    const { slug } = params;
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

    const posts = await prisma.post.delete({
      where: {
        userEmail: session.user.email,
        slug,
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

// update post
export const UPDATE = async (req, { params }) => {
  try {
    const { slug } = params;
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

    const posts = await prisma.post.update({
      where: {
        userEmail: session.user.email,
        slug,
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
