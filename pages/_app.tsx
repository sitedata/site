import Head from 'next/head';
import { BaseSEO } from '~/components';
import { Provider } from '~/context';
import { usePageTracking } from '~/hooks';
import { SiteLayout } from '~/layouts';
import {
  getGlobalConfig,
  getFooterItems,
  getActions,
  getDocsGroups,
  getTestimonials,
} from '~/util';

import type { TSite, NextApp, GetInitialPropsReturn } from '~/types';

const Site: NextApp<TSite> = (props: GetInitialPropsReturn<TSite>) => {
  const { Component, pageProps, appProps } = props;
  const { globalConfig, footerGroups, actions, testimonials, docsGroups } = appProps;

  usePageTracking();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Provider appConfig={globalConfig} docsGroups={docsGroups} testimonials={testimonials}>
        <BaseSEO />
        <SiteLayout
          actions={actions}
          footerGroups={footerGroups}
          preview={pageProps?.preview ?? false}
        >
          <Component {...pageProps} />
        </SiteLayout>
      </Provider>
    </>
  );
};

Site.getInitialProps = async () => {
  try {
    const globalConfig = await getGlobalConfig();
    const footerGroups = await getFooterItems();
    const actions = await getActions();
    const testimonials = await getTestimonials();
    const docsGroups = await getDocsGroups();

    return { appProps: { globalConfig, footerGroups, actions, testimonials, docsGroups } };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      throw new Error(`Error while loading app configuration: ${err.message}`);
    }
    throw err;
  }
};

export { getServerSideProps } from '~/context';

export default Site;
