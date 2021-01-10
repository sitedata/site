import { DefaultSeo } from 'next-seo';
import { useConfig } from '~/context';

import type { IBaseSEO } from './types';

export const BaseSEO: React.FC<IBaseSEO> = (props: IBaseSEO) => {
  const { siteTitle, twitterHandle, siteDescription, orgName } = useConfig();
  return (
    <DefaultSeo
      title={orgName}
      description={siteDescription}
      titleTemplate={`%s | ${siteTitle}`}
      twitter={{ site: twitterHandle, cardType: 'summary' }}
      openGraph={{
        url: '/',
        title: orgName,
        type: 'website',
        description: siteDescription,
        images: [{ url: '//opengraph.jpg', width: 1200, height: 630, alt: orgName }],
      }}
      {...props}
    />
  );
};
