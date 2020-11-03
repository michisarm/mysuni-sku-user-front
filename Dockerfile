FROM nginx:stable-alpine
COPY dist /usr/share/nginx/html/suni-main
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
