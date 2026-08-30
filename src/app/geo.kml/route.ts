export async function GET() {
  const geoRSS = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
  <Document>
    <atom:author>
      <atom:name>Mujahid Siyam (Mujaa / mujaaco)</atom:name>
    </atom:author>
    <Placemark>
      <name>Mujahid Siyam (Mujaa / mujaaco) | Software & AI Engineer</name>
      <description>Mujahid Siyam, also known as Mujaa (mujaaco), is a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist building AI-first systems and creative technology. Based in France — global reach.</description>
      <atom:link href="https://mujaaco.com"/>
      <Point>
        <coordinates>1.888334,46.603354,0</coordinates>
      </Point>
    </Placemark>
  </Document>
</kml>`;

  return new Response(geoRSS, {
    headers: {
      "Content-Type": "application/vnd.google-earth.kml+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
