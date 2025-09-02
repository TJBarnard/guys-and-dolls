export function toEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    // Spotify
    if (u.hostname.includes("spotify")) {
      // Accept track/album/playlist/show/episode
      const path = u.pathname.replace(/^\//, "");
      const parts = path.split("/");
      const type = parts[0];
      const id = parts[1];
      if (type && id) return `https://open.spotify.com/embed/${type}/${id}`;
    }
    // YouTube (watch?v=, youtu.be, playlist)
    if (u.hostname.includes("youtube.com")) {
      if (u.searchParams.get("list")) {
        const list = u.searchParams.get("list");
        return `https://www.youtube.com/embed/videoseries?list=${list}`;
      }
      const vid = u.searchParams.get("v");
      if (vid) return `https://www.youtube.com/embed/${vid}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch (_) {
    return null;
  }
  return null;
}

export function EmbedFrame({ url, title }) {
  const embed = toEmbedUrl(url);
  if (!embed) return null;
  return (
    <iframe
      title={title || "Playlist"}
      src={embed}
      width="100%"
      height="100%"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
      style={{ display: "block" }}
    />
  );
} 