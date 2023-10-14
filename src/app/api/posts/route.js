import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// get posts from db
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const filter = searchParams.get("filter");
  const POST_PER_PAGE = +searchParams.get("items") || 2;
  const skip = POST_PER_PAGE * (page - 1) > 0 ? POST_PER_PAGE * (page - 1) : 0;
  const query = {
    take: POST_PER_PAGE,
    skip,
    where: {
      ...(cat && { catSlug: cat }),
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, POST_PER_PAGE, count }), {
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

// saving post in db
export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "Login to Create Post",
      }),
      {
        status: 401,
      }
    );
  }
  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: {
        ...body,
        desc: JSON.stringify(body.desc),
        userEmail: session.user.email,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Posted Successfully" }),
      {
        status: 200,
      }
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
