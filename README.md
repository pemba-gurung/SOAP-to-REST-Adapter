
# Project : SOAP-to-REST-Adapter
  
  This project creates a bridge between legacy SOAP servers and modern REST clients. 
  It provides automatic payload transformation and dynamic JSON adaptation.
  The wrapper handles all the complex protocol translation behind the scenes. 
  Simply configure your SOAP endpoints using WSDL document and start making REST calls.

  The REST middleware project objective is to enable a seamless integration and communication between an existing 
  legacy SOAP web service server and modern REST API clients through appropriate protocol translation and interface adaptation. 

# Features

- Exposed SOAP web services/operations
- Client-side request features:
    - HTTP methods: GET and POST
    - Error Handling
    - JSON
- Payload transformation: REST <-> SOAP 

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (built version 20.11.1)
- npm 10.2.4
- packages: express, soap

## Installation

1. Clone the repository: "git clone https://github.com/pemba-gurung/SOAP-to-REST-Adapter.git"
2. Navigate to the project directory: "SOAP-to-REST-Adapter"
3. Install dependencies: "npm packages"
4. Create environment file: ".env"


## Usage

### Basic Usage
```bash
node  soapAPIGateway.js
```

## 📁 Project Structure

SOAP-to-REST-Adapter/
├── soapAPIGateway.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

## 🔧 Configuration

- WSDL links
- HTTP port

## API Documentation

### Endpoints

# GET /
Returns available SOAP Operations.

# POST / (SOAP service/operation)
Returns result

**Response:**
```json
Depends on SOAP operations
```
## 👥 Authors

- PEMBA GURUNG

## 🙏 Acknowledgments

- COREWORKS SOLUTION LLC
- https://nodejs.org/docs/latest/api/
- https://docs.npmjs.com

### Not implemented/TO DO
````
````### NOT IMPLEMENTED/TO DO
### Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
``

## 🧪 Testing

Run tests with:
```bash
n/a
```

Run tests with coverage:
```bash
n/a
```

## 🤝 Contributing

1. Fork the project
```
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
```

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/yourusername/your-project/issues)
- Email: your.email@example.com
- Documentation: [link to docs]

## 🗺️ Roadmap

- [ ] Feature A
- [ ] Feature B
- [x] Completed Feature C

## 📊 Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
````
