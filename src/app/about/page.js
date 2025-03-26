import React from 'react';
import { client } from '@/libs/microcms';
import Image from 'next/image';
import { parseHtmlContent } from '@/utils/htmlParser';

//get about page data from microCMS
async function getAboutContent() {
    const data = await client.get({
        endpoint: `about/`,
    });
    return data;
}

//generate about page
export default async function AboutPage() {
    const aboutContent = await getAboutContent();

    //console.log(aboutContent.contents);

    // Parse the HTML content to replace img tags with Next.js Image components
    const parsedContent = aboutContent.contents[0].aboutme ? parseHtmlContent(aboutContent.contents[0].aboutme) : null;

    return (
        <article>
            <h1>私について</h1>
            <section>
                {parsedContent}
            </section>
        </article>
    )
}
