import BlogAvatar from "../components/BlogAvatar";
import Disqus from 'disqus-react';
import Layout from "../components/Layout";
import NavigationBar from "../components/NavigationBar";
import React from "react";

// import PageTransition from "gatsby-plugin-page-transitions";

export default function Template({
  data // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;

  const disqusShortname = 'ivansantos-me';
  const disqusConfig = {
      url: frontmatter.path,
      identifier: frontmatter.path,
      title: frontmatter.title,
  };

  return (
    // <PageTransition>
    <Layout>
      <header
        className="header__blog-post"
        style={{
          backgroundImage: `url(${frontmatter.image.childImageSharp.sizes.src})`
        }}
      >
        <NavigationBar dark={true} /> <BlogAvatar />
      </header>
      <div className="blog-post--container">
        <div className="blog-post">
          <h2 className="blog-post--date"> {frontmatter.date} </h2>
          <h1 className="blog-post--title"> {frontmatter.title} </h1>
          <div
            className="blog-post--content"
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
          <div>
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig}/>
          </div>
        </div>
      </div>
    </Layout>
    // </PageTransition>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        image {
          childImageSharp {
            sizes(maxWidth: 1600, quality: 90, traceSVG: { color: "#328bff" }) {
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
            resize(width: 800) {
              src
            }
          }
        }
      }
    }
  }
`;
