# Fix Errors in Services.tsx

## Plan:
- [x] Define Product interface
- [x] Fix implicit 'any' type for product parameter
- [x] Change `let sorted` to `const sorted`
- [x] Remove unused state variables
- [x] Replace `<img>` with Next.js `<Image>` component

## Completed:
- Added `Product` interface with proper type annotations
- Added type `Product` to `handleProductClick` parameter
- Removed unused state variables (`sortOrder`, `setSortOrder`, `sortDirection`, `setSortDirection`, `showAll`, `setShowAll`, `viewMode`, `setViewMode`)
- Removed `getSortedProducts` function (sorting functionality no longer needed)
- Replaced `<img>` with Next.js `<Image>` component with `fill` and `sizes` props
- Updated useEffect dependencies to empty arrays since sorting functionality was removed


