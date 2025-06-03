import axios from 'axios';

export const getPresignedUrl = async (username, password, filename) => {
  const response = await axios.post(
    process.env.REACT_APP_CHAT_UPLOAD_URL,
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
  await axios.get(process.evn.REACT_APP_CHAT_TEXTRACT_URL);
};

export const getStatus = async (docId) => {
  const response = await axios.post(process.env.REACT_APP_CHAT_PROCESS_URL, { doc_id: docId });
  return response.data.status;
};

export const sendQuestion = async (docId, question) => {
  const response = await axios.post(process.env.REACT_APP_CHAT_URL, {
    doc_id: docId,
    query: question,
  });
  return response.data.answer;
};

export const deleteBucketContent = async (bucketName) => {
  try {
    const response = await axios.post(process.env.REACT_APP_CHAT_DELETE_URL, { bucket_name: bucketName });
    console.log("Deleted Successfully")
    return response.data;
  } catch (error) {
    console.error('Failed to delete bucket content:', error);
    throw error;
  }
};
