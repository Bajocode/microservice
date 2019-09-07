FROM       node:10.16.0-alpine AS builder
USER       node
WORKDIR    /home/node
COPY       --chown=node:node package*.json ./
RUN        ["npm", "ci"]
COPY       --chown=node:node . .
RUN        npm run build && \
           npm run test:cov && \
           find . \
           ! -name dist \
           ! -name package.json \
           ! -name package-lock.json \
           ! -name node_modules \
           -maxdepth 1 \
           -mindepth 1 \
           -exec rm -rf {} \;

FROM       node:10.16.0-alpine
USER       node
WORKDIR    /home/node
COPY       --chown=node:node --from=builder /home/node .
ENTRYPOINT ["node", "dist/src/main.js"]