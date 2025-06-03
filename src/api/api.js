import axios from 'axios';

export const getPresignedUrl = async (username, password, filename) => {
  const response = await axios.post(
    'https://rgkt7dbkjg.execute-api.ap-south-1.amazonaws.com/Stage/document_upload',
    { filename },
    {
      auth: { username, password },
    }
  );
  return response.data; // { presigned_url, doc_id }
};

export const uploadFileToS3 = async (presignedUrl, file) => {
  await axios.put(presignedUrl, file, {
    headers: { 'Content-Type': 'application/pdf' },
  });
};

export const triggerFaiss = async () => {
  await axios.get('https://rgkt7dbkjg.execute-api.ap-south-1.amazonaws.com/Stage/Textract');
};

export const getStatus = async (docId) => {
  const response = await axios.post('https://rgkt7dbkjg.execute-api.ap-south-1.amazonaws.com/Stage/document_status', { doc_id: docId });
  return response.data.status;
};

export const sendQuestion = async (docId, question) => {
  const response = await axios.post('https://rgkt7dbkjg.execute-api.ap-south-1.amazonaws.com/Stage/generate_chat', {
    doc_id: docId,
    query: question,
  });
  return response.data.answer;
};

export const deleteBucketContent = async (bucketName) => {
  try {
    const response = await axios.post('https://rgkt7dbkjg.execute-api.ap-south-1.amazonaws.com/Stage/delete-function', { bucket_name: bucketName });
    console.log("Deleted Successfully")
    return response.data;
  } catch (error) {
    console.error('Failed to delete bucket content:', error);
    throw error;
  }
};
