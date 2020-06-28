import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { TimeStamp } from 'resources/globalTypes';

export interface MetaProps extends Partial<TimeStamp> {
    title: string;
    image?: string;
    description?: string;
    keywords?: string[];
    useAsPath?: boolean;
    type?: string;
    author?: string;
}

const Meta: FC<MetaProps> = (props) => {
    const { title, description, image = "https://i.ytimg.com/vi/Fnw3lNeH-XI/maxresdefault.jpg", created, updated, useAsPath = false, keywords, type = 'article', author = 'Siraj Alam' } = props;

    const router = useRouter();

    return (
        <Head>
            <title>{title}</title>

            <meta name="description" content={description} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta property="og:url" content={`https://nextjs-hotel-booking.vercel.app${useAsPath ? router.asPath : router.pathname}`} />

            <meta property="og:image" content={image} />
            <meta property="og:type" content={type} />
            <meta property="article:author" content={author} />
            {keywords ? <meta property="keywords" content={keywords.join(', ')} /> : null}
            {created ? <meta name="article:published_time" content={created} /> : null}
            {updated ? <meta name="article:modified_time" content={updated} /> : null}
            <meta property="og:locale" content="en_US" />
        </Head>
    )
}
export default Meta