import os, datetime

BASE_URL = os.environ.get("SITE_BASE_URL", "https://localhost/")
if not BASE_URL.endswith("/"):
    BASE_URL += "/"

EXCLUDE_DIRS = {".git", ".github", "assets", "_posts"}
EXCLUDE_FILES = {"404.html", "robots.txt.html"}

NOW = datetime.datetime.now(datetime.timezone.utc).isoformat()

def priority(loc, base):
    l = loc.rstrip("/")
    b = base.rstrip("/")
    if l == b + "/services":
        return "1.0", "weekly"
    if l == b:
        return "0.9", "weekly"
    if l == b + "/about" or l == b + "/contact":
        return "0.8", "monthly"
    return "0.7", "weekly"

def generate_sitemap(start="."):
    out = []
    walk = os.walk

    for root, dirs, files in walk(start):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        if any(d in root for d in EXCLUDE_DIRS):
            continue

        for f in files:
            if not f.endswith(".html") or f in EXCLUDE_FILES:
                continue

            path = os.path.join(root, f).replace("\\", "/")
            if "@@" in path:
                continue
            if path.startswith("./"):
                path = path[2:]

            if path == "index.html":
                loc = BASE_URL
            elif f == "index.html":
                loc = BASE_URL + path[:-10] + "/"
            else:
                loc = BASE_URL + path[:-5]

            p, c = priority(loc, BASE_URL)
            out.append(
                f"<url><loc>{loc}</loc><lastmod>{NOW}</lastmod>"
                f"<changefreq>{c}</changefreq><priority>{p}</priority></url>"
            )

    return (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        + "".join(out) +
        "</urlset>"
    )

if __name__ == "__main__":
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(generate_sitemap())
