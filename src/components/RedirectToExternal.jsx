import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToExternal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = 'https://aquamarine-swan-4add7d.netlify.app/';
  }, [navigate]);

  return null; // This component does not render anything
};

export default RedirectToExternal;
