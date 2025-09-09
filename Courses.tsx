import React, { useState, useMemo } from 'react';
import CourseCard from '../components/CourseCard';
import CoursesNearMe from '../components/CoursesNearMe';

interface Course {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  description?: string;
}

const courses: Course[] = [
  {
    id: '1',
    name: 'Sunnydale Golf Club',
    address: '123 Greenway Blvd, Miami, FL',
    imageUrl: '/images/course1.jpg',
    description: 'Beautiful 18-hole course with ocean views.',
  },
  {
    id: '2',
    name: 'Pine Hills Golf Resort',
    address: '456 Forest Rd, Orlando, FL',
    imageUrl: '/images/course2.jpg',
    description: 'Challenging course surrounded by pine trees.',
  },
  {
    id: '3',
    name: 'Pleasant View Resort',
    address: '789 Lakeview Ave, Orlando, FL',
    imageUrl: '/images/course3.jpg',
    description: 'Scenic 18-hole resort with lakes and trees.',
  },
];

const CoursesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'name-asc' | 'name-desc'>('name-asc');
  const [filterCity, setFilterCity] = useState<string>('All');

  const handleBookNow = (courseName: string) => {
    alert(`Booking for ${courseName} clicked!`);
  };

  // Filter + search + sort courses
  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // Filter by city (simple example based on address)
    if (filterCity !== 'All') {
      filtered = filtered.filter((course) =>
        course.address.toLowerCase().includes(filterCity.toLowerCase())
      );
    }

    // Search by name
    if (search.trim() !== '') {
      filtered = filtered.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by name
    filtered = filtered.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    return filtered;
  }, [search, sort, filterCity]);

  // Extract unique cities for filter dropdown
  const cities = Array.from(
    new Set(courses.map((course) => course.address.split(',').pop()?.trim() || ''))
  );

  return (
    <div className="p-6">
      {/* Courses Near Me Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-black">
          Courses Near Me
        </h2>
        <CoursesNearMe />
      </section>

      {/* Search / Sort / Filter */}
      <section className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/3"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as 'name-asc' | 'name-desc')}
          className="p-2 border rounded w-full sm:w-1/4"
        >
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>

        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/4"
        >
          <option value="All">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </section>

      {/* Courses Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mx-auto">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              name={course.name}
              address={course.address}
              imageUrl={course.imageUrl}
              description={course.description}
              onBookNow={() => handleBookNow(course.name)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
