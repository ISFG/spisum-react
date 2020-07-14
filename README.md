# spisum-react

## Version

v1.0-beta

## Prerequisities

This container have to be deployed at least 10 minutes after first deploy of https://github.com/ISFG/alfresco-core. For emails and databoxes is required https://github.com/ISFG/alfresco-emailbox and https://github.com/ISFG/alfresco-databox.

- GIT
- Node.js 8.10.0 - 13.8.0
- Npm
- Docker
- Docker-compose
- NGINX

## How to run application
 
 In file **config/.env.prod** set the address where you will run the project.

- with SSL
 ```bash
HTTPS=true
REACT_APP_API_URL=url_adresa
REACT_APP_PROTOCOL=https
 ```
 
- without SSL
```bash
HTTPS=false
REACT_APP_API_URL=url_adresa
REACT_APP_PROTOCOL=http
 ```
 
```bash
$ git clone https://github.com/ISFG/spisum-react.git -b master --single-branch spisum-react
$ cd spisum-react
$ npm install
$ npm run build:prod
$ docker image build -t spisumreact
$ docker container run -d -p 4000:8080 spisumreact
```

in /etc/nginx/nginx.conf on the server, where docker is running is need to set properly redirecting in nginx as in example (don't restart nginx)

```bash
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
    # multi_accept on;
}

http {

     gzip on;
    
     server {
        server_name hostname.domain;

        client_max_body_size 0;

        set  $allowOriginSite *;
        proxy_pass_request_headers on;
        proxy_pass_header Set-Cookie;

        # External settings, do not remove
        #ENV_ACCESS_LOG

        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
        proxy_buffering off;
        proxy_set_header Host            $host:$server_port;
        proxy_set_header X-Real-IP       $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass_header Set-Cookie;

        # Protect access to SOLR APIs
        location ~ ^(/.*/service/api/solr/.*)$ {return 403;}
        location ~ ^(/.*/s/api/solr/.*)$ {return 403;}
        location ~ ^(/.*/wcservice/api/solr/.*)$ {return 403;}
        location ~ ^(/.*/wcs/api/solr/.*)$ {return 403;}

        location ~ ^(/.*/proxy/alfresco/api/solr/.*)$ {return 403 ;}
        location ~ ^(/.*/-default-/proxy/alfresco/api/.*)$ {return 403;}

        # Protect access to Prometheus endpoint
        location ~ ^(/.*/s/prometheus)$ {return 403;}

        location / {
            proxy_pass http://127.0.0.1:4000;
        }

        location /api/ {
            proxy_hide_header Access-Control-Allow-Origin;
            proxy_hide_header Access-Control-Allow-Methods;
            proxy_hide_header Access-Control-Allow-Headers;
            add_header Access-Control-Allow-Origin * always;

            if ($request_method = 'OPTIONS') {
                add_header Access-Control-Allow-Origin *;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE, PUT';
                add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,Group';
                return 204;
            }

            proxy_pass http://127.0.0.1:5000;
        }

        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/hostname.domain/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/hostname.domain/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    }

     server {
        if ($host = hostname.domain) {
            return 301 https://$host$request_uri;
        } # managed by Certbot

        server_name hostname.domain;
        listen 80;
        return 404; # managed by Certbot
    }
}
```

You can set SSL connection following this guide https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/ or if you would like to use HTTP instead of HTTPS, remove everything with comment ```# managed by Certbot```.

## Default users

- Administrator (this user can create groups and spisum users), username: sAdmin, password: sAdmin
- Superuser (this user is superuser in spisum), username: spisum, password: spisum

## Supported browsers

|**Browser**|**Version**|
|--- |--- |
|Microsoft Edge|80 and later|
|Safari|9 and later|
|Mozila Firefox|37 and later|
|Opera|37 and later|
|Google Chrome|49 and later|

## Note

If you found the issue let us know on development@spisum.cz or create issue directly in GIT.
