# --- Stage 1: Build Frontend and Go binary ---
FROM golang:1.24-alpine AS builder

RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY . .

# لیست کردن محتویات پوشه برای دیدن ساختار پروژه در لاگ‌ها
RUN ls -la /app

WORKDIR /app/ui
RUN if [ -f "package.json" ]; then npm install && npm run build; fi

WORKDIR /app
RUN go mod download
# جستجوی خودکار و بیلد فایل‌های گو بر اساس پوشه‌های احتمالی
RUN set -eux; \
    if [ -d "src" ]; then \
        CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /app/mwp.linux.amd64 ./src; \
    elif [ -d "cmd" ]; then \
        CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /app/mwp.linux.amd64 ./cmd; \
    elif [ -f "main.go" ]; then \
        CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /app/mwp.linux.amd64 .; \
    else \
        # اگر پوشه خاصی نبود، فایل‌های گو را در زیرپوشه‌ها جستجو کن
        go build -o /app/mwp.linux.amd64 ./...; \
    fi

# --- Stage 2: Final runtime image ---
FROM alpine:3

LABEL org.opencontainers.image.source=https://github.com/javadyavari2025-afk/wgpanelne

RUN set -eux; \
	apk add --no-cache --virtual .init-program catatonit && \
	ln -sf /usr/bin/catatonit /sbin/init

RUN set -eux && \
	adduser -u 82 -D -S -s /sbin/nologin -h /var/www/mwp -G www-data www-data && \
	mkdir -p /var/www/mwp && \
	chown www-data:www-data /var/www/mwp

WORKDIR /var/www/mwp
VOLUME /var/www/mwp

COPY --from=builder /app/mwp.linux.amd64 /usr/local/sbin/mwp

RUN set -eux; \
    RUNTIME_DEPS=$( \
      scanelf --needed --nobanner --format '%n#p' --recursive /usr/local/sbin/ | \
      tr ',' '\n' | \
      sort -u | \
      awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }'\
    ) && \
    apk add --no-cache --virtual .runtime-dependencies $(echo $RUNTIME_DEPS | xargs)

RUN set -eux; \
	mkdir -p peer-files && \
    chown www-data:www-data peer-files

ARG APP_COMMIT_SHA=unknown
RUN echo "${APP_COMMIT_SHA}" > /.app_commit_sha

USER www-data:www-data

ENV MODE=production
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=3000
ENV PEER_FILES_DIR=/var/www/mwp/peer-files

EXPOSE 3000
ENTRYPOINT ["init", "--", "/bin/sh", "-c"]
CMD ["exec mwp"]