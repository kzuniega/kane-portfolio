# Kane Zuniega — Portfolio

A single-page Next.js App Router portfolio with TypeScript and Tailwind CSS 4. Requires Node.js 20.9 or newer. No backend or animation dependencies.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Verify with `npm run lint`, `npm run typecheck`, and `npm run build`. Use `npm start` to serve the production build.

On screens below 1024px and on touch tablets, the header uses a right-side hamburger menu containing Work, About me, Contact, and labeled Light/Dark/System controls. A deliberate leftward swipe across non-interactive page content also opens it. Vertical scrolling, multi-touch, and browser-edge gestures are left alone. The drawer supports outside tap, Escape, a close button, and keyboard focus management. Selecting a section closes the drawer before scrolling and keeps the URL free of fragment suffixes.

Navigation jumps directly to each section with an offset for the actual header height. There is no animated scrolling or added section transition. Mobile navigation waits for the drawer's focus trap and scroll lock to release, with a fallback if its focus-restoration callback is delayed. The active section is indicated in the desktop header and mobile menu and updates during manual scrolling.

## Replace placeholders

| File | What to edit |
| --- | --- |
| `components/Hero.tsx` | Intro statement and role line. |
| `components/About.tsx` | About me introduction and static technology list with React Icons. The portrait uses `public/assets/profile-image.jpg`. |
| `public/resume/RESUME_ZUNIEGA.pdf` | Downloadable resume linked from About me. Replace this file to update the download. |
| `data/projects.ts` | Approved project titles, categories, short summaries, contribution details, technology tags, images, and optional `href`. |
| `public/assets/` | Approved project screenshots, `project-1.png` through `project-4.png`, referenced in the project data. |
| `data/contact.ts` | Email, LinkedIn and Facebook URLs, and footer name. |
| `app/layout.tsx` | Metadata title, description, real domain (`metadataBase`), and Open Graph copy. |
| `app/opengraph-image.tsx` | Social preview name, role, and image design. |

Change page colors in `app/globals.css`: the light palette is in `:root`, and the dark palette is in `:root[data-theme="dark"]`. Both use neutral grays for secondary text and borders. The header theme selector offers System, Light, and Dark. System is the default and follows live device appearance changes; a manual choice persists across reloads and syncs between tabs. `components/ThemeProvider.tsx` uses next-themes to apply the preference before the page paints, and a CSS media query follows the device theme when JavaScript is unavailable. Theme colors also cover the header, background grid, modal, scrollbar, and controls; project images retain their original colors. DM Sans is configured through `next/font/google` in `app/layout.tsx`; its initial build needs access to Google Fonts.

Selected Work shows only approved projects and explains that most work is covered by NDA. Keep new entries and screenshots within the approved material. Each project has a short introduction and native expandable contribution details that work with keyboard input and without JavaScript. JavaScript enhances the disclosure with a 420ms height-and-opacity animation in both directions, shortened to 150ms with reduced motion. Repeated clicks reverse from the current height, and open content adapts to screen resizing.

The gallery uses staggered, unequal-width projects on desktop, two equal columns with smaller offsets on tablet, and one column on phones. Screenshots fit inside 16:10 frames with `object-contain`. On desktop with a mouse, hovering enlarges the full preview by 5% and its image by another 6%, with a smooth 650ms transition. On screens below 1024px and on touch tablets, project images and the profile photo instead open in a shadcn/Radix Dialog; hover zoom is disabled. The dialog shows the uncropped image, adapts to its proportions and the viewport, locks background scrolling, and supports the close button, outside tap, Escape, and focus return. Opening uses a 300ms fade-and-scale animation; closing uses 180ms. Reduced motion uses a short fade. The adapted shadcn component lives in `components/ui/dialog.tsx`, with configuration in `components.json`. Supplying `href` retains the desktop project links; the title always links to the project. The footer email uses a clickable `mailto:` link.

A faint architectural grid adds depth behind the introduction. One sans-serif typeface, large headlines, simple text links, and generous spacing carry the design. The two tagline lines fade and slide in after a short page-load delay, then float in opposite directions by 12–14 pixels vertically and 8 pixels horizontally on 3.2- and 3.8-second cycles. With reduced motion, the tagline fades in without sliding and uses smaller 8-pixel vertical and 3-pixel horizontal movements; other animations and transitions are disabled. Content remains readable when JavaScript is disabled. Social links have visible labels and open in a new tab with accessible labels and keyboard focus indicators.

The visual direction draws on [Karen Tang’s portfolio design process](https://medium.com/design-bootcamp/how-i-designed-and-built-my-ux-ui-design-portfolio-in-30-days-be6f44d5f78b), [Nielsen Norman Group’s portfolio guidance](https://www.nngroup.com/articles/ux-design-portfolios/), and [its guidance on purposeful motion](https://www.nngroup.com/articles/animation-purpose-ux/): personal visual identity, scannable project summaries, clear next steps, and restrained interaction feedback.

## Contact form and visitor count setup

Copy `.env.example` to `.env.local` and fill in the Supabase project URL, Secret Key (`sb_secret_...`) as `SUPABASE_SECRET_KEY`, a private random `VIEWER_HASH_SECRET` of at least 32 characters, and the Brevo API key and verified sender details. Set `CONTACT_RECIPIENT_EMAIL` to the inbox that should receive messages. The Supabase Secret Key, Brevo key, and hash secret are server-only; do not rename them with a `NEXT_PUBLIC_` prefix or commit `.env.local`. The viewer endpoint still accepts the legacy `SUPABASE_SERVICE_ROLE_KEY` for existing local setups, but new setups should use the Secret Key.

Apply `supabase/migrations/20261118000000_daily_unique_visitors.sql` to the Supabase project (for example, in the Supabase SQL Editor) before enabling the visitor count. The app counts unique visitors per UTC day. It uses a keyed hash derived from the request IP and date; it does not store raw IP addresses, and records from previous days are pruned on the next visit. Keep `VIEWER_HASH_SECRET` stable across deployments. The deployed host or trusted reverse proxy must provide a trustworthy `x-forwarded-for` or `x-real-ip` header.

The contact form uses React Hook Form with a shared Zod schema for client- and server-side validation, sends sanitized rich-text messages through Brevo, and does not store submissions in Supabase. Brevo sender details must be configured and verified in Brevo before delivery will work.
