import Image from 'next/image';
import React from 'react';
import { parse } from 'node-html-parser';

/**
 * Parses HTML content and replaces img tags with Next.js Image components
 * @param {string} htmlContent - The HTML content to parse
 * @returns {React.ReactNode} - The parsed content with img tags replaced with Next.js Image components
 */
export function parseHtmlContent(htmlContent) {
  if (!htmlContent) return null;

  // Parse the HTML content
  const root = parse(htmlContent);
  
  // Find all img tags
  const imgElements = root.querySelectorAll('img');
  
  // Replace each img tag with a placeholder
  imgElements.forEach((img, index) => {
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || '';
    const width = parseInt(img.getAttribute('width') || '800', 10);
    const height = parseInt(img.getAttribute('height') || '600', 10);
    
    // Replace the img tag with a placeholder
    img.replaceWith(`<img-placeholder data-index="${index}" data-src="${src}" data-alt="${alt}" data-width="${width}" data-height="${height}" />`);
  });
  
  // Get the modified HTML content
  const modifiedHtml = root.toString();
  
  // Split the HTML content by img-placeholder tags
  const parts = modifiedHtml.split(/<img-placeholder[^>]*>/);
  const imgPlaceholders = modifiedHtml.match(/<img-placeholder[^>]*>/g) || [];
  
  // Create an array to hold the React elements
  const reactElements = [];
  
  // Add the first part of the HTML content
  if (parts[0]) {
    reactElements.push(<div key="part-0" dangerouslySetInnerHTML={{ __html: parts[0] }} />);
  }
  
  // Add the img-placeholder tags and the remaining parts of the HTML content
  imgPlaceholders.forEach((placeholder, index) => {
    // Extract the data attributes from the placeholder
    const dataIndex = placeholder.match(/data-index="([^"]*)"/)?.[1];
    const dataSrc = placeholder.match(/data-src="([^"]*)"/)?.[1];
    const dataAlt = placeholder.match(/data-alt="([^"]*)"/)?.[1] || '';
    const dataWidth = parseInt(placeholder.match(/data-width="([^"]*)"/)?.[1] || '800', 10);
    const dataHeight = parseInt(placeholder.match(/data-height="([^"]*)"/)?.[1] || '600', 10);
    
    // Add the Next.js Image component
    reactElements.push(
      <div key={`img-${dataIndex}`} style={{ width: '100%', textAlign: 'center' }}>
        <Image
          src={dataSrc}
          alt={dataAlt}
          width={dataWidth}
          height={dataHeight}
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
    );
    
    // Add the next part of the HTML content
    if (parts[index + 1]) {
      reactElements.push(<div key={`part-${index + 1}`} dangerouslySetInnerHTML={{ __html: parts[index + 1] }} />);
    }
  });
  
  return <>{reactElements}</>;
}
