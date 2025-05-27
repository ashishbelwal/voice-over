# Voice Over Studio

A modern web application for creating and managing voice-over projects. Built with React, TypeScript, and Vite, this application provides a powerful interface for audio visualization, editing, and processing.

For Backend please use this [repo](https://github.com/ashishbelwal/ai-bridge).

## Features

- 🎙️ Audio visualization and waveform editing
- 🎨 Modern UI with Ant Design components
- 🔄 Real-time audio processing
- 🤖 OpenAI integration for voice generation
- 📊 Ruler and timeline controls for precise editing
- 🎯 Type-safe development with TypeScript

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **UI Components:** Ant Design
- **Audio Processing:** WaveSurfer.js
- **AI Integration:** OpenAI
- **Styling:** SASS
- **Development Tools:** ESLint, TypeScript ESLint

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd voice-over
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
src/
├── assets/      # Static assets
├── components/  # React components
├── hooks/       # Custom React hooks
├── services/    # API and service integrations
├── styles/      # Global styles and SASS files
├── types/       # TypeScript type definitions
└── utils/       # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [WaveSurfer.js](https://wavesurfer.js.org/) for audio visualization
- [Ant Design](https://ant.design/) for UI components
- [OpenAI](https://openai.com/) for voice generation capabilities
