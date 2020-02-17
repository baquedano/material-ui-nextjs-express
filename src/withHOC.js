import React from 'react'

export default function withHOC(PageComponent, { ssr = true } = {}) {
  const WithHOC = props => {
    return (
      <React.Fragment>
        <PageComponent {...props} />
      </React.Fragment>
    )
  }

  WithHOC.getInitialProps = async ctx => {
    return await PageComponent.getInitialProps(ctx)
  }

  return WithHOC
}