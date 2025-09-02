import React from 'react';
import { BookOpenIcon, GraduationCapIcon } from 'lucide-react';
const Education = ({
  darkMode
}) => {
  const courses = ['Data Science', 'Cloud Computing', 'Machine Learning', 'Artificial Intelligence', 'Design and Analysis Of Algorithms', 'Database Systems'];
  return <section id="education" className="py-20 px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">Education</h2>
          <div className="rounded-lg overflow-hidden bg-black border border-gray-700">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gray-900 text-white">
                  <GraduationCapIcon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Associate Degree in Computer Science
                  </h3>
                  <p className="text-gray-300">Air University, Islamabad</p>
                  <p className="text-sm text-gray-400">2020 – 2025</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpenIcon size={20} className="text-white" />
                  <h4 className="font-medium text-white">
                    Relevant Coursework
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courses.map((course, index) => <div key={index} className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300">
                      {course}
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Education;