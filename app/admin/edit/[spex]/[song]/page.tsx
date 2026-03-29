import { getGroup, getGroups } from "@/app/util"
import EditableSong from "./EditableSong";


export async function generateStaticParams() {
  const groups = await getGroups();

  const songs = groups.map(group => group.data.songs.map(song => ({spex: group.id, song: song.id, edition: song.edition}))).flat();

  return songs.map((song) => ({
    spex: encodeURIComponent(song.spex),
    song: encodeURIComponent(song.song)
  }))
}


// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: {params: Promise<{spex: string, song: string}>}) {
  const { spex, song } = await params;

  const spexData = await getGroup(spex);

  const songData = spexData!.songs.find((s) => s.id.toLowerCase() == song.toLowerCase())!;

  return (
    <EditableSong spexID={spex} spex={spexData!} song={songData} />
  )
}