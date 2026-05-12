FROM nginx:alpine

# Copy static assets to the Nginx HTML directory
COPY . /usr/share/nginx/html/

# Copy the custom Nginx configuration
COPY nginx-website.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for internal container communication
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
