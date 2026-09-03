import { getGroup, getGroups } from "@/app/util";
import EditableSpex from "./EditableSpex";
import Link from "next/link";

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

  return (
    <>
      <br />
      <Link href={`/admin/`}>Back to the Admin page</Link>
      <EditableSpex spex={spexData!} spexID={spex}/>
    </>
  )
}