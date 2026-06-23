# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:21-jre
WORKDIR /app

# Install native Tesseract OCR binaries and libraries
RUN apt-get update && \
    apt-get install -y --no-install-recommends tesseract-ocr && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the built jar from the build stage
COPY --from=build /app/target/ai-0.0.1-SNAPSHOT.jar app.jar

# Setup default directory for OCR data (typically installed in /usr/share/tesseract-ocr/4.00/tessdata)
RUN mkdir -p tessdata

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
