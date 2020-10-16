#############
### build ###
#############

# base image
FROM node:12.2 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY razorboard/package.json /app/package.json

# add app
COPY razorboard /app

# generate build
RUN npx npm-force-resolutions && \
    npm update                && \
    npm run build -- --prod --output-path=dist

############
### prod ###
############

# base image
FROM nginx:1.19-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist/* /usr/share/nginx/html/

COPY docker-utils/razorboard.conf /etc/nginx/conf.d/

COPY docker-utils/30-disable-default.sh /docker-entrypoint.d/
COPY docker-utils/40-tune-server.sh /docker-entrypoint.d/

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
