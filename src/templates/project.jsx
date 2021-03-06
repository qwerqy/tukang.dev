import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons"

const ProjectHeroContainer = styled("div")`
  background: ${colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  padding-top: 2.25em;
  margin-bottom: 3.5em;

  img {
    max-width: 600px;
  }
`

const ProjectTitle = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
`

const ProjectFooter = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ProjectBody = styled("div")`
  max-width: 550px;
  margin: 0 auto;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`

const WorkLink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
`

const Project = ({ project, meta }) => {
  return (
    <>
      <Helmet
        title={`${project.project_title[0].text} | Building software solutions`}
        titleTemplate={`%s | Project`}
        meta={[
          {
            name: `description`,
            content: RichText.asText(project.project_preview_description),
          },
          {
            property: `og:title`,
            content: `${project.project_title[0].text} | Building software solutions`,
          },
          {
            property: `og:description`,
            content: RichText.asText(project.project_preview_description),
          },
          {
            property: `og:image`,
            content: project.project_preview_thumbnail.url,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            property: `twitter:image`,
            content: project.project_preview_thumbnail.url,
          },
          {
            name: `twitter:description`,
            content: RichText.asText(project.project_preview_description),
          },
        ].concat(meta)}
      />
      <Layout>
        <ProjectTitle>{RichText.render(project.project_title)}</ProjectTitle>
        {project.project_hero_image && (
          <ProjectHeroContainer>
            <img src={project.project_hero_image.url} alt="bees" />
          </ProjectHeroContainer>
        )}
        <ProjectBody>
          {RichText.render(project.project_description)}
          <br />
          <ProjectFooter>
            <span>
              <b>Share this post: </b>
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `https://tukang.dev/work/${project._meta.uid}`
              )}`}
              style={{ margin: "0 1rem" }}
            >
              <FontAwesomeIcon
                icon={faFacebookSquare}
                size="2x"
                color="#4b84e5"
              />
            </a>
            <a
              href={`https://twitter.com/share?url=${encodeURIComponent(
                `https://tukang.dev/work/${project._meta.uid}`
              )}`}
              style={{ margin: "0 1rem" }}
            >
              <FontAwesomeIcon
                icon={faTwitterSquare}
                size="2x"
                color="#4b84e5"
              />
            </a>
          </ProjectFooter>
          <WorkLink to={"/work"}>
            <Button className="Button--secondary">See other work</Button>
          </WorkLink>
        </ProjectBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const projectContent = data.prismic.allProjects.edges[0].node
  const meta = data.site.siteMetadata
  return <Project project={projectContent} meta={meta} />
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
}

export const query = graphql`
  query ProjectQuery($uid: String) {
    prismic {
      allProjects(uid: $uid) {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            project_hero_image
            project_description
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
