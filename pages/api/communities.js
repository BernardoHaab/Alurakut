import { SiteClient } from "datocms-client";

export default async function getRequest(req, res) {
  if (req.method === "POST") {
    const TOKEN = "414bcf212ec4052621f5ceb0d921cb";

    const client = new SiteClient(TOKEN);

    const record = await client.item.create({
      itemType: "980470",
      ...req.body,
    });

    res.json({
      record,
    });
  }
}
