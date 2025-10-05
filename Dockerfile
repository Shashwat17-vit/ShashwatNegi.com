# Use official Nginx image as base
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy website files to Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY portfolio-details.html /usr/share/nginx/html/
COPY service-details.html /usr/share/nginx/html/
COPY starter-page.html /usr/share/nginx/html/
COPY Readme.txt /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
