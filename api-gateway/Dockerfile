# Build stage
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Install Maven
RUN apk add --no-cache maven

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built artifact from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8081

# Set JVM options for Java 21
ENV JAVA_OPTS="-XX:+UseZGC -XX:+ZGenerational -Xms128m -Xmx256m"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
