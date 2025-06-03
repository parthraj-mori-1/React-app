// import React, { useEffect } from 'react';
// import AuthForm from '../components/AuthForm';
// import { deleteBucketContent } from '../api/api';

// const UploadPage = () => {
//   // Hardcoded bucket name here:
//   const bucketName = 'dovesoft-react-ap-south-1-029729715360';

//   useEffect(() => {
//     const deleteContent = async () => {
//       try {
//         await deleteBucketContent(bucketName);
//         console.log('Bucket contents deleted successfully');
//       } catch (error) {
//         console.log('Failed to delete bucket contents:', error);
//         // Optionally show toast notification or ignore
//       }
//     };

//     deleteContent();
//   }, [bucketName]);

//   return <AuthForm />;
// };

// export default UploadPage;

import React from 'react';
import AuthForm from '../components/AuthForm';

const UploadPage = () => {
  return (
    <AuthForm />
  );
};

export default UploadPage;

