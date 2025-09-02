export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "images": "images",
    "css": "css",
    "js": "js"
  });
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
