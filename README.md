# TruthNet AI

TruthNet AI is a cybersecurity platform designed to help users identify and investigate online scams. The platform analyzes suspicious emails, URLs, messages, and screenshots to determine whether they may be part of a phishing or fraud campaign.

Unlike traditional scam detectors that simply label content as safe or unsafe, TruthNet focuses on uncovering connections between suspicious entities and presenting them in a visual format that is easy to understand.

## The Problem

Online scams are becoming increasingly common. Every day, people receive phishing emails, fake internship offers, fraudulent job opportunities, suspicious websites, and scam messages.

Most users are unable to determine whether these communications are legitimate. Existing tools often provide only a basic warning without explaining why something is suspicious or how it may be connected to other scams.

## Our Approach

TruthNet helps users analyze suspicious content and understand the reasoning behind the results.

A user can submit:

* An email
* A website URL
* A text message
* A screenshot containing text

The platform examines the content, identifies potentially suspicious patterns, and generates a risk assessment along with an explanation.

In addition, TruthNet builds relationships between entities such as email addresses, domains, phone numbers, and reports, allowing users to visualize possible scam networks.

## Key Features

### Email Analysis

Analyze suspicious emails and identify phishing indicators such as impersonation attempts, requests for money, urgency tactics, and suspicious sender information.

### URL Analysis

Evaluate website links and domains for potential phishing or fraud risks.

### Screenshot Analysis

Extract text from uploaded screenshots and analyze the content automatically.

### Risk Assessment

Generate a clear risk score along with a simple explanation of why the content may be suspicious.

### Scam Relationship Mapping

Visualize relationships between connected entities using a graph-based approach powered by Neo4j.

### Multilingual Support

Support analysis of content in multiple Indian languages.

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Spring Boot
* Java

### Database

* Neo4j AuraDB

### AI Services

* Gemini API

### OCR

* Tesseract OCR

## Project Workflow

1. User submits content for analysis.
2. The system extracts relevant information.
3. AI evaluates the content for phishing and fraud indicators.
4. Related entities are stored and connected in Neo4j.
5. A risk score and explanation are generated.
6. Users can explore visual relationships between suspicious entities.

## Hackathon Theme

Trust, Identity & Security

## Sponsor Tracks

### Neo4j

Used to model relationships between domains, email addresses, phone numbers, reports, and other entities.

### Sarvam AI

Used for multilingual and voice-based interactions.

## Future Improvements

* Browser extension support
* Voice scam detection
* Real-time website monitoring
* Community-driven scam reporting
* Threat intelligence dashboard

## Team

Built as part of HACKHAZARDS 2026.

## License

MIT License
