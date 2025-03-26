import { createClient } from 'microcms-js-sdk';

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

/**
 * Get all content IDs from a specified endpoint
 * @param {Object} options - Options for the request
 * @param {string} options.endpoint - The endpoint to get content IDs from
 * @returns {Promise<string[]>} - A promise that resolves to an array of content IDs
 */
client.getAllContentIds = async function({ endpoint }) {
  try {
    // Get all content with only the ID field
    const response = await this.get({
      endpoint,
      queries: {
        fields: 'id',
        limit: 100, // Adjust this limit as needed
      },
    });

    // Extract and return the IDs
    return response.contents.map(content => content.id);
  } catch (error) {
    console.error('Error fetching content IDs:', error);
    return [];
  }
};
