import { getGroup, getGroups } from "@/app/util"
import Spex from "./spex";

export async function generateStaticParams() {
  const groups = await getGroups();

  return groups.map((group) => ({
    spex: group.id
  }))
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: {params: Promise<{spex: string}>}) {
  const { spex } = await params;

  const spexData = await getGroup(spex);

  // TODO: Real error
  if(spexData == undefined) return "Something has gone wrong.";

  return <Spex spex={spexData} spexID={spex}/>
}