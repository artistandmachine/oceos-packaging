# Website Templates

A one-page site where each section can switch between styles, so clients can pick and choose a look per section.

- **Nav:** the last link, **Style**, lists the nav styles.
- **Hero:** a floating glass bar (drag it by its grip) lists the hero styles.
- Picks are kept in the address (`?nav=oceos&hero=oceos-drift`), so a link opens with them.

```bash
npm install
npm run dev   # http://localhost:3002
```

Styles are registered in `sections/registry.ts`. Copy in `data/site.json`, look in `app/theme.css`, motion in `lib/tune.ts`. See `CLAUDE.md` for how to add a style.
