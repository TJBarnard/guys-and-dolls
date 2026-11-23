import "./index.css";
import { campaigns } from "./data/campaigns";
import { EmbedFrame } from "./utils/embed";
import { useEffect, useState } from "react";
import { recordings } from "./data/recordings";

function App() {
  const [campaignId, setCampaignId] = useState(campaigns[0].id);
  const campaign = campaigns.find((item) => item.id === campaignId) ?? campaigns[0];
  const visibleRecordings = recordings.filter(
    (recording) => !recording.campaignId || recording.campaignId === campaign.id
  );
  const navLinks = [
    { href: "#party", label: "Party" },
    campaign.showWorld ? { href: "#world", label: "World" } : null,
    { href: "#soundtrack", label: "Soundtrack" },
    campaign.showRecordings ? { href: "#recordings", label: "Recordings" } : null,
  ].filter(Boolean);

  useEffect(() => {
    document.title = `${campaign.name} — Guys & Dolls`;
  }, [campaign.name]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.setProperty('--parallax-offset', `${yPos}px`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-vh-100 bg-paper text-ink">
      {/* Navigation */}
      <header className="sticky-top" style={{ zIndex: 1040 }}>
        <nav className="navbar navbar-expand-lg navbar-dark py-3 banner-gradient">
          <div className="container-fluid px-4 px-lg-5">
            <div className="navbar-brand d-flex align-items-center gap-3">
              <img 
                src="/d20.jpg" 
                alt="D20 Logo" 
                className="rounded-circle"
                style={{ width: '2.25rem', height: '2.25rem', objectFit: 'cover' }}
              />
              <span className="font-display fs-4 fw-bold text-primary">{campaign.name}</span>
            </div>
            
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-3">
                {navLinks.map((link) => (
                  <li key={link.href} className="nav-item">
                    <a className="nav-link hover:text-primary" href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <div className="campaign-bar">
          <div className="container-fluid px-4 px-lg-5 d-flex flex-wrap gap-2 py-3" role="tablist" aria-label="Campaigns">
            {campaigns.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === campaign.id}
                className={`campaign-tab ${item.id === campaign.id ? "active" : ""}`}
                onClick={() => setCampaignId(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Banner with optional background */}
      <section className="position-relative overflow-hidden vignette d-flex align-items-center" style={{ minHeight: '100vh' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 banner-gradient"></div>
        {/* Drop an image at public/hero.jpg to enable background */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 opacity-25 parallax-slow"
          style={{ backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="container position-relative py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7 text-center">
              <h1 className="font-display display-1 fw-bold text-primary drop-shadow mb-4">{campaign.name}</h1>
              <p className="lead text-light mb-5 opacity-75">{campaign.blurb}</p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a href="#party" className="btn btn-outline-light btn-lg glass shadow-luxe">Meet the Party</a>
                {campaign.showWorld && (
                  <a href="#world" className="btn btn-outline-light btn-lg glass shadow-luxe">Explore the World</a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating scroll cue arrow */}
        <div className="scroll-cue position-absolute bottom-0 start-50 translate-middle-x mb-4" />
      </section>

      {/* Party Section */}
      <section id="party" className="py-5 py-lg-6">
        <div className="container px-4 px-lg-5">
          <div className="row">
            <div className="col-lg-8 col-xl-6">
              <h2 className="font-display display-4 text-primary mb-3">{campaign.partyHeading}</h2>
            </div>
          </div>
          <div className="row g-4">
            {campaign.members.map((c) => (
              <div key={c.id} className="col-sm-6 col-lg-4">
                <article className="card glass shadow-luxe border-0 h-100">
                  <div className="card-img-top position-relative bg-dark bg-opacity-30" style={{ aspectRatio: '16/10' }}>
                    {c.image ? (
                      <img src={c.image} alt={c.name || c.player} className="w-100 h-100 object-fit-cover" />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">Portrait coming soon</div>
                    )}
                  </div>
                  <div className="card-body p-4">
                    <h3 className="font-display h4 text-primary mb-1">{c.name || "Unnamed"}</h3>
                    {c.player && <p className="text-secondary small mb-3">Played by {c.player}</p>}
                    {c.bio && <p className="card-text text-dark opacity-90">{c.bio}</p>}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {campaign.showWorld && campaign.world && (
      <section id="world" className="py-5 py-lg-6">
        <div className="container px-4 px-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="font-display display-4 text-primary mb-4">{campaign.world.title}</h2>
              <p className="lead text-light opacity-75 mb-4">{campaign.world.description}</p>
              {campaign.world.points.length > 0 && (
                <ul className="list-unstyled text-muted">
                  {campaign.world.points.map((point) => (
                    <li key={point} className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>{point}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-lg-6">
              {campaign.world.image ? (
                <>
                  <a href={campaign.world.image} target="_blank" rel="noreferrer" className="d-block rounded-4 overflow-hidden glass shadow-luxe">
                    <img src={campaign.world.image} alt={`${campaign.name} map`} className="w-100 h-auto transition-transform duration-300 group-hover:scale-[1.02]" />
                  </a>
                  <p className="text-muted small mt-3">Tip: Click the map to open in a new tab.</p>
                </>
              ) : (
                <div className="rounded-4 glass shadow-luxe d-flex align-items-center justify-content-center text-muted p-5" style={{ minHeight: "16rem" }}>
                  No map for this campaign yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Soundtrack Section (per character) */}
      <section id="soundtrack" className="py-5 py-lg-6">
        <div className="container px-4 px-lg-5">
          <div className="row">
            <div className="col-lg-8 col-xl-6">
              <h2 className="font-display display-4 text-primary mb-3">Soundtrack</h2>
              <p className="lead text-muted mb-5">{campaign.soundtrackIntro}</p>
            </div>
          </div>
          <div className="row g-4">
            {campaign.members.map((c) => (
              <div key={c.id} className="col-lg-4">
                <div className="card glass shadow-luxe border-0 h-100">
                  <div className="card-header bg-transparent border-bottom border-white border-opacity-10 p-4">
                    <h3 className="font-display h5 text-primary mb-1">{c.name || "Unnamed"}</h3>
                    {c.player && <p className="text-muted small mb-0">Played by {c.player}</p>}
                  </div>
                  <div className="card-body p-0">
                    <div className="ratio ratio-16x9 bg-dark bg-opacity-30">
                      {c.playlistUrl ? (
                        <EmbedFrame url={c.playlistUrl} title={`${c.name} playlist`} />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center text-muted">
                          <div className="text-center">
                            <i className="bi bi-music-note-beamed fs-1 mb-2"></i>
                            <p className="small">Add a playlist URL to show the embed</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {campaign.showRecordings && (
      <section id="recordings" className="py-5 py-lg-6">
        <div className="container px-4 px-lg-5">
          <div className="row">
            <div className="col-lg-8 col-xl-6">
              <h2 className="font-display display-4 text-primary mb-3">Recordings</h2>
              <p className="lead text-muted mb-5">Drop MP3/M4A files into <code>public/recordings/</code> or paste external links in <code>src/data/recordings.js</code>.</p>
            </div>
          </div>
          <div className="row g-4">
            {visibleRecordings.length === 0 && (
              <div className="col-12 text-center text-muted">No recordings listed yet.</div>
            )}
            {visibleRecordings.map((r) => (
              <div key={r.id} className="col-md-6 col-lg-4">
                <div className="card glass shadow-luxe border-0 h-100">
                  <div className="card-body p-4">
                    <h3 className="font-display h5 text-primary mb-1">{r.title}</h3>
                    {r.date && <p className="text-muted small mb-3">{new Date(r.date).toLocaleDateString()}</p>}
                    {r.type === 'audio' ? (
                      <audio controls className="w-100">
                        {r.url?.toLowerCase().endsWith('.m4a') ? (
                          <source src={r.url} type="audio/mp4" />
                        ) : r.url?.toLowerCase().endsWith('.mp3') ? (
                          <source src={r.url} type="audio/mpeg" />
                        ) : (
                          <source src={r.url} />
                        )}
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      <a href={r.url} target="_blank" rel="noreferrer" className="btn btn-outline-light glass shadow-luxe mt-2">Open Recording</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Footer */}
      <footer className="py-4 mt-5 border-top border-white border-opacity-10">
        <div className="container px-4 px-lg-5">
          <div className="text-center">
            <p className="text-muted mb-0">
              © 2025 Guys And Dolls DND Campaign. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
