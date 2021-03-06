import React from "react"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import ProjectCard from "components/ProjectCard"
import Technologies from "../components/Technologies"
import ContactForm from "../components/Contact"
import ServiceCard from "components/ServiceCard"
import LogoV2 from "../images/logov2.png"

const Hero = styled("div")`
  padding-top: 2.5em;
  padding-bottom: 3em;
  margin-bottom: 6em;
  max-width: 830px;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }

  h1 {
    margin-bottom: 1em;

    a {
      text-decoration: none;
      transition: all 100ms ease-in-out;

      &:nth-of-type(1) {
        color: ${colors.blue500};
      }
      &:nth-of-type(2) {
        color: ${colors.orange500};
      }
      &:nth-of-type(3) {
        color: ${colors.purple500};
      }
      &:nth-of-type(4) {
        color: ${colors.green500};
      }
      &:nth-of-type(5) {
        color: ${colors.teal500};
      }

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;

        &:nth-of-type(1) {
          color: ${colors.blue600};
          background-color: ${colors.blue200};
        }
        &:nth-of-type(2) {
          color: ${colors.orange600};
          background-color: ${colors.orange200};
        }
        &:nth-of-type(3) {
          color: ${colors.purple600};
          background-color: ${colors.purple200};
        }
        &:nth-of-type(4) {
          color: ${colors.green600};
          background-color: ${colors.green200};
        }
        &:nth-of-type(5) {
          color: ${colors.teal600};
          background-color: ${colors.teal200};
        }
      }
    }
  }
`

const Section = styled("div")`
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const WorkAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.blue500};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`

const Title = styled.h1`
  text-align: center;
  margin: 0;
`

const Subtitle = styled.span`
  text-align: center;
  color: #5e81ac;
  font-weight: 300;
  margin-bottom: 5rem;
  font-size: 1.25rem;
`

const RenderBody = ({ home, projects, meta, technologies, services }) => (
  <>
    <Helmet
      title={meta.title}
      titleTemplate={`%s | Home | Building software solutions`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: meta.title,
        },
        {
          property: `og:description`,
          content: meta.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: LogoV2,
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
          name: `twitter:description`,
          content: meta.description,
        },
        {
          name: `twitter:image`,
          content: LogoV2,
        },
      ].concat(meta)}
    />
    <Hero>
      <>{RichText.render(home.hero_title)}</>
      {home.hero_button_link && (
        <Link to="/contact">
          <Button>{RichText.render(home.hero_button_text)}</Button>
        </Link>
      )}
    </Hero>
    <Section>
      <Title>{RichText.asText(home.services)}</Title>
      <Subtitle>{RichText.asText(home.services_sub)}</Subtitle>
      {services.map((service, i) => (
        <ServiceCard
          key={i}
          title={service.node.service_name}
          description={service.node.service_short_description}
          imageFixed={service.node.service_imageSharp.childImageSharp.fixed}
        />
      ))}
      <WorkAction to={"/services"}>
        See more services <span>&#8594;</span>
      </WorkAction>
    </Section>
    <Section>
      <Title>{RichText.asText(home.projects)}</Title>
      <Subtitle>{RichText.asText(home.projects_sub)}</Subtitle>
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          category={project.node.project_category}
          title={project.node.project_title}
          description={project.node.project_preview_description}
          thumbnail={project.node.project_preview_thumbnail}
          uid={project.node._meta.uid}
        />
      ))}
      <WorkAction to={"/work"}>
        See more work <span>&#8594;</span>
      </WorkAction>
    </Section>
    <Section>
      <Title>{RichText.asText(home.technologies)}</Title>
      <Subtitle>{RichText.asText(home.technologies_sub)}</Subtitle>
      <Technologies technologies={technologies} />
    </Section>
    <Section>
      <Title>{RichText.asText(home.contact)}</Title>
      <Subtitle>{RichText.asText(home.contact_sub)}</Subtitle>
      <ContactForm />
    </Section>
  </>
)

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  const projects = data.prismic.allProjects.edges
  const meta = data.site.siteMetadata
  const technologies = data.prismic.allTechnologys.edges
  const services = data.prismic.allServices.edges

  if (!doc || !projects) return null

  return (
    <Layout>
      <RenderBody
        home={doc.node}
        projects={projects}
        meta={meta}
        technologies={technologies}
        services={services}
      />
    </Layout>
  )
}

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            hero_button_text
            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
            technologies
            technologies_sub
            services
            services_sub
            contact
            contact_sub
            projects
            projects_sub
          }
        }
      }
      allProjects(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
      allTechnologys(sortBy: category_ASC) {
        edges {
          node {
            icon_class
            icon_image
            name
            category
          }
        }
      }
      allServices(first: 3) {
        edges {
          node {
            service_short_description
            service_name
            service_image
            service_imageSharp {
              childImageSharp {
                fixed(height: 100, width: 100) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
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
