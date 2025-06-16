export interface Activity {
  id: string;
  name: string;
  phase: 'Empathize' | 'Define' | 'Ideate' | 'Prototype' | 'Test';
  duration: number; // in minutes
  description: string;
  materials: string[];
  instructions: string[];
  tips: string[];
  ageGroup: 'Elementary School' | 'Middle School' | 'High School' | 'Both';
}

export const activities: Activity[] = [
  {
    id: 'empathy-interview',
    name: 'Empathy Interview',
    phase: 'Empathize',
    duration: 30,
    description: 'Students conduct interviews to understand their users\' needs and experiences.',
    materials: [
      'Interview questions template',
      'Notebooks or tablets',
      'Recording device (optional)'
    ],
    instructions: [
      'Prepare 5-7 open-ended questions',
      'Pair students up',
      'Conduct 10-minute interviews',
      'Take notes on key insights',
      'Share findings with the class'
    ],
    tips: [
      'Encourage "why" questions',
      'Remind students to listen more than talk',
      'Have students practice active listening'
    ],
    ageGroup: 'Both'
  },
  {
    id: 'how-might-we',
    name: 'How Might We...',
    phase: 'Define',
    duration: 20,
    description: 'Students reframe problems into opportunities using "How Might We" questions.',
    materials: [
      'Sticky notes',
      'Whiteboard or large paper',
      'Markers'
    ],
    instructions: [
      'Review insights from empathy phase',
      'Write down key problems identified',
      'Transform each problem into a "How Might We" question',
      'Vote on the most promising questions'
    ],
    tips: [
      'Keep questions broad enough for multiple solutions',
      'Make questions specific enough to be actionable',
      'Encourage creative reframing'
    ],
    ageGroup: 'Both'
  },
  {
    id: 'crazy-8s',
    name: 'Crazy 8s',
    phase: 'Ideate',
    duration: 15,
    description: 'A fast-paced ideation technique where students sketch 8 ideas in 8 minutes.',
    materials: [
      'Paper (folded into 8 sections)',
      'Pens or pencils',
      'Timer'
    ],
    instructions: [
      'Fold paper into 8 sections',
      'Set timer for 8 minutes',
      'Sketch one idea per section',
      'Share ideas with the group',
      'Vote on favorite concepts'
    ],
    tips: [
      'Encourage quantity over quality',
      'Remind students that sketches can be rough',
      'Keep the energy high and fun'
    ],
    ageGroup: 'Both'
  },
  {
    id: 'prototype-challenge',
    name: 'Rapid Prototype Challenge',
    phase: 'Prototype',
    duration: 45,
    description: 'Students build quick, low-fidelity prototypes of their solutions using everyday materials.',
    materials: [
      'Cardboard',
      'Paper',
      'Tape',
      'Scissors',
      'Markers',
      'Any available craft materials'
    ],
    instructions: [
      'Review selected solution',
      'Gather materials',
      'Build a physical prototype',
      'Test with classmates',
      'Iterate based on feedback'
    ],
    tips: [
      'Focus on the core functionality',
      'Use simple materials',
      'Encourage experimentation'
    ],
    ageGroup: 'Both'
  },
  {
    id: 'feedback-gallery',
    name: 'Feedback Gallery',
    phase: 'Test',
    duration: 30,
    description: 'Students present their prototypes and gather structured feedback from peers.',
    materials: [
      'Prototypes',
      'Feedback forms',
      'Sticky notes',
      'Markers'
    ],
    instructions: [
      'Set up prototypes around the room',
      'Students rotate through each prototype',
      'Provide written feedback',
      'Share feedback with creators',
      'Discuss improvements'
    ],
    tips: [
      'Structure feedback with "I like...", "I wish...", "What if..."',
      'Encourage constructive criticism',
      'Focus on the solution, not the person'
    ],
    ageGroup: 'Both'
  }
] 