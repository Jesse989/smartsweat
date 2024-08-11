import { createClient } from '../supabase/client';
import * as tus from 'tus-js-client';

export async function uploadFile(
  bucketName: string,
  fileName: string,
  file: File,
  setUploadProgress: (progress: number) => void,
) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No session');
  }

  return new Promise((resolve, reject) => {
    var upload = new tus.Upload(file, {
      endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${session.access_token}`,
        'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
      metadata: {
        bucketName: bucketName,
        objectName: fileName,
        contentType: 'video/mp4',
        cacheControl: '3600',
      },
      chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
      onError: function (error) {
        console.log('Failed because: ' + error);
        reject(error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = (bytesUploaded / bytesTotal) * 100;
        setUploadProgress(percentage);
      },
      onSuccess: function () {
        resolve('Success!');
      },
    });

    // Check if there are any previous uploads to continue.
    return upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  });
}

export const getHeaderText = (status: string) => {
  switch (status) {
    case 'indexing':
      return "We're hard at work preparing your video to be analyzed!";
    case 'indexed':
      return 'Your video has been indexed and we are preparing to analyze it.';
    case 'analyzing':
      return 'Our AI is working hard to analyze this video and provide you with personalized insights.';
    case 'completed':
      return 'Here are your personalized results to help you further refine your exercise.';
    default:
      return 'Unknown status';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'indexing':
      return 'Indexing video...';
    case 'indexed':
      return 'Preparing video...';
    case 'analyzing':
      return 'Analyzing video...';
    case 'completed':
      return 'Analysis complete!';
    default:
      return 'Unknown status';
  }
};
