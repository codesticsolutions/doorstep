import os
import datetime

# --- Configuration ---
# The site's base URL is passed as an environment variable from the GitHub workflow.
# Since a custom domain is used, the workflow is configured to set this value.
BASE_URL = os.environ.get('SITE_BASE_URL', 'https://localhost/')

def generate_sitemap(base_url, start_dir='.'):
    """
    Recursively scans the directory for HTML files and generates a sitemap.xml string.
    Only includes files deemed relevant for SEO (i.e., excluding assets and utility files).
    """
    urlset = []
    # Use UTC for standard sitemap format
    current_time = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "+00:00")

    print(f"Scanning directory: {start_dir}")
    print(f"Using base URL: {base_url}")

    # Ensure base_url ends with a slash
    if not base_url.endswith('/'):
        base_url += '/'

    # Directories to explicitly exclude from the sitemap generation process,
    # as they contain non-indexable assets or build configurations.
    EXCLUDE_DIRS = ['.git', '.github', 'assets', '_posts'] # Assets and config/utility folders

    # Iterate through all files and directories starting from start_dir
    for root, dirs, files in os.walk(start_dir):
        # 1. Directory Exclusion Check
        # Modify the 'dirs' list in place to skip traversing unwanted subdirectories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

        # Skip the root directory itself if it's one of the excluded paths (e.g., if you run this from within 'assets')
        if any(excluded_dir in root.split(os.path.sep) for excluded_dir in EXCLUDE_DIRS):
            continue

        for file in files:
            if file.endswith('.html'):
                # 2. Determine the path relative to the repository root
                relative_path = os.path.join(root, file).replace('\\', '/')

                # Exclude paths that contain '@@' (like the previous temporary/error link)
                if '@@' in relative_path:
                    print(f"Skipping temporary/error link: {relative_path}")
                    continue
                
                # Exclude common utility/error files that shouldn't be indexed
                if file in ['404.html', 'robots.txt.html']: 
                    print(f"Skipping known utility file: {relative_path}")
                    continue

                # Remove the initial './' if present
                if relative_path.startswith('./'):
                    relative_path = relative_path[2:]

                # 3. Determine the canonical URL ('loc')
                if relative_path == 'index.html':
                    # The root index file maps to the base URL
                    loc = base_url
                else:
                    if file == 'index.html':
                        # For sub-directory index files, use the directory path (e.g., 'blog/index.html' -> 'blog/')
                        dir_path = os.path.dirname(relative_path)
                        loc = f"{base_url}{dir_path}/"
                    else:
                        # Strip the .html extension to create the clean URL
                        clean_path = relative_path.replace('.html', '')
                        loc = f"{base_url}{clean_path}"

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

if __name__ == "__main__":
    # Generate sitemap.xml
    sitemap_xml_content = generate_sitemap(BASE_URL)
    with open('sitemap.xml', 'w') as f:
        f.write(sitemap_xml_content)
    print("\nsitemap.xml successfully generated.")