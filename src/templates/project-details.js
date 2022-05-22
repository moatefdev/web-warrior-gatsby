import React from "react"
import Layout from "../components/Layout"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "../styles/project-details.module.css"
import { graphql } from "gatsby"

function projectDetails({ data }) {
  const { html } = data.markdownRemark
  const { title, stack } = data.markdownRemark.frontmatter
  const featuredImg = getImage(data.markdownRemark.frontmatter.featuredImg)
  console.log("featuredImg:", featuredImg)
  return (
    <Layout>
      <div className={styles.details}>
        <h2>{title}</h2>
        <h3>{stack}</h3>
        <div className={styles.featured}>
          <GatsbyImage image={featuredImg} alt="image" />
          {/* <StaticImage src={data.markdownRemark.frontmatter.featuredImg} /> */}
        </div>
        <div
          className={styles.html}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export default projectDetails

export const query = graphql`
  query ProjectDetails($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        stack
        title
        featuredImg {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`
