import { NextResponse } from 'next/server';

export async function GET() {
  const xsl = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                exclude-result-prefixes="sitemap image xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
          }
          th, td {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
          }
          th {
            background-color: #f8f9fa;
            font-weight: 600;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #0070f3;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .meta {
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <div class="meta">
          This is an XML Sitemap, meant for consumption by search engines.<br/>
          You can find more information about XML sitemaps on <a href="https://sitemaps.org">sitemaps.org</a>.
        </div>
        
        <!-- Sitemap Index -->
        <xsl:if test="//*[local-name()='sitemapindex']">
          <table>
            <thead>
              <tr>
                <th>Sitemap URL</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="//*[local-name()='sitemapindex']/*[local-name()='sitemap']">
                <tr>
                  <td><a href="{*[local-name()='loc']}"><xsl:value-of select="*[local-name()='loc']"/></a></td>
                  <td><xsl:value-of select="*[local-name()='lastmod']"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </xsl:if>
        
        <!-- URL Set -->
        <xsl:if test="//*[local-name()='urlset']">
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="//*[local-name()='urlset']/*[local-name()='url']">
                <tr>
                  <td><a href="{*[local-name()='loc']}"><xsl:value-of select="*[local-name()='loc']"/></a></td>
                  <td><xsl:value-of select="*[local-name()='lastmod']"/></td>
                  <td><xsl:value-of select="*[local-name()='changefreq']"/></td>
                  <td><xsl:value-of select="*[local-name()='priority']"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </xsl:if>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

  return new NextResponse(xsl, {
    status: 200,
    headers: {
      'Content-Type': 'text/xsl; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
