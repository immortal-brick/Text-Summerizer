// Text Summarization Utility Class
class TextSummarizer {
    // Text preprocessing
    static preprocessText(text) {
        return text.toLowerCase()
            .replace(/[^\w\s.]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Sentence tokenization
    static tokenizeSentences(text) {
        return text.split(/(?<=[.!?])\s+/)
            .filter(sentence => sentence.trim().length > 10);
    }

    // Compute basic sentence embedding (simulated)
    static computeSentenceEmbedding(sentence) {
        const words = sentence.split(/\s+/);
        
        // Basic embedding: word vector simulation
        const embedding = words.map(word => {
            const hash = word.split('').reduce((acc, char) => 
                char.charCodeAt(0) + ((acc << 5) - acc), 0);
            return Math.sin(hash);
        });

        return embedding.reduce((a, b) => a + b, 0) / embedding.length;
    }

    // Sentence similarity computation
    static computeSimilarity(sent1, sent2) {
        const embed1 = this.computeSentenceEmbedding(sent1);
        const embed2 = this.computeSentenceEmbedding(sent2);
        return 1 - Math.abs(embed1 - embed2);
    }

    // Extract most important sentences
    static extractiveSummarization(text, extractionRatio = 0.3) {
        const sentences = this.tokenizeSentences(text);
        
        // Compute sentence scores
        const scoredSentences = sentences.map((sentence, index) => {
            // Compute importance based on position and similarity
            const similarityScore = sentences.reduce((total, otherSent) => {
                return total + this.computeSimilarity(sentence, otherSent);
            }, 0) / sentences.length;

            return {
                sentence,
                score: similarityScore * (1 + 1 / (index + 1))
            };
        });

        // Sort and select top sentences
        const sortedSentences = scoredSentences
            .sort((a, b) => b.score - a.score);
        
        const topSentencesCount = Math.max(1, 
            Math.floor(sentences.length * extractionRatio)
        );

        return sortedSentences
            .slice(0, topSentencesCount)
            .map(item => item.sentence)
            .join(' ');
    }

    // Abstractive refinement (simulated transformer-like)
    static abstractiveSummarization(extractedSummary) {
        // Simple transformations to simulate abstractive summarization
        const transformations = [
            [/\b(the|a|an)\s+/gi, ''],
            [/\b(very|really|extremely)\s+/gi, ''],
            [/ing\b/g, ''],
            [/\s+/g, ' ']
        ];

        let summary = extractedSummary;
        transformations.forEach(([regex, replacement]) => {
            summary = summary.replace(regex, replacement);
        });

        return summary.trim();
    }

    // PDF text extraction
    static async extractPDFText(file) {
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                fullText += textContent.items.map(item => item.str).join(' ');
            }
            
            return fullText;
        } catch (error) {
            console.error('PDF extraction error:', error);
            return '';
        }
    }
}

// UI Management Class
class SummarizerUI {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('summarizeBtn').addEventListener('click', () => this.generateSummary());
        document.getElementById('copyBtn').addEventListener('click', () => this.copySummary());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadSummary());
    }

    async generateSummary() {
        const textInput = document.getElementById('textInput');
        const fileInput = document.getElementById('fileInput');
        const summaryOutput = document.getElementById('summaryOutput');
        const summaryLengthSelect = document.getElementById('summaryLength');

        let text = textInput.value;

        // Handle file input
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            text = file.type === 'application/pdf' 
                ? await TextSummarizer.extractPDFText(file)
                : await file.text();
        }

        if (!text.trim()) {
            alert('Please enter text or upload a document.');
            return;
        }

        const extractionRatio = parseFloat(summaryLengthSelect.value);

        // Two-step summarization
        const extractiveSummary = TextSummarizer.extractiveSummarization(text, extractionRatio);
        const hybridSummary = TextSummarizer.abstractiveSummarization(extractiveSummary);

        summaryOutput.textContent = hybridSummary;
    }

    copySummary() {
        const summaryOutput = document.getElementById('summaryOutput');
        navigator.clipboard.writeText(summaryOutput.textContent)
            .then(() => {
                alert('Summary copied to clipboard!');
            })
            .catch(err => {
                console.error('Copy failed:', err);
            });
    }

    downloadSummary() {
        const summaryOutput = document.getElementById('summaryOutput');
        const blob = new Blob([summaryOutput.textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'summary.txt';
        a.click();
        
        URL.revokeObjectURL(url);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new SummarizerUI();
});