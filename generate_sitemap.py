import os
import datetime

# --- Configuration ---
# The site's base URL is passed as an environment variable from the GitHub workflow.
# Example: https://myusername.github.io/my-repo-name/
BASE_URL = os.environ.get('SITE_BASE_URL', 'https://localhost/')

def generate_sitemap(base_url, start_dir='.'):
    """
    Recursively scans the directory for HTML files and generates a sitemap.xml string.
    """
    urlset = []
    current_time = datetime.datetime.now().isoformat() + "+00:00"

    print(f"Scanning directory: {start_dir}")
    print(f"Using base URL: {base_url}")

    # Ensure base_url ends with a slash
    if not base_url.endswith('/'):
        base_url += '/'

    # Iterate through all files and directories starting from start_dir
    for root, _, files in os.walk(start_dir):
        # Skip the .git directory and the workflow directory
        if '.git' in root or '.github' in root:
            continue

        for file in files:
            if file.endswith('.html'):
                # 1. Determine the path relative to the repository root
                relative_path = os.path.join(root, file).replace('\\', '/')

                # Remove the initial './' if present
                if relative_path.startswith('./'):
                    relative_path = relative_path[2:]

                # 2. Convert the file path to the URL path
                if relative_path == 'index.html':
                    # The root index file maps to the base URL
                    loc = base_url
                else:
                    # Construct the full URL
                    # e.g., 'about/index.html' -> 'https://.../about/'
                    # e.g., 'terms.html' -> 'https://.../terms.html'
                    if file == 'index.html':
                        # For sub-directory index files, use the directory path
                        dir_path = os.path.dirname(relative_path)
                        loc = f"{base_url}{dir_path}/"
                    else:
                        loc = f"{base_url}{relative_path}"

                # Append the <url> block to the list
                urlset.append(f"""
    <url>
        <loc>{loc}</loc>
        <lastmod>{current_time}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>""")
                print(f"Found and mapped: {relative_path} -> {loc}")

    # Construct the final sitemap XML content
    sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {"".join(urlset)}
</urlset>"""

    return sitemap_content.strip()

def create_robots_txt():
    """
    Generates a basic robots.txt content, allowing all access and linking to the sitemap.
    """
    robots_content = f"""
User-agent: *
Allow: /

Sitemap: {BASE_URL}sitemap.xml
"""
    return robots_content.strip()

if __name__ == "__main__":
    # Generate sitemap.xml
    sitemap_xml_content = generate_sitemap(BASE_URL)
    with open('sitemap.xml', 'w') as f:
        f.write(sitemap_xml_content)
    print("\nsitemap.xml successfully generated.")

    # Generate robots.txt
    robots_txt_content = create_robots_txt()
    with open('robots.txt', 'w') as f:
        f.write(robots_txt_content)
    print("robots.txt successfully generated.")