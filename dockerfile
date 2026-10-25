FROM ubuntu:24.04

WORKDIR /app

# Install runtime dependencies for eBPF binaries
RUN apt-get update \
    && apt-get install -y --no-install-recommends libelf1 \
    && rm -rf /var/lib/apt/lists/*

COPY collector/target/release/aegis /app/aegis

RUN chmod +x /app/aegis

# Expose default web server port
EXPOSE 7395

ENTRYPOINT ["/app/aegis"]
