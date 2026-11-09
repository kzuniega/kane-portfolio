export function Hero() {
  return (
    <section aria-labelledby="intro-heading" className="hero-section page-shell">
      <div className="hero-field" aria-hidden="true" />
      <p className="eyebrow hero-kicker"><span aria-hidden="true">/</span> Software Engineer</p>
      <h1 id="intro-heading" className="display-heading">
        <span className="headline-line">
          <span className="headline-text">Complex systems.</span>
        </span>
        <span className="headline-line heading-secondary">
          <span className="headline-text">Simple experiences.</span>
        </span>
      </h1>
      <div className="hero-bottom">
        <p className="hero-intro">
          I love untangling tough problems.
          <span> Then making the complicated feel simple.</span>
        </p>
      </div>
    </section>
  );
}
