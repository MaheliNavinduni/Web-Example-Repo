/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js writes a pair of editor-tooling markdown files into the project
  // root on every dev run. Turning that off keeps the repository to project
  // files only, and means nobody has to remember not to commit them.
  agentRules: false,
};

export default nextConfig;
