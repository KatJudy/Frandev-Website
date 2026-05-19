# FCI Website CMS

This folder now includes a very small local CMS for editing the website without touching code.

## Start the CMS

Open Terminal in this folder and run:

```bash
npm start
```

Then open:

```text
http://localhost:4310/admin
```

## Preview the website

Use:

```text
http://localhost:4310/
```

## What to upload to GitHub

Upload the whole folder, including:

- `index.html`
- `site-content.js`
- `content.json`
- `assets/`
- `cms/`
- `package.json`

The public website reads from `content.json`. The CMS server is only for making local edits and saving updates.

## Backups

Each time the CMS saves content, it also writes a simple backup file:

```text
content.backup.json
```
