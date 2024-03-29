import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Joke } from "@prisma/client";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });

  if (!joke) throw new Error("Joke not found");
  const data: LoaderData = { joke };
  return json(data);
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}
