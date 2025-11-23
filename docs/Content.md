# Content Update Instructions

## Modify Existing Content
- Edit MDX files under `apps/docs/content/**`.
- Update frontmatter (title, description) as needed.
- Use components from `fumadocs-ui/components/*` directly in MDX.

## Add New Content Types
- OpenAPI → MDX: use `fumadocs-openapi` to generate MDX from schemas.
- Custom components: register or import components into MDX pages.
- Inline TOC, callouts, tabs, steps available via `packages/ui/src/_registry/index.ts:339`.

## Data Structures
- Page tree is loaded via `fumadocs-core/source` and exposed to layouts; docs layout expects `tree` grouped by locale.
- i18n: set up locales and translations through `RootProvider` and `TreeContextProvider`.

## Best Practices
- Keep headings hierarchical (H1 page title, H2/H3 sections).
- Prefer MDX components over raw HTML.
- Keep content blocks short and scannable.
- Add images and code examples with descriptive alt text and titles.

## How to Add New Content

To add a new documentation page:

1.  **Create a File**: Navigate to `apps/docs/content/docs`.
2.  **Choose a Location**: Create a new `.mdx` file in the appropriate subdirectory (e.g., `apps/docs/content/docs/ui/my-new-page.mdx`).
3.  **Add Frontmatter**: At the top of your file, add the required frontmatter:

    ```mdx
    ---
    title: My New Page
    description: A description of what this page is about.
    ---
    ```

4.  **Write Content**: Write your content using Markdown and MDX components.

    ```mdx
    ## Introduction

    This is a new section.

    <Callout title="Tip">
      You can use components like this Callout!
    </Callout>
    ```

5.  **Verify**: Save the file. The development server (`pnpm dev`) will automatically detect the new file and add it to the sidebar navigation.