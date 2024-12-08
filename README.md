# AI Text Summarization Tool

## Overview
The AI Text Summarization Tool is a web-based application that allows users to summarize text or documents quickly and effectively. The tool uses a hybrid approach combining extractive and simulated abstractive summarization techniques, providing concise and meaningful summaries. It supports plain text input, PDF file uploads, and multiple summary lengths.

## Features
- **Hybrid Summarization:** Combines extractive and abstractive summarization methods.
- **Customizable Summary Length:** Choose from short (20%), medium (30%), or long (50%) summaries.
- **Multiple Input Formats:** Supports plain text input and PDF file uploads.
- **User-Friendly Interface:** Intuitive and responsive design built with Tailwind CSS.
- **Copy and Download Options:** Easily copy the generated summary to the clipboard or download it as a text file.

## Technologies Used
- **Frontend:** HTML, Tailwind CSS
- **Backend Logic:** JavaScript
- **PDF Parsing:** PDF.js
- **NLP Techniques:**
  - Text preprocessing
  - Sentence tokenization
  - Sentence similarity computation
  - Extractive sentence scoring and selection
  - Simulated abstractive summarization

## Installation and Setup
### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-text-summarizer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ai-text-summarizer
   ```
3. Open `index.html` in your browser to run the application locally.

## How to Use
1. Open the application in your browser.
2. Enter the text to summarize in the input box or upload a document (PDF or .txt).
3. Select the desired summary length (Short, Medium, Long).
4. Click the **Summarize** button to generate a summary.
5. Copy the summary to the clipboard or download it as a text file using the provided buttons.

## Project Structure
- `index.html`: The main HTML file containing the structure and UI elements.
- `summarizer.js`: The JavaScript file implementing text summarization logic and UI interactions.
- `tailwind.min.css`: A CDN link to Tailwind CSS for styling.

## Future Enhancements
- Replace basic sentence embeddings with advanced techniques such as BERT or sentence-transformers.
- Integrate a lightweight transformer model for true abstractive summarization.
- Add backend support using Python for advanced NLP processing.
- Enhance performance for large input texts.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, please reach out at [your-email@example.com](mailto:your-email@example.com).

---

Feel free to customize this README to include any additional details specific to your implementation or goals!

