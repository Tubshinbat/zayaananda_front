import { getService } from "lib/services";

export default async function Head({ params }) {
  const { service } = await getService(params.id);

  return (
    <>
      <title> {(service && service.name) || "Барилгын хөгжлийн төв"} </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Zaya’s Ananda далд ухамсар, энерги мэдээлэл судалгааны төв, нийтийн далд ухамсарыг сэрээх төв"
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
