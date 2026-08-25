import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const courses = [
  'Data Science',
  'Cloud Computing',
  'Machine Learning',
  'Artificial Intelligence',
  'Design and Analysis of Algorithms',
  'Database Systems'
];

const Education = ({ }) => {
  return (
    <section id="education" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionHeader index="05" label="Education" title="Academic background" />

        <Reveal className="border-t border-b border-neutral-900 py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12">
          <div>
            <p className="text-sm font-mono text-neutral-500">2020 — 2024</p>
            <p className="mt-2 text-xs text-neutral-600">Air University, Islamabad</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">
              Bachelors in Science, Computer Science
            </h3>
            <p className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {courses.map(course => (
                <span
                  key={course}
                  className="px-3 py-1.5 text-sm text-neutral-300 border border-neutral-800 rounded-md"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Education;
