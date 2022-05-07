FROM nginx:1.19.2

RUN apk add --no-cache --update --verbose grep bash nmap-ncat
