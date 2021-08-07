const md = require("markdown-it")({
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});
const emoji = require("markdown-it-emoji");
const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

const feedUrl = "https://taimoorsattar.dev/rss.xml";
const websiteUrl = "https://taimoorsattar.dev";

const blogPostLimit = 8;

md.use(emoji);

(async () => {
  let blogPosts = "";
  try {
    blogPosts = await loadBlogPosts();
  } catch (e) {
    console.error(`Failed to load blog posts from ${websiteUrl}`, e);
}


  const text = `
  <h2> Hi, I'm Taimoor Sattar!, Full stack developer.</h2>

  Find me at:

  [![Twitter: taimoorsattar7](https://img.shields.io/badge/-taimoorsattar7-blue?style=flat-square&logo=Twitter&logoColor=white&link=https://twitter.com/taimoorsattar7/)](https://twitter.com/taimoorsattar7/)

  [![Linkedin: taimoorsattar7](https://img.shields.io/badge/-taimoorsattar7-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/taimoorsattar7/)](https://www.linkedin.com/in/taimoorsattar7/)

  <h2>Technologies I've worked</h2>

  ![React](https://img.shields.io/badge/-React-000?&logo=React)
  ![Node.js](https://img.shields.io/badge/-Node.js-000?&logo=node.js)
  ![Linux](https://img.shields.io/badge/-Linux-000?&logo=Linux)
  ![Docker](https://img.shields.io/badge/-Docker-000?&logo=Docker)
  ![Javascript](https://img.shields.io/badge/-Javascript-000?&logo=Javascript)
  ![Typescript](https://img.shields.io/badge/-Typescript-000?&logo=Typescript)
  ![Express](https://img.shields.io/badge/-Express-000?&logo=Express)
  ![Mongodb](https://img.shields.io/badge/-Mongodb-000?&logo=Mongodb)
  ![Stripe](https://img.shields.io/badge/-Stripe-000?&logo=Stripe)
  ![Gatsby](https://img.shields.io/badge/-Gatsby-000?&logo=Gatsby)
  ![Next.js](https://img.shields.io/badge/-Next.js-000?&logo=Next.js)
  ![Netlify](https://img.shields.io/badge/-Netlify-000?&logo=Netlify)

  <h2>Little bit about my experience/work</h2>

  I've experience working with JAMstack. I spent most of the time working with technology like React(Typescript), Gatsby and Next.js.

  If you're interested in learning JAMstack (Gatsby), check my latest course (book).

  <a href="https://taimoorsattar.dev/books/how-to-build-JAMstack-site"><img src="https://img.shields.io/badge/Get%20the%20book-%230A0A0A.svg?&style=for-the-badge&logo=dev-dot-to&logoColor=white" height=25></a>

  Please visit my website, [underlinejobs.com](https://www.underlinejobs.com), built with Next.js. Here you can create your resume and find the job. Create a resume link or export it in PDF or word.

  I write about technology (that is used build the web) on my website [:arrow_right: taimoorsattar.dev](${websiteUrl})\n\n

  <h2> Check my latest Blog Posts (taimoorsattar.dev)</h2>

  ${blogPosts}\n

  <h2>Contact Me</h2> 

  You can reach me at the email in my github profile 
  `;

  const result = md.render(text);

  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();

async function loadBlogPosts() {
  const feed = await parser.parseURL(feedUrl);

  let links = "";

  feed.items.slice(0, blogPostLimit).forEach((item) => {
    links += `<li><a href=${item.link}>${item.title}</a></li>`;
  });

  return `
  <ul>
    ${links}
  </ul>\n
  [:arrow_right: More blog posts](${websiteUrl}/blog)
  `;
}
