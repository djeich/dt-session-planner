import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Tab = 'overview' | 'examples' | 'case-studies'

const caseStudies = [
  {
    title: 'Elementary School Design Challenge',
    description: 'Students redesigned their school playground using design thinking',
    phases: [
      {
        phase: 'Empathize',
        activity: 'Students interviewed younger students about their playground needs'
      },
      {
        phase: 'Define',
        activity: 'Identified key problems: lack of shade and seating areas'
      },
      {
        phase: 'Ideate',
        activity: 'Brainstormed solutions including tree houses and reading nooks'
      },
      {
        phase: 'Prototype',
        activity: 'Created cardboard models of their playground designs'
      },
      {
        phase: 'Test',
        activity: 'Presented designs to school administration and received feedback'
      }
    ],
    outcome: 'School implemented several student-designed features in the new playground'
  },
  {
    title: 'Middle School Community Project',
    description: 'Students addressed local environmental concerns',
    phases: [
      {
        phase: 'Empathize',
        activity: 'Conducted community surveys about recycling habits'
      },
      {
        phase: 'Define',
        activity: 'Found that many residents were confused about recycling rules'
      },
      {
        phase: 'Ideate',
        activity: 'Developed ideas for educational campaigns and better signage'
      },
      {
        phase: 'Prototype',
        activity: 'Created sample recycling guides and signs'
      },
      {
        phase: 'Test',
        activity: 'Piloted the guides in a few neighborhoods'
      }
    ],
    outcome: 'City adopted the student-designed recycling guide for wider distribution'
  }
]

const visualExamples = {
  Empathize: [
    {
      title: 'User Interviews',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500',
      description: 'Students conducting interviews to understand user needs'
    },
    {
      title: 'Observation Notes',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
      description: 'Documenting observations and insights'
    }
  ],
  Define: [
    {
      title: 'Problem Statements',
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500',
      description: 'Writing clear problem statements based on research'
    },
    {
      title: 'User Journey Maps',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
      description: 'Mapping user experiences to identify pain points'
    }
  ],
  Ideate: [
    {
      title: 'Brainstorming Session',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
      description: 'Group brainstorming with sticky notes'
    },
    {
      title: 'Mind Mapping',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
      description: 'Creating mind maps to explore ideas'
    }
  ],
  Prototype: [
    {
      title: 'Paper Prototypes',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500',
      description: 'Quick paper prototypes to test ideas'
    },
    {
      title: 'Digital Mockups',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500',
      description: 'Creating digital versions of solutions'
    }
  ],
  Test: [
    {
      title: 'User Testing',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
      description: 'Testing solutions with real users'
    },
    {
      title: 'Feedback Collection',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
      description: 'Gathering and analyzing user feedback'
    }
  ]
}

export function EducationalContent() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeTab === 'examples'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Visual Examples
        </button>
        <button
          onClick={() => setActiveTab('case-studies')}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeTab === 'case-studies'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Case Studies
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">Design Thinking in Education</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Design Thinking is a powerful approach to problem-solving that helps students develop essential skills
                like empathy, critical thinking, and creativity. It's particularly effective in education because it:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">Encourages student-centered learning</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">Promotes collaboration and teamwork</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">Develops real-world problem-solving skills</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">Builds confidence through hands-on experience</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="leading-relaxed">Fosters innovation and creativity</span>
                </li>
              </ul>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Tips for Teachers</h4>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">Start with simple, relatable problems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">Encourage wild ideas during ideation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">Use physical materials for prototyping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">Celebrate failures as learning opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">Connect projects to real-world contexts</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">Visual Examples by Phase</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(visualExamples).map(([phase, examples]) => (
                  <div key={phase} className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-800 leading-tight">{phase}</h4>
                    {examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={example.image}
                          alt={example.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h5 className="font-semibold text-gray-900 mb-2 leading-tight">{example.title}</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{example.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'case-studies' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">Success Stories</h3>
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">{study.title}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{study.description}</p>
                  <div className="space-y-4">
                    {study.phases.map((phase, phaseIndex) => (
                      <div key={phaseIndex} className="flex items-start space-x-4">
                        <div className="w-24 flex-shrink-0">
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {phase.phase}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed flex-1">{phase.activity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="font-semibold text-green-600 leading-relaxed">Outcome: {study.outcome}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 