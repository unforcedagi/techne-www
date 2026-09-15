export const site = {
  name: 'Techne',
  tagline: 'A community of practice, held in common.',
  vision: 'Toward an integrated society',
  publication: 'techne.coop',
  description: 'Writing and practice at the meeting of technology, community, and life.',
  introduction: 'Techne brings people together to practice a more thoughtful relationship with technology. We build tools, share what we learn, and tend the communities we are part of. Our writing is an invitation to explore how these things belong together.',
  entities: [
    { name: 'Techne Cooperative', placeholder: true, description: 'A place for shared practice: people working alongside one another, learning together, and shaping tools in common.' },
    { name: 'Techne Foundation', placeholder: true, description: 'A wider inquiry into technology in service of life, and the knowledge and relationships that can support it.' },
  ],
  hub: { name: 'Regen Hub', address: '1515 Walnut Street', city: 'Boulder, Colorado', url: 'https://regenhub.xyz/' },
  contact: 'https://techne.coop/participation/',
  rooms: [
    { name: 'Commonplace Book', url: 'https://techne.coop/commons/', description: 'Ideas, observations, and work in common.' },
    { name: 'Member intranet', url: 'https://techne.coop/intranet/', description: 'The everyday life of the cooperative.' },
    { name: 'Legal', url: 'https://techne.coop/legal/', description: 'The agreements that hold the work.' },
    { name: 'Participation', url: 'https://techne.coop/participation/', description: 'Find your way into the practice.' },
  ],
} as const;
