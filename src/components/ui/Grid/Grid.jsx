'use client';

// Helper to join classes cleanly (you can use clsx or tailwind-merge if you have them)
const cn = (...classes) => classes.filter(Boolean).join(' ');

/* LOOKUP TABLES
  Required because Tailwind JIT cannot detect dynamic strings like "col-span-" + num 
*/
const rowCols = {
  1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4',
  5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12'
};
const mdRowCols = {
  1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4',
  5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12'
};
const lgRowCols = {
  1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 12: 'lg:grid-cols-12'
};

/* --- 2. COL CONFIGURATION --- */
// Maps for Child Spans (e.g. col-span-2)
const colSpans = {
  1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
  5: 'col-span-5', 6: 'col-span-6', 12: 'col-span-12', full: 'col-span-full'
};
// --- COMPONENTS ---

/**
 * Row Component
 * @param {number} cols - Mobile columns (default 12 for standard layout)
 * @param {number} md - Tablet columns
 * @param {number} lg - Desktop columns
 */
export const Row = ({ 
  children, 
  gap = 4, 
  cols = 12, // Default to standard 12-grid
  md, 
  lg, 
  className, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'grid',
        rowCols[cols],       // Mobile grid tracks
        md && mdRowCols[md], // Tablet grid tracks
        lg && lgRowCols[lg], // Desktop grid tracks
        `gap-${gap}`,
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export const Col = ({ children, span = 1, className, ...props }) => {
  // Note: I changed default span to 1. In a Gallery Grid, you usually span 1.
  // If using standard 12-col layout, you must specify span={12} etc.
  return (
    <div className={cn(colSpans[span], className)} {...props}>
      {children}
    </div>
  );
};