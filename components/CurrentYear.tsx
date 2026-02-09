'use client';

import { useEffect, useState } from 'react';

const CurrentYear = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year ?? new Date().getFullYear()}</>;
};

export default CurrentYear;