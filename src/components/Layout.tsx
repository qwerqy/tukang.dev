import React from "react"
import styled from "@emotion/styled"
import { Global } from "@emotion/core"
import globalStyles from "../styles/global"
import typeStyles from "../styles/typography"
import dimensions from "../styles/dimensions"
import Footer from "../components/Footer"
import Header from "../components/Header"
import "styles/fonts.scss"

const LayoutContainer = styled.div`
  max-width: ${dimensions.maxwidthDesktop}px;
  padding-left: ${dimensions.paddingHorizontalDesktop}em;
  padding-right: ${dimensions.paddingHorizontalDesktop}em;
  margin: 0 auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    padding-left: ${dimensions.paddingHorizontalTablet}em;
    padding-right: ${dimensions.paddingHorizontalTablet}em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding-left: ${dimensions.paddingHorizontalMobile}em;
    padding-right: ${dimensions.paddingHorizontalMobile}em;
  }

  .Layout__content {
    padding-bottom: 5em;
  }
`

const Layout = (props: React.HTMLProps<HTMLDivElement>) => (
  <>
    <Header />
    <LayoutContainer className="div">
      <Global styles={[globalStyles, typeStyles]} />
      <div className="Layout">
        <main className="Layout__content">{props.children}</main>
        <Footer />
      </div>
    </LayoutContainer>
  </>
)

export default Layout