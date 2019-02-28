type Character = {
  [key:string]: string | string[]
}

export const data: Character[] = [
  {
    name: 'Peter Parker',
    alias: 'Spider-Man',
    description: 'N/A',
    avatarUrl: 'someAvatar.com',
    publisher: 'Marvel',
    abilities: [
      'wall-crawling',
      'agility',
      'spider-sense',
      'strength'
    ],
    powerLevel: 'Street Leveler'
  },
  {
    name: 'Dick Grayson',
    alias: 'Nightwing',
    description: 'N/A',
    avatarUrl: 'someAvatar.com',
    publisher: 'DC',
    abilities: [
      'agility',
      'detective',
      'acrobatics',
      'gadgets',
      'intellect',
      'stealth',
      'stamina'
    ],
    powerLevel: 'Street Leveler'
  },
  {
    name: 'John Stewart',
    alias: 'Green Lantern',
    description: 'N/A',
    avatarUrl: 'someAvatar.com',
    publisher: 'DC',
    abilities: [
      'willpower',
      'power-ring',
      'constructs',
      'flight',
      'speed',
      'durability'
    ],
    powerLevel: 'Powerhouse'
  }
];
