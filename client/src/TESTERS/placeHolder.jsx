import React, { useState, useEffect } from 'react';

const useFetchPrivilege = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/v1/users/privilege');
        
          const data = await response.json();
          setData(data);
        
          
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Usage
const Component = () => {
  const { data, loading, error } = useFetchPrivilege();

  if (loading) return 'Loading...';
  if (error) return 'Error!';
    console.log(loading)
  return (
    <div>
      {data}
    </div>
  );
};
export default  Component;
