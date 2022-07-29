FROM nginx
LABEL maintainer="研究院研发组 <research-maint@itcast.cn>"
ARG PACKAGE_PATH
ADD ${PACKAGE_PATH:-./} /usr/share/nginx/html/
ADD ./deploy/nginx.conf /etc/nginx/nginx.template
CMD envsubst '$NGINX_HOST $NGINX_PORT' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'