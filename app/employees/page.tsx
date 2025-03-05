"use client"

import { useState, useEffect } from 'react';
import Loading from "@/components/ui/LoadingSpinner";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: boolean;
  };
}) => {
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || false;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your fetch logic
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h1 className="text-head">New Applicants</h1>
      </section>
  );
};

export default Page;
