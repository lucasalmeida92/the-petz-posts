import Head from 'next/head'

export default function HeadTag(props) {
  return (
      <Head>
        <title>{props.pageTitle || 'The Petz Posts'}</title>
      </Head>
  )
}
