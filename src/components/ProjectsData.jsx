// OPTIMIZATION: Removed 'import React' as this is just a data file.
// This reduces unnecessary dependencies in this specific module.

import cola from '../assets/images/cola.png';
import strikr from '../assets/images/strikr.png';

const projects = [
  {
    id: 1,
    name: "Strike Website",
    category: "Frontend", // Added category
    image: strikr,
    link: "https://strikecoderarmy-4ob8.vercel.app/"
  },
  {
    id: 2,
    name: "Soft Drink Landing Page",
    category: "UI/UX Design", // Added category
    image: cola,
    link: "https://cofeewebsite-five.vercel.app/"
  },
  {
    id: 3,
    name: "DSA Visualizer",
    category: "Algorithms", // Added category
    // NOTE: For production, try to use a compressed local image instead of a 4K external URL
    // to prevent slow loading on mobile data.
    image: "https://4kwallpapers.com/images/walls/thumbs_2t/9324.jpg",
    link: "https://dsavisualizer.com"
  }
];

export default projects;