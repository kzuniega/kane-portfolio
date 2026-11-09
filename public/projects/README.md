# Project images

Add images here using lowercase, hyphenated names: project-01.jpg, project-02.jpg, project-03.jpg, project-04.jpg. Prefer 1600 × 900 pixels (16:9). JPG, PNG, WebP and AVIF work with next/image.

Then add an image object to the matching entry in data/projects.ts:

```ts
image: { src: "/projects/project-01.jpg", alt: "Describe the actual project image" },
```

Images render above each description and are cropped to 16:9. Missing image data renders the neutral placeholder. Only reference files after adding them. Add href to a project to display its optional View project link; omit href until a real URL is available.
