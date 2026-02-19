const svgDataUri = (label, color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
      <rect width="100%" height="100%" fill="${color}" />
      <text x="50%" y="50%" fill="#15161a" font-size="36" font-family="Space Grotesk, Arial" text-anchor="middle" dominant-baseline="middle">
        ${label}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const placeholderImages = [
  svgDataUri('Frame One', '#f0d9ff'),
  svgDataUri('Frame Two', '#d9f3ff'),
  svgDataUri('Frame Three', '#fff1cc'),
  svgDataUri('Frame Four', '#dff5e1')
];

export const demoProject = {
  title: 'Memoria Archive Demo',
  coupleNames: 'Ava & Liam',
  photos: placeholderImages.map((url, index) => ({
    id: `demo-${index}`,
    url,
    name: `Demo Photo ${index + 1}`,
    source: 'demo'
  })),
  memories: [
    {
      id: 'memory-1',
      title: 'First Dance',
      description: 'A slow dance under the string lights, just the two of us.'
    },
    {
      id: 'memory-2',
      title: 'Coastal Roadtrip',
      description: 'We chased the sunset for hours and sang every song on the playlist.'
    },
    {
      id: 'memory-3',
      title: 'Tiny Bookshop',
      description: 'Found a hidden bookshop and picked a novel for each other.'
    },
    {
      id: 'memory-4',
      title: 'Sunday Morning',
      description: 'Coffee, blankets, and the calm before another adventure.'
    }
  ]
};
