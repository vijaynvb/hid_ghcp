# syntax=docker/dockerfile:1

FROM maven:3.9.6-eclipse-temurin-11 AS build
WORKDIR /workspace

# Copy Maven descriptor first to leverage layer caching for dependencies
COPY pom.xml ./
RUN --mount=type=cache,target=/root/.m2 mvn -B dependency:go-offline

COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -B clean package -DskipTests

FROM eclipse-temurin:11-jre-jammy AS runtime
WORKDIR /app

COPY --from=build /workspace/target/task-management-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9095
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
