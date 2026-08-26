# VINT — Team Workload Division

Working repository for the VINT wine store frontend, split into five areas so
each member has their own branch to develop on.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · React Hook Form + zod

---

## Branch structure

```
main                  Shared foundation — protected, only updated from Dev
 └── Dev              Integration branch — everyone's work merges here first
      ├── member/Maheli    Public / Home + Contact
      ├── member/rachel    Wine Catalogue
      ├── member/Nimna     Brand + Product Management
      ├── member/Rasadi    Ordering System
      └── member/Vihanga   Admin Management
```

Work flows **member branch → Dev → main**, through pull requests. Nobody
commits directly to `Dev` or `main`.

---

## Who owns what

| Member | Area | Routes owned | Components owned |
| --- | --- | --- | --- |
| **Maheli** | Public / Home + Contact | `/`, `/contact`, `404` | `ContactForm` |
| **Rachel** | Wine Catalogue | `/collection`, `/wines/[slug]` | `CollectionGrid`, `ProductDetails`, `FlavourProfile`, `PairingCard`, `Accordion` |
| **Nimna** | Brand + Product Management | `/our-story`, `/wine-glasses`, `/admin/products/*` | `ProductForm`, `ProductsTable`, `Fieldset`, `CtaBand` |
| **Rasadi** | Ordering System | `/order`, `/order-confirmation` | `OrderForm`, `OrderSummary`, `OrderConfirmation`, `Note` |
| **Vihanga** | Admin Management | `/admin`, `/admin/dashboard`, `/admin/orders/*`, `/admin/messages` | `AdminSidebar`, `OrdersTable`, `MessagesTable`, `StatCard`, `OrderStatusControl`, `DescriptionList` |

### Backend, later

| Member | Responsibility |
| --- | --- |
| Maheli | Contact submissions + featured/public data |
| Rachel | Product retrieval, search / filter / stock |
| Nimna | Product CRUD + categories |
| Rasadi | Customers + Orders + Order Items |
| Vihanga | Dashboard metrics + status / message management |

---

## The shared foundation

`main` carries everything more than one person needs. **Do not edit these on
your own branch** — a change here affects all five areas, so it goes through a
PR into `Dev` where everyone can see it.

| Path | What it is |
| --- | --- |
| `app/layout.tsx`, `app/globals.css` | Root layout and the Tailwind theme (all design tokens) |
| `app/(public)/layout.tsx`, `app/admin/layout.tsx` | The two route-group shells |
| `components/layout/` | Navbar, Footer, Container, Section, SkipLink, VintMark, SocialIcon |
| `components/ui/` | Button, Badge, StatusBadge, Eyebrow, Icon, Modal, Toast, Reveal, SectionHeading, FilterPills, QuantitySelector |
| `components/fields/` | FormInput, SelectInput, TextArea, FormGrid |
| `components/sections/` | HeroSection, FeatureCard, SplitPanel |
| `components/admin/` | AdminHeader, AdminSidebar, Panel, IconButton, AdminThumb, `adminStyles.ts` |
| `components/wine/WineCard.tsx` | Used by both Home and Collection |
| `types/`, `lib/`, `data/` | Shared types, `cn()`, zod schemas, all content |
| `public/` | Images |

> **Why these are shared:** each one is imported by two or more members' pages.
> If a component lived on one person's branch, the other four could not build.

---

## Getting started

```bash
git clone https://github.com/MaheliNavinduni/Web-Example-Repo.git
```

```bash
cd Web-Example-Repo && git checkout member/YOUR-NAME && npm install && npm run dev
```

Then open <http://localhost:3000>.

Your own pages will work. Pages belonging to other members return 404 on your
branch until their work is merged into `Dev` — that is expected, not a bug.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build — **run this before every push** |
| `npm run typecheck` | TypeScript only, no build. Fastest check while working. |
| `npm run check:css` | Reports Tailwind class names that produced no CSS |

`check:css` matters because Tailwind ignores a class it does not recognise
**without warning**. A typo like `text-mutted` simply does nothing.

---

## Daily workflow

```bash
git checkout member/YOUR-NAME && git pull origin Dev
```

Commit as you go — small, meaningful commits, not one large dump at the end:

```bash
git add . && git commit -m "feat(collection): add category filter pills"
```

```bash
git push origin member/YOUR-NAME
```

Then open a pull request **into `Dev`** on GitHub and ask a teammate to review.

### Commit message format

```
type(scope): short description in the imperative
```

| Type | Use for |
| --- | --- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Restructuring with no behaviour change |
| `style` | Formatting, spacing, visual-only tweaks |
| `docs` | Documentation |
| `chore` | Config, dependencies, tooling |

Examples:

```
feat(order): validate delivery address with zod
fix(navbar): close the mobile drawer after navigating
refactor(admin): extract the shared table cell classes
```

---

## House rules

1. **`main` and `Dev` must always build.** Run `npm run build` before you push.
2. **Stay in your own area.** Need a shared component changed? Raise it with the team rather than editing it on your branch.
3. **Content lives in `data/`.** Never type a price, product name or address directly into a component.
4. **Use theme steps, not raw values.** `p-6`, not `p-[23px]`. If no step fits, the theme needs a new one — discuss it.
5. **Keep the accessibility work.** Every control keeps its `<label>`, every icon-only button keeps its `aria-label`.
6. **Explain your own code.** You will be asked about it in the review, so understand anything you commit.
