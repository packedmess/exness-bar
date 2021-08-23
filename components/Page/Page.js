import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import {connectMobX} from '@/mobx';

function Page({title, children, store, shouldLayoutRender, accessRedirectTo, publicAccessOnly, isCatalogPage}) {
  const {authStore} = store;
  const router = useRouter();

  // Checks if users with roles from 'access' can view this page
  if (publicAccessOnly && authStore.isLoggedIn) {
    router.replace(accessRedirectTo);
    return null;
  }

  return (
    <>
      <Head>
        <title>Exness RoofBar | {title}</title>
      </Head>
      {shouldLayoutRender && (
        <Header
          isLoggedIn={store.authStore.isLoggedIn}
          avatar={store.authStore.info.avatar}
          isCatalogPage={isCatalogPage}
        />
      )}
      {children}
    </>
  );
}

Page.defaultProps = {
  accessRedirectTo: '/',
  access: [],
  publicAccessOnly: false,
  shouldLayoutRender: true,
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  accessRedirectTo: PropTypes.string,
  access: PropTypes.array,
  publicAccessOnly: PropTypes.bool,
  shouldLayoutRender: PropTypes.bool,
  store: PropTypes.object,
  isCatalogPage: PropTypes.bool,
};

export default connectMobX(Page);
